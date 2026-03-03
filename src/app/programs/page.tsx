import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../home.css";

export default function Programs() {
    const categories = ["ALL", "MOVIES & SERIES", "DOCUMENTARIES & FEATURES", "NIGERIAN CLASSICS", "TALK SHOWS"];
    const programs = [
        { id: 1, title: "Hello Nigeria", category: "TALK SHOWS", time: "Mon - Fri • 18:00 WAT", image: "/microphone.png", desc: "Flagship show celebrating Nigerian innovation, excellence and leadership across sectors in Nigeria." },
        { id: 2, title: "Nollywood Nights", category: "MOVIES & SERIES", time: "Saturdays • 20:00 WAT", image: "/program_3.png", desc: "Thrilling and entertaining movies and series showcasing the best of contemporary Nigeria." },
        { id: 3, title: "Our Heritage", category: "DOCUMENTARIES & FEATURES", time: "Sundays • 16:00 WAT", image: "/program_1.png", desc: "Documentaries and features celebrating our rich cultural heritage." },
        { id: 4, title: "Legends of the Screen", category: "NIGERIAN CLASSICS", time: "Fridays • 21:00 WAT", image: "/hero_bg.png", desc: "Beloved classics featuring Nigerian icons." },
        { id: 5, title: "Tech Spotlight", category: "DOCUMENTARIES & FEATURES", time: "Wednesdays • 19:00 WAT", image: "/program_2.png", desc: "Highlighting breakthroughs and innovation." },
    ];

    return (
        <>
            <Header isInner={true} />
            <main style={{ paddingTop: "60px", paddingBottom: "100px", minHeight: "100vh" }}>
                <div className="container">
                    <h1 className="section-title">
                        Explore Our <span>Programmes</span>
                    </h1>
                    <p style={{ color: "var(--text-secondary)", marginBottom: "3rem", maxWidth: "600px", fontSize: "1.1rem" }}>
                        From beloved classics to thrilling contemporary series, explore content that reflects our pride, dignity, and cultural richness.
                    </p>
                    <div style={{ display: "flex", gap: "1rem", marginBottom: "3rem", flexWrap: "wrap" }}>
                        {categories.map((cat, idx) => (
                            <button key={idx} className={idx === 0 ? "btn btn-green" : "btn btn-outline-gold"} style={{ padding: "0.5rem 1rem", fontSize: "0.8rem" }}>
                                {cat}
                            </button>
                        ))}
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "2rem" }}>
                        {programs.map((prog) => (
                            <a href={`/programs/${prog.id}`} key={prog.id} style={{ display: "block" }}>
                                <div style={{ backgroundColor: "var(--bg-secondary)", borderRadius: "8px", overflow: "hidden", border: "1px solid var(--border-color)", transition: "border-color 0.3s", height: "100%", display: "flex", flexDirection: "column" }}>
                                    <div style={{ width: "100%", height: "200px", position: "relative", backgroundColor: "#0b1a0e" }}>
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={prog.image} alt={prog.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                    </div>
                                    <div style={{ padding: "1.5rem", flex: 1, display: "flex", flexDirection: "column" }}>
                                        <span style={{ backgroundColor: "var(--button-green)", color: "white", padding: "0.2rem 0.6rem", fontSize: "0.7rem", borderRadius: "4px", display: "inline-block", marginBottom: "0.5rem", fontWeight: "600", width: "fit-content" }}>
                                            {prog.category}
                                        </span>
                                        <h3 style={{ fontSize: "1.3rem", fontWeight: "600", marginBottom: "0.5rem", color: "white" }}>{prog.title}</h3>
                                        <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.5, marginBottom: "1.5rem", flex: 1 }}>{prog.desc}</p>
                                        <div style={{ color: "var(--accent-gold)", fontSize: "0.85rem", fontWeight: "500" }}>{prog.time}</div>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
