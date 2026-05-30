'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header({ isInner = false }: { isInner?: boolean }) {
    const [user, setUser] = useState<{ username: string } | null>(null);

    useEffect(() => {
        const stored = localStorage.getItem('moon_user');
        if (stored) {
            try {
                setUser(JSON.parse(stored));
            } catch (e) {
                // ignore
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('moon_user');
        setUser(null);
        alert('You have logged out.');
        window.location.reload();
    };

    return (
        <header className="header" style={isInner ? { position: 'relative', backgroundColor: 'var(--bg-primary)' } : {}}>
            <div className="container headerInner">
                <Link href="/" className="logo">
                    <Image src="/logo.png" alt="Moon TV Logo" width={40} height={40} className="logoImage" />
                    <span>MOON TV</span>
                </Link>
                <nav className="nav">
                    <Link href="/programs" className="navLink">Programmes</Link>
                    <Link href="/epg" className="navLink">Schedule</Link>
                    <Link href="/about" className="navLink">About</Link>
                    <Link href="/advertise" className="navLink">Advertise</Link>
                    <Link href="/contact" className="navLink">Contact</Link>
                </nav>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    {user ? (
                        <>
                            <span style={{ color: 'var(--accent-gold)', fontWeight: 'bold', fontSize: '0.9rem' }}>
                                Hello, {user.username}
                            </span>
                            <button onClick={handleLogout} className="btn btn-outline-gold" style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}>
                                Log Out
                            </button>
                        </>
                    ) : (
                        <Link href="/login" className="btn btn-outline-gold" style={{ padding: '0.4rem 1.2rem', fontSize: '0.9rem' }}>
                            Sign In
                        </Link>
                    )}
                    <button className="btn btn-green">Watch Live</button>
                </div>
            </div>
        </header>
    );
}
