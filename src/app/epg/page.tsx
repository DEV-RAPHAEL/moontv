import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import "../home.css";

export default function EPG() {
    return (
        <>
            <Header isInner={true} />
            <main style={{ paddingTop: "60px", paddingBottom: "100px", minHeight: "100vh" }}>
                <div className="container">
                    <span className="section-subtitle">MOON TV SCHEDULE</span>
                    <h1 className="section-title">Programme <span>Details</span></h1>

                    <div style={{ marginTop: "3rem", backgroundColor: "var(--bg-secondary)", borderRadius: "12px", padding: "2rem", border: "1px solid var(--border-color)" }}>
                        <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Schedule coming soon.</h2>
                        <p style={{ color: "var(--text-secondary)", maxWidth: "600px" }}>We are currently updating our broadcast schedule. Stay tuned for updates on our latest programmes and showtimes.</p>
                        <Link href="/programs" className="btn btn-green">View Programme Details</Link>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
