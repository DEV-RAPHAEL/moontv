import { NextResponse } from 'next/server';
import { canSendEmail, isValidEmail, sendEmail } from '@/lib/email';
import { getClientIp, isRateLimited } from '@/lib/rate-limit';

export async function POST(request: Request) {
  try {
    if (isRateLimited(getClientIp(request))) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 },
      );
    }

    const body = await request.json();

    if (String(body.website ?? '').trim()) {
      return NextResponse.json({ success: true });
    }

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
