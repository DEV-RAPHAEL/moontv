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
                        Where Nigeria's Energy <span>Begins</span>.
                    </h1>

                    <div style={{ marginTop: "2rem", fontSize: "1.2rem", color: "var(--text-secondary)", lineHeight: 1.8, maxWidth: "800px" }}>
                        Moon TV is a cultural and unity-driven television network dedicated to reshaping Nigeria’s narrative. We showcase authentic stories, celebrate diversity and spotlight the nation’s talent and potential. Our platform reflects pride, dignity and possibility.
                    </div>

                    <div style={{ display: "flex", gap: "4rem", marginTop: "4rem", flexWrap: "wrap" }}>
                        <div style={{ flex: 1, minWidth: "300px" }}>
                            <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "var(--accent-gold)" }}>Our Vision</h3>
                            <p style={{ color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "2rem" }}>
                                To become Nigeria’s leading cultural television channel.
                            </p>
                            <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "var(--accent-gold)" }}>Our Mission</h3>
                            <p style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}>
                                Promote Nigeria’s cultural richness through high quality programming.
                            </p>
                        </div>
                        <div style={{ flex: 1, minWidth: "300px", backgroundColor: "var(--bg-secondary)", borderRadius: "12px", padding: "3rem", border: "1px solid var(--border-color)" }}>
                            <h3 style={{ fontSize: "1.5rem", marginBottom: "2rem" }}>Brand Identity</h3>
                            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                                <div>
                                    <strong style={{ color: "var(--button-green)" }}>Authority & Prestige:</strong>
                                    <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginTop: "0.5rem" }}>Leading the conversation with credibility.</p>
                                </div>
                                <div>
                                    <strong style={{ color: "var(--button-green)" }}>National Pride:</strong>
                                    <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginTop: "0.5rem" }}>A dignified and hopeful representation of our culture.</p>
                                </div>
                                <div>
                                    <strong style={{ color: "var(--button-green)" }}>Stability:</strong>
                                    <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginTop: "0.5rem" }}>A consistent institutional identity across all platforms.</p>
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
