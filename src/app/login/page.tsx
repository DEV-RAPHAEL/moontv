'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import '../../app/admin/admin.css';

export default function LoginPage() {
    const router = useRouter();
    const [isRegister, setIsRegister] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!email || !password || (isRegister && !name)) {
            alert('Please fill out all fields');
            return;
        }

        const username = isRegister ? name : email.split('@')[0];
        const userObj = { username, email, loggedIn: true };
        
        localStorage.setItem('moon_user', JSON.stringify(userObj));
        alert(isRegister ? 'Registration successful!' : 'Login successful!');
        
        router.push('/');
        setTimeout(() => {
            window.location.reload();
        }, 300);
    };

    return (
        <div className="admin-container" style={{ justifyContent: 'center', minHeight: '100vh', backgroundColor: '#050b07' }}>
            <div className="admin-login-card" style={{ width: '100%', maxWidth: '420px', padding: '2.5rem', background: '#08170c', border: '1px solid rgba(216, 182, 66, 0.15)', borderRadius: '16px', boxShadow: '0 12px 40px rgba(0,0,0,0.5)' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <Link href="/">
                        <Image src="/logo.png" alt="Moon TV Logo" width={60} height={60} style={{ borderRadius: '50%', border: '2px solid var(--accent-gold)' }} />
                    </Link>
                    <h1 style={{ color: 'white', fontSize: '1.8rem', fontWeight: 'bold', marginTop: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        {isRegister ? 'Create Account' : 'Welcome Back'}
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                        {isRegister ? 'Sign up to customize your EPG favorites' : 'Sign in to sync your favorite EPG channels'}
                    </p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                    {isRegister && (
                        <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                            <label style={{ color: 'white', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Full Name</label>
                            <input
                                type="text"
                                className="form-input"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'white', padding: '0.8rem 1rem', borderRadius: '8px' }}
                            />
                        </div>
                    )}

                    <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        <label style={{ color: 'white', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Email Address</label>
                        <input
                            type="email"
                            className="form-input"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'white', padding: '0.8rem 1rem', borderRadius: '8px' }}
                        />
                    </div>

                    <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        <label style={{ color: 'white', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Password</label>
                        <input
                            type="password"
                            className="form-input"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'white', padding: '0.8rem 1rem', borderRadius: '8px' }}
                        />
                    </div>

                    <button type="submit" className="btn btn-green" style={{ width: '100%', padding: '0.9rem', fontSize: '1rem', fontWeight: 'bold', marginTop: '0.8rem', borderRadius: '8px', cursor: 'pointer' }}>
                        {isRegister ? 'Register' : 'Sign In'}
                    </button>
                </form>

                <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem' }}>
                    <p style={{ color: 'var(--text-secondary)' }}>
                        {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
                        <button
                            onClick={() => setIsRegister(!isRegister)}
                            style={{ color: 'var(--accent-gold)', background: 'none', border: 'none', fontWeight: 'bold', cursor: 'pointer', textDecoration: 'underline' }}
                        >
                            {isRegister ? 'Sign In' : 'Sign Up'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
