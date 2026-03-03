import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../home.css";

export default function About() {
    return (
        <>
            <Header isInner={true} />
            <main style={{ paddingTop: "60px", paddingBottom: "100px", minHeight: "100vh" }}>
                <div className="container">
                    <span className="section-subtitle">ABOUT US</span>
                    <h1 className="section-title">
                        The heartbeat of <span>Nigeria</span>.
                    </h1>
                    <div style={{ display: "flex", gap: "4rem", marginTop: "4rem" }}>
                        <div style={{ flex: 1 }}>
                            <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "var(--accent-gold)" }}>Our Vision</h3>
                            <p style={{ color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "2rem" }}>
                                To be the most trusted and celebrated cultural broadcasting platform in Africa, showcasing the brilliant minds, diverse cultures, and untold stories of the Nigerian people.
                            </p>
                            <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "var(--accent-gold)" }}>Our Mission</h3>
                            <p style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}>
                                We exist to unite the nation through premium content. Moon TV goes beyond traditional broadcasting by creating a digital-first ecosystem where Nigerians at home and in the diaspora can actively participate in reshaping our narrative.
                            </p>
                        </div>
                        <div style={{ flex: 1, backgroundColor: "var(--bg-secondary)", borderRadius: "12px", padding: "3rem" }}>
                            <h3 style={{ fontSize: "1.5rem", marginBottom: "2rem" }}>Core Values</h3>
                            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                                <div>
                                    <strong style={{ color: "var(--button-green)" }}>Authenticity:</strong>
                                    <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginTop: "0.5rem" }}>Real stories from real people.</p>
                                </div>
                                <div>
                                    <strong style={{ color: "var(--button-green)" }}>Excellence:</strong>
                                    <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginTop: "0.5rem" }}>World-class production in everything we do.</p>
                                </div>
                                <div>
                                    <strong style={{ color: "var(--button-green)" }}>Innovation:</strong>
                                    <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginTop: "0.5rem" }}>Embracing the future of digital media.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
