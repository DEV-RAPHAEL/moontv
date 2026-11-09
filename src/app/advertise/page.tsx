'use client';

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../home.css";

export default function Advertise() {
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [error, setError] = useState('');

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const form = event.currentTarget;
        setStatus('sending');
        setError('');

        const data = Object.fromEntries(new FormData(form));

        try {
            const response = await fetch('/api/advertise', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            const result = await response.json();

            if (!response.ok) {
                setStatus('error');
                setError(result.error ?? 'Could not send your inquiry.');
                return;
            }

            form.reset();
            setStatus('success');
        } catch {
            setStatus('error');
            setError('Could not send your inquiry. Please try again later.');
        }
    }

    return (
        <>
            <Header isInner={true} />
            <main style={{ paddingTop: "60px", paddingBottom: "100px", minHeight: "100vh" }}>
                <div className="container">
                    <span className="section-subtitle">ADVERTISE WITH US</span>
                    <h1 className="section-title">
                        Partner with <span>Moon TV</span>
                    </h1>

                    <div style={{ display: "flex", gap: "4rem", marginTop: "4rem" }}>
                        <div style={{ flex: 1 }}>
                            <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "var(--accent-gold)" }}>Our Audience Value</h3>
                            <p style={{ color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "2rem" }}>
                                Reach millions of Nigerians daily. Moon TV offers unparalleled access to a highly engaged demographic through premium cultural and entertainment programming.
                            </p>

                            <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "var(--accent-gold)" }}>Partnership Types</h3>
                            <ul style={{ color: "var(--text-secondary)", listStyle: "none", display: "flex", flexDirection: "column", gap: "1rem" }}>
                                <li>📺 <strong>TV Commercials:</strong> Prime time slots during top-rated shows.</li>
                                <li>🤝 <strong>Program Sponsorship:</strong> Exclusive branding for specific cultural and tech shows.</li>
                                <li>🖥️ <strong>Digital Ads:</strong> Banner and video placements across our web and mobile apps.</li>
                            </ul>

                            <button className="btn btn-green" style={{ marginTop: "3rem", padding: "1rem 2rem" }}>⬇ Download Rate Card (PDF)</button>
                        </div>

                        <div style={{ flex: 1, backgroundColor: "var(--bg-secondary)", borderRadius: "12px", padding: "3rem", border: "1px solid var(--border-color)" }}>
                            <h3 style={{ fontSize: "1.5rem", marginBottom: "2rem" }}>Inquire About Advertising</h3>
                            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                                <input name="companyName" type="text" placeholder="Company Name" required maxLength={200} style={{ width: "100%", padding: "1rem", backgroundColor: "var(--bg-primary)", border: "1px solid var(--border-color)", borderRadius: "4px", color: "white" }} />
                                <input name="email" type="email" placeholder="Email Address" required maxLength={254} style={{ width: "100%", padding: "1rem", backgroundColor: "var(--bg-primary)", border: "1px solid var(--border-color)", borderRadius: "4px", color: "white" }} />
                                <select name="partnershipType" required defaultValue="" style={{ width: "100%", padding: "1rem", backgroundColor: "var(--bg-primary)", border: "1px solid var(--border-color)", borderRadius: "4px", color: "white" }}>
                                    <option value="" disabled>Select Partnership Type</option>
                                    <option>TV Commercials</option>
                                    <option>Program Sponsorship</option>
                                    <option>Digital Ads</option>
                                </select>
                                <textarea name="message" placeholder="Message" rows={4} maxLength={5000} style={{ width: "100%", padding: "1rem", backgroundColor: "var(--bg-primary)", border: "1px solid var(--border-color)", borderRadius: "4px", color: "white" }}></textarea>
                                <button type="submit" className="btn btn-outline-gold" disabled={status === 'sending'} style={{ padding: "1rem", opacity: status === 'sending' ? 0.7 : 1 }}>
                                    {status === 'sending' ? 'Sending…' : 'Send Inquiry'}
                                </button>
                                {status === 'success' && (
                                    <p style={{ color: "var(--button-green)", textAlign: "center" }}>Thanks — your inquiry has been sent.</p>
                                )}
                                {status === 'error' && (
                                    <p style={{ color: "#e88", textAlign: "center" }}>{error}</p>
                                )}
                            </form>
                        </div>
                    </div>

                </div>
            </main>
            <Footer />
        </>
    );
}
