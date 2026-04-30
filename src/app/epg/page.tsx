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
                    <span className="section-subtitle">MOON TV PROGRAM DETAILS - BATCH 1</span>
                    <h1 className="section-title">Programme <span>Details</span></h1>

                    <div style={{ marginTop: "3rem", backgroundColor: "var(--bg-secondary)", borderRadius: "12px", padding: "2rem", border: "1px solid var(--border-color)" }}>
                        <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Schedule details were not included in Batch 1.</h2>
                        <p style={{ color: "var(--text-secondary)", lineHeight: 1.7, maxWidth: "720px", marginBottom: "1.5rem" }}>
                            The supplied document includes programme details, show identity, purpose, format overview, personality, core audience, and programme images. It does not include broadcast dates or time slots.
                        </p>
                        <Link href="/programs" className="btn btn-green">View Programme Details</Link>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
