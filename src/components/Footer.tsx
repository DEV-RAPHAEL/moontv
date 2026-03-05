import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footerTop">
                    <div className="footerLeft">
                        <h3 className="footerTitle">GET EARLY ACCESS</h3>
                        <p className="footerDesc">Join the waitlist to receive updates on our official launch.</p>
                        <div className="waitlistForm">
                            <input type="email" placeholder="Your email address" className="waitlistInput" />
                            <button className="waitlistBtn">Join Waitlist</button>
                        </div>
                    </div>
                    <div className="footerLinks">
                        <div className="footerCol">
                            <span className="footerColTitle">Programmes</span>
                            <Link href="/program/hello-nigeria" className="footerLink">Hello Nigeria</Link>
                            <Link href="/program/our-heritage" className="footerLink">Cultural Crossroads</Link>
                            <Link href="/program/tech-spotlight" className="footerLink">Innovations Hub</Link>
                            <Link href="/programs" className="footerLink">View All</Link>
                        </div>
                        <div className="footerCol">
                            <span className="footerColTitle">Company</span>
                            <Link href="/about" className="footerLink">About Us</Link>
                            <Link href="/advertise" className="footerLink">Advertise with us</Link>
                            <Link href="/contact" className="footerLink">Contact Form</Link>
                        </div>
                        <div className="footerCol">
                            <span className="footerColTitle">Subscribe</span>
                            <a href="https://moontvonline.com" className="footerLink">Website</a>
                            <a href="#" className="footerLink">Podcasts</a>
                            <a href="#" className="footerLink">@MoonTVNG</a>
                            <a href="#" className="footerLink">Press Office</a>
                        </div>
                    </div>
                </div>
                <div className="footerBottom">
                    <div className="bigLogo">MOON TV</div>
                    <p className="copyright">© 2026 moontvonline.com. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
