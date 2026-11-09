import { NextResponse } from 'next/server';
import { canSendEmail, isValidEmail, sendEmail } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = String(body.email ?? '').trim().slice(0, 254);

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
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
      subject: 'Waitlist signup',
      replyTo: email,
      text: `New waitlist signup: ${email}`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Waitlist form failed:', error);
    return NextResponse.json(
      { error: 'Could not join the waitlist. Please try again later.' },
      { status: 500 },
    );
  }
}
