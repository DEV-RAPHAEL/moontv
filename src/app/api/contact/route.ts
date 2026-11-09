import { NextResponse } from 'next/server';
import { canSendEmail, isValidEmail, sendEmail } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const firstName = String(body.firstName ?? '').trim().slice(0, 100);
    const lastName = String(body.lastName ?? '').trim().slice(0, 100);
    const email = String(body.email ?? '').trim().slice(0, 254);
    const message = String(body.message ?? '').trim().slice(0, 5000);

    if (!firstName || !lastName || !isValidEmail(email) || !message) {
      return NextResponse.json(
        { error: 'Please fill in all fields with a valid email address.' },
        { status: 400 },
      );
    }

    if (!canSendEmail()) {
      return NextResponse.json(
        { error: 'Email is not configured yet.' },
        { status: 503 },
      );
    }

    await sendEmail({
      subject: `Contact form: ${firstName} ${lastName}`,
      replyTo: email,
      text: `Name: ${firstName} ${lastName}\nEmail: ${email}\n\n${message}`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form failed:', error);
    return NextResponse.json(
      { error: 'Could not send your message. Please try again later.' },
      { status: 500 },
    );
  }
}
