import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../../home.css";

export default async function ProgramDetail({ params }: { params: { id: string } }) {
    // Mock data for the ID
    const prog = {
        title: "Hello Nigeria",
        category: "FLAGSHIP TALK SHOW",
        time: "Mon - Fri • 18:00 WAT",
        image: "/microphone.png",
        synopsis: "A national talk show designed to reposition Nigeria through truth, progress, and pride—safeguarding our culture, highlighting breakthroughs, innovation, leadership, and accountability across sectors.",
    };

    return (
        <>
            <Header isInner={true} />
            <main style={{ paddingTop: "60px", paddingBottom: "100px", minHeight: "100vh" }}>
                <div className="container">
                    <div style={{ position: "relative", width: "100%", height: "500px", borderRadius: "16px", overflow: "hidden", border: "1px solid var(--border-color)" }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={prog.image} alt={prog.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        <div style={{ position: "absolute", bottom: 0, left: 0, width: "100%", padding: "3rem", background: "linear-gradient(to top, rgba(5,11,7,1), transparent)" }}>
                            <span style={{ backgroundColor: "var(--button-green)", color: "white", padding: "0.4rem 1rem", fontSize: "0.9rem", borderRadius: "4px", display: "inline-block", marginBottom: "1rem", fontWeight: "600", letterSpacing: "1px" }}>
                                {prog.category}
                            </span>
                            <h1 style={{ fontSize: "4.5rem", fontWeight: "700", marginBottom: "0.5rem", letterSpacing: "-1px" }}>{prog.title}</h1>
                            <div style={{ color: "var(--accent-gold)", fontSize: "1.2rem", fontWeight: "500" }}>{prog.time}</div>
                        </div>
                    </div>

                    <div className="programDetailLayout" style={{ display: "flex", gap: "4rem", marginTop: "4rem", flexWrap: "wrap" }}>
                        <div style={{ flex: "2 1 600px" }}>
                            <h2 style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>Show Identity</h2>
                            <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, fontSize: "1.1rem", marginBottom: "2.5rem" }}>
                                {prog.synopsis}
                            </p>

                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem", marginBottom: "3rem" }}>
                                <div style={{ backgroundColor: "var(--bg-secondary)", padding: "2rem", borderRadius: "8px", borderLeft: "3px solid var(--accent-gold)" }}>
                                    <h3 style={{ fontSize: "1.2rem", marginBottom: "1rem", color: "white" }}>Show Purpose</h3>
                                    <ul style={{ color: "var(--text-secondary)", paddingLeft: "1.2rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                                        <li>Celebrate positive Nigerian achievements</li>
                                        <li>Shift national narrative from despair to progress</li>
                                        <li>Amplify Nigerian excellence by Nigerians</li>
                                        <li>Encourage accountability without hostility</li>
                                    </ul>
                                </div>

                                <div style={{ backgroundColor: "var(--bg-secondary)", padding: "2rem", borderRadius: "8px", borderLeft: "3px solid var(--button-green)" }}>
                                    <h3 style={{ fontSize: "1.2rem", marginBottom: "1rem", color: "white" }}>Core Audience</h3>
                                    <ul style={{ color: "var(--text-secondary)", paddingLeft: "1.2rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                                        <li>Ages 18–85</li>
                                        <li>Politically aware, socially conscious Nigerians</li>
                                        <li>Citizens who influence conversations online and offline</li>
                                    </ul>
                                </div>
                            </div>

                            <h2 style={{ fontSize: "1.8rem", marginBottom: "1.5rem" }}>Format & Tone</h2>
                            <div style={{ display: "flex", gap: "2rem", marginBottom: "2rem", flexWrap: "wrap" }}>
                                <div style={{ flex: "1 1 300px" }}>
                                    <h4 style={{ color: "var(--accent-gold)", marginBottom: "0.5rem" }}>Format Overview</h4>
                                    <p style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}>
                                        Studio-based talk show featuring guest interviews with policy leaders, innovators, creatives, and reformers. We drive conversations that inform, inspire, and mobilize.
                                    </p>
                                </div>
                                <div style={{ flex: "1 1 300px" }}>
                                    <h4 style={{ color: "var(--accent-gold)", marginBottom: "0.5rem" }}>Show Personality</h4>
                                    <p style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}>
                                        Dignified, hopeful, credible, and patriotic without propaganda. The mood is set around authority, prestige, stability and national pride.
                                    </p>
                                </div>
                            </div>

                            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", padding: "1.5rem", border: "1px dashed rgba(216, 182, 66, 0.4)", borderRadius: "8px", marginTop: "2rem", backgroundColor: "rgba(216, 182, 66, 0.05)" }}>
                                <strong>Broadcasting Context:</strong> Aired on a television station by the Nigerian Senate. Carries institutional credibility and national responsibility. Supported across Television, Instagram, TikTok, and YouTube.
                            </p>
                        </div>

                        <div style={{ flex: "1 1 300px" }}>
                            <div style={{ backgroundColor: "var(--bg-secondary)", borderRadius: "12px", padding: "2rem", border: "1px solid var(--border-color)", position: "sticky", top: "100px" }}>
                                <h3 style={{ fontSize: "1.2rem", color: "var(--accent-gold)", marginBottom: "1.5rem" }}>Other Programmes</h3>
                                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                                    <a href="/programs/2" style={{ display: "flex", gap: "1rem", alignItems: "center", borderBottom: "1px solid var(--border-color)", paddingBottom: "1rem" }}>
                                        <img src="/program_1.png" style={{ width: "80px", height: "60px", objectFit: "cover", borderRadius: "4px" }} alt="" />
                                        <div>
                                            <h4 style={{ fontSize: "1rem", color: "white" }}>Our Heritage</h4>
                                            <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>DOCUMENTARY</span>
                                        </div>
                                    </a>
                                    <a href="/programs/3" style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                                        <img src="/program_2.png" style={{ width: "80px", height: "60px", objectFit: "cover", borderRadius: "4px" }} alt="" />
                                        <div>
                                            <h4 style={{ fontSize: "1rem", color: "white" }}>Tech Spotlight</h4>
                                            <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>TECH</span>
                                        </div>
                                    </a>
                                </div>
                                <button className="btn btn-green" style={{ width: "100%", marginTop: "2rem" }}>View Full Schedule</button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
