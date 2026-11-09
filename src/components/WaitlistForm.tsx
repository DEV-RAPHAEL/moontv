'use client';

import { useState } from 'react';

export default function WaitlistForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus('sending');
    setMessage('');

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: new FormData(form).get('email') }),
      });
      const result = await response.json();

      if (!response.ok) {
        setStatus('error');
        setMessage(result.error ?? 'Could not join the waitlist.');
        return;
      }

      form.reset();
      setStatus('success');
      setMessage("You're on the list.");
    } catch {
      setStatus('error');
      setMessage('Could not join the waitlist. Please try again later.');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="waitlistForm">
        <input
          type="email"
          name="email"
          placeholder="Your email address"
          className="waitlistInput"
          aria-label="Email address"
          required
          maxLength={254}
        />
        <button type="submit" className="waitlistBtn" disabled={status === 'sending'}>
          {status === 'sending' ? 'Joining…' : 'Join Waitlist'}
        </button>
      </div>
      {message && (
        <p
          role="status"
          style={{
            marginTop: '0.5rem',
            fontSize: '0.85rem',
            color: status === 'error' ? '#e88' : 'var(--accent-gold)',
          }}
        >
          {message}
        </p>
      )}
    </form>
  );
}
