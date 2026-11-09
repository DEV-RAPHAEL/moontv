const RESEND_URL = 'https://api.resend.com/emails';

export type EmailMessage = {
  subject: string;
  replyTo: string;
  text: string;
};

export function canSendEmail(): boolean {
  return Boolean(
    process.env.RESEND_API_KEY &&
      process.env.CONTACT_TO_EMAIL &&
      process.env.CONTACT_FROM_EMAIL,
  );
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function sendEmail({ subject, replyTo, text }: EmailMessage) {
  if (!canSendEmail()) {
    throw new Error('Email is not configured');
  }

  const response = await fetch(RESEND_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL,
      to: process.env.CONTACT_TO_EMAIL,
      subject,
      reply_to: replyTo,
      text,
    }),
  });

  if (!response.ok) {
    console.error('Resend request failed:', response.status, await response.text());
    throw new Error('Email provider rejected the message');
  }
}
