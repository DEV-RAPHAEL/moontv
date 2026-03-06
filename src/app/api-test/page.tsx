'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ApiTestPage() {
    const [wpUrl, setWpUrl] = useState('http://moontv.local');
    const [programmes, setProgrammes] = useState<any>(null);
    const [schedules, setSchedules] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const testApi = async () => {
        setLoading(true);
        setError('');
        setProgrammes(null);
        setSchedules(null);

        try {
            // Remove trailing slash if present
            const baseUrl = wpUrl.replace(/\/$/, '');

            // Fetch Programmes
            const progRes = await fetch(`${baseUrl}/wp-json/wp/v2/programme`);
            if (!progRes.ok) throw new Error(`Programmes API returned status: ${progRes.status}`);
            const progData = await progRes.json();
            setProgrammes(progData);

            // Fetch Schedules
            const schedRes = await fetch(`${baseUrl}/wp-json/wp/v2/schedule`);
            if (!schedRes.ok) throw new Error(`Schedules API returned status: ${schedRes.status}`);
            const schedData = await schedRes.json();
            setSchedules(schedData);

        } catch (err: any) {
            setError(err.message || 'Failed to fetch data. Check your WordPress URL and ensure the API is accessible.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh', color: 'white' }}>
            <Header isInner={true} />

            <div className="container" style={{ paddingTop: '8rem', paddingBottom: '4rem' }}>
                <h1 style={{ fontSize: '2.5rem', color: 'var(--accent-gold)', marginBottom: '2rem' }}>API Connection Test</h1>

                <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border-color)', marginBottom: '2rem' }}>
                    <p style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>
                        Enter your LocalWP site URL below to test if the custom Moon TV REST API is working correctly.
                    </p>

                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <input
                            type="text"
                            value={wpUrl}
                            onChange={(e) => setWpUrl(e.target.value)}
                            placeholder="e.g., http://moontv.local"
                            style={{ flex: '1', minWidth: '300px', padding: '0.8rem 1rem', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'transparent', color: 'white', fontSize: '1rem' }}
                        />
                        <button
                            onClick={testApi}
                            disabled={loading}
                            className="btn btn-green"
                            style={{
                                opacity: loading ? 0.7 : 1,
                                cursor: loading ? 'wait' : 'pointer',
                                padding: '0.8rem 2rem'
                            }}
                        >
                            {loading ? 'Testing...' : 'Test API Connection'}
                        </button>
                    </div>

                    {error && (
                        <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: 'rgba(255, 0, 0, 0.1)', borderLeft: '4px solid red', color: '#ff6b6b' }}>
                            {error}
                        </div>
                    )}
                </div>

                {programmes && (
                    <div style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: 'white' }}>
                            Programmes Found: <span style={{ color: 'var(--button-green)' }}>{programmes.length}</span>
                        </h2>
                        <div style={{ backgroundColor: '#0a0a0a', padding: '1.5rem', borderRadius: '8px', overflowX: 'auto', border: '1px solid #333' }}>
                            <pre style={{ color: '#a3b8aa', fontSize: '0.9rem' }}>
                                {JSON.stringify(programmes, null, 2)}
                            </pre>
                        </div>
                    </div>
                )}

                {schedules && (
                    <div style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: 'white' }}>
                            Schedules Found: <span style={{ color: 'var(--button-green)' }}>{schedules.length}</span>
                        </h2>
                        <div style={{ backgroundColor: '#0a0a0a', padding: '1.5rem', borderRadius: '8px', overflowX: 'auto', border: '1px solid #333' }}>
                            <pre style={{ color: '#a3b8aa', fontSize: '0.9rem' }}>
                                {JSON.stringify(schedules, null, 2)}
                            </pre>
                        </div>
                    </div>
                )}
            </div>

            <Footer />
        </main>
    );
}
