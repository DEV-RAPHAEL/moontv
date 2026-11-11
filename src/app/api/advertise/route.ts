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

    const companyName = String(body.companyName ?? '').trim().slice(0, 200);
    const email = String(body.email ?? '').trim().slice(0, 254);
    const partnershipType = String(body.partnershipType ?? '').trim().slice(0, 100);
    const message = String(body.message ?? '').trim().slice(0, 5000);

    if (!companyName || !isValidEmail(email) || !partnershipType) {
      return NextResponse.json(
        { error: 'Please provide a company name, valid email and partnership type.' },
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
      subject: `Advertising inquiry: ${companyName}`,
      replyTo: email,
      text: `Company: ${companyName}\nEmail: ${email}\nPartnership: ${partnershipType}\n\n${message || 'No message provided.'}`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Advertising form failed:', error);
    return NextResponse.json(
      { error: 'Could not send your inquiry. Please try again later.' },
      { status: 500 },
    );
  }
}
