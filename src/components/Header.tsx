import Link from 'next/link';
import Image from 'next/image';

export default function Header({ isInner = false }: { isInner?: boolean }) {
    return (
        <header className="header" style={isInner ? { position: 'relative', backgroundColor: 'var(--bg-primary)' } : {}}>
            <div className="container headerInner">
                <Link href="/" className="logo">
                    <Image src="/logo.png" alt="Moon TV Logo" width={40} height={40} className="logoImage" onError={(e) => {
                        // Fallback if logo.png doesn't exist yet
                        e.currentTarget.style.display = 'none';
                        const parent = e.currentTarget.parentElement;
                        if (parent) {
                            const icon = document.createElement('div');
                            icon.className = 'logoIcon';
                            icon.innerText = 'M';
                            parent.prepend(icon);
                        }
                    }} />
                    <span>MOON TV</span>
                </Link>
                <nav className="nav">
                    <Link href="/programs" className="navLink">Programmes</Link>
                    <Link href="/epg" className="navLink">Schedule</Link>
                    <Link href="/about" className="navLink">About</Link>
                    <Link href="/advertise" className="navLink">Advertise</Link>
                    <Link href="/contact" className="navLink">Contact</Link>
                </nav>
                <button className="btn btn-green">Watch Live</button>
            </div>
        </header>
    );
}
