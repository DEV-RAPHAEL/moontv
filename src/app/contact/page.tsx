'use client';

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../home.css";

export default function Contact() {
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [error, setError] = useState('');

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const form = event.currentTarget;
        setStatus('sending');
        setError('');

        const data = Object.fromEntries(new FormData(form));

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            const result = await response.json();

            if (!response.ok) {
                setStatus('error');
                setError(result.error ?? 'Could not send your message.');
                return;
            }

            form.reset();
            setStatus('success');
        } catch {
            setStatus('error');
            setError('Could not send your message. Please try again later.');
        }
    }

    return (
        <>
            <Header isInner={true} />
            <main style={{ paddingTop: "60px", paddingBottom: "100px", minHeight: "100vh" }}>
                <div className="container" style={{ maxWidth: "800px" }}>
                    <span className="section-subtitle" style={{ textAlign: "center" }}>GET IN TOUCH</span>
                    <h1 className="section-title" style={{ textAlign: "center" }}>
                        Contact <span>Moon TV</span>
                    </h1>

                    <div style={{ backgroundColor: "var(--bg-secondary)", borderRadius: "12px", padding: "3rem", marginTop: "4rem", border: "1px solid var(--border-color)" }}>
                        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                            <div style={{ display: "flex", gap: "1.5rem" }}>
                                <input name="firstName" type="text" placeholder="First Name" required maxLength={100} style={{ flex: 1, padding: "1rem", backgroundColor: "var(--bg-primary)", border: "1px solid var(--border-color)", borderRadius: "4px", color: "white" }} />
                                <input name="lastName" type="text" placeholder="Last Name" required maxLength={100} style={{ flex: 1, padding: "1rem", backgroundColor: "var(--bg-primary)", border: "1px solid var(--border-color)", borderRadius: "4px", color: "white" }} />
                            </div>
                            <input name="email" type="email" placeholder="Email Address" required maxLength={254} style={{ padding: "1rem", backgroundColor: "var(--bg-primary)", border: "1px solid var(--border-color)", borderRadius: "4px", color: "white" }} />
                            <textarea name="message" placeholder="How can we help you?" rows={6} required maxLength={5000} style={{ padding: "1rem", backgroundColor: "var(--bg-primary)", border: "1px solid var(--border-color)", borderRadius: "4px", color: "white" }}></textarea>
                            <button type="submit" className="btn btn-green" disabled={status === 'sending'} style={{ padding: "1rem", opacity: status === 'sending' ? 0.7 : 1 }}>
                                {status === 'sending' ? 'Sending…' : 'Submit Message'}
                            </button>
                            {status === 'success' && (
                                <p style={{ color: "var(--button-green)", textAlign: "center" }}>Thanks — your message has been sent.</p>
                            )}
                            {status === 'error' && (
                                <p style={{ color: "#e88", textAlign: "center" }}>{error}</p>
                            )}
                        </form>
                    </div>

                    <div style={{ marginTop: "4rem", textAlign: "center", display: "flex", justifyContent: "space-between", borderTop: "1px solid var(--border-color)", paddingTop: "4rem", flexWrap: "wrap", gap: "2rem" }}>
                        <div>
                            <h4 style={{ color: "var(--accent-gold)", marginBottom: "0.5rem" }}>Website</h4>
                            <p style={{ color: "var(--text-secondary)" }}>moontvonline.com</p>
                        </div>
                        <div>
                            <h4 style={{ color: "var(--accent-gold)", marginBottom: "0.5rem" }}>Email Us</h4>
                            <p style={{ color: "var(--text-secondary)" }}>hello@moontvonline.com</p>
                        </div>
                        <div>
                            <h4 style={{ color: "var(--accent-gold)", marginBottom: "0.5rem" }}>Social Media</h4>
                            <p style={{ color: "var(--text-secondary)" }}>@MoonTVNG</p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
