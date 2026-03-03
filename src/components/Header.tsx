import Link from 'next/link';

export default function Header({ isInner = false }: { isInner?: boolean }) {
    return (
        <header className="header" style={isInner ? { position: 'relative', backgroundColor: 'var(--bg-primary)' } : {}}>
            <div className="container headerInner">
                <Link href="/" className="logo">
                    <div className="logoIcon">M</div>
                    MOON TV
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
