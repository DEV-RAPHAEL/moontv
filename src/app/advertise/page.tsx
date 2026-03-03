import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../home.css";

export default function Advertise() {
    return (
        <>
            <Header isInner={true} />
            <main style={{ paddingTop: "60px", paddingBottom: "100px", minHeight: "100vh" }}>
                <div className="container">
                    <span className="section-subtitle">ADVERTISE WITH US</span>
                    <h1 className="section-title">
                        Partner with <span>Moon TV</span>
                    </h1>

                    <div style={{ display: "flex", gap: "4rem", marginTop: "4rem" }}>
                        <div style={{ flex: 1 }}>
                            <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "var(--accent-gold)" }}>Our Audience Value</h3>
                            <p style={{ color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "2rem" }}>
                                Reach millions of Nigerians daily. Moon TV offers unparalleled access to a highly engaged demographic through premium cultural and entertainment programming.
                            </p>

                            <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "var(--accent-gold)" }}>Partnership Types</h3>
                            <ul style={{ color: "var(--text-secondary)", listStyle: "none", display: "flex", flexDirection: "column", gap: "1rem" }}>
                                <li>📺 <strong>TV Commercials:</strong> Prime time slots during top-rated shows.</li>
                                <li>🤝 <strong>Program Sponsorship:</strong> Exclusive branding for specific cultural and tech shows.</li>
                                <li>🖥️ <strong>Digital Ads:</strong> Banner and video placements across our web and mobile apps.</li>
                            </ul>

                            <button className="btn btn-green" style={{ marginTop: "3rem", padding: "1rem 2rem" }}>⬇ Download Rate Card (PDF)</button>
                        </div>

                        <div style={{ flex: 1, backgroundColor: "var(--bg-secondary)", borderRadius: "12px", padding: "3rem", border: "1px solid var(--border-color)" }}>
                            <h3 style={{ fontSize: "1.5rem", marginBottom: "2rem" }}>Inquire About Advertising</h3>
                            <form style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                                <input type="text" placeholder="Company Name" style={{ width: "100%", padding: "1rem", backgroundColor: "var(--bg-primary)", border: "1px solid var(--border-color)", borderRadius: "4px", color: "white" }} />
                                <input type="email" placeholder="Email Address" style={{ width: "100%", padding: "1rem", backgroundColor: "var(--bg-primary)", border: "1px solid var(--border-color)", borderRadius: "4px", color: "white" }} />
                                <select style={{ width: "100%", padding: "1rem", backgroundColor: "var(--bg-primary)", border: "1px solid var(--border-color)", borderRadius: "4px", color: "white" }}>
                                    <option>Select Partnership Type</option>
                                    <option>TV Commercials</option>
                                    <option>Program Sponsorship</option>
                                    <option>Digital Ads</option>
                                </select>
                                <textarea placeholder="Message" rows={4} style={{ width: "100%", padding: "1rem", backgroundColor: "var(--bg-primary)", border: "1px solid var(--border-color)", borderRadius: "4px", color: "white" }}></textarea>
                                <button className="btn btn-outline-gold" style={{ padding: "1rem" }}>Send Inquiry</button>
                            </form>
                        </div>
                    </div>

                </div>
            </main>
            <Footer />
        </>
    );
}
