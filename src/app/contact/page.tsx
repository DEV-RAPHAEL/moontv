import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../home.css";

export default function Contact() {
    return (
        <>
            <Header isInner={true} />
            <main style={{ paddingTop: "60px", paddingBottom: "100px", minHeight: "100vh" }}>
                <div className="container" style={{ maxWidth: "800px" }}>
                    <span className="section-subtitle" style={{ textAlign: "center" }}>GET IN TOUCH</span>
                    <h1 className="section-title" style={{ textAlign: "center" }}>
                        Contact <span>Moon TV</span>
                    </h1>

                    <div style={{ backgroundColor: "var(--bg-secondary)", borderRadius: "12px", padding: "3rem", marginTop: "4rem", border: "1px solid var(--border-color)" }}>
                        <form style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                            <div style={{ display: "flex", gap: "1.5rem" }}>
                                <input type="text" placeholder="First Name" style={{ flex: 1, padding: "1rem", backgroundColor: "var(--bg-primary)", border: "1px solid var(--border-color)", borderRadius: "4px", color: "white" }} />
                                <input type="text" placeholder="Last Name" style={{ flex: 1, padding: "1rem", backgroundColor: "var(--bg-primary)", border: "1px solid var(--border-color)", borderRadius: "4px", color: "white" }} />
                            </div>
                            <input type="email" placeholder="Email Address" style={{ padding: "1rem", backgroundColor: "var(--bg-primary)", border: "1px solid var(--border-color)", borderRadius: "4px", color: "white" }} />
                            <textarea placeholder="How can we help you?" rows={6} style={{ padding: "1rem", backgroundColor: "var(--bg-primary)", border: "1px solid var(--border-color)", borderRadius: "4px", color: "white" }}></textarea>
                            <button className="btn btn-green" style={{ padding: "1rem" }}>Submit Message</button>
                        </form>
                    </div>

                    <div style={{ marginTop: "4rem", textAlign: "center", display: "flex", justifyContent: "space-between", borderTop: "1px solid var(--border-color)", paddingTop: "4rem", flexWrap: "wrap", gap: "2rem" }}>
                        <div>
                            <h4 style={{ color: "var(--accent-gold)", marginBottom: "0.5rem" }}>Website</h4>
                            <p style={{ color: "var(--text-secondary)" }}>moontvonline.com</p>
                        </div>
                        <div>
                            <h4 style={{ color: "var(--accent-gold)", marginBottom: "0.5rem" }}>Email Us</h4>
                            <p style={{ color: "var(--text-secondary)" }}>hello@moontvonline.com</p>
                        </div>
                        <div>
                            <h4 style={{ color: "var(--accent-gold)", marginBottom: "0.5rem" }}>Social Media</h4>
                            <p style={{ color: "var(--text-secondary)" }}>@MoonTVNG</p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
