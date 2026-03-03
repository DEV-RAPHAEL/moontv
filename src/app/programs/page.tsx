import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../home.css";

export default function Programs() {
    const categories = ["ALL", "CULTURE", "TECH", "DRAMA", "ENTERTAINMENT", "NEWS", "DOCUMENTARY"];
    const programs = [
        { id: 1, title: "Hello Nigeria", category: "CULTURE", time: "Mon - Fri • 18:00 WAT", image: "/mountain.png" },
        { id: 2, title: "Cultural Crossroads", category: "DANCE", time: "Saturdays • 20:00 WAT", image: "/program_1.png" },
        { id: 3, title: "Innovations Hub", category: "TECH", time: "Sundays • 16:00 WAT", image: "/program_2.png" },
        { id: 4, title: "The Rise of Africa", category: "DRAMA", time: "Fridays • 21:00 WAT", image: "/program_3.png" },
        { id: 5, title: "Lagos Street Food", category: "DOCUMENTARY", time: "Wednesdays • 19:00 WAT", image: "/hero_bg.png" },
        { id: 6, title: "Tech Giants", category: "TECH", time: "Tuesdays • 20:00 WAT", image: "/program_2.png" },
    ];

    return (
        <>
            <Header isInner={true} />
            <main style={{ paddingTop: "60px", paddingBottom: "100px", minHeight: "100vh" }}>
                <div className="container">
                    <h1 className="section-title">
                        Explore Our <span>Programs</span>
                    </h1>
                    <div style={{ display: "flex", gap: "1rem", marginBottom: "3rem", flexWrap: "wrap" }}>
                        {categories.map((cat, idx) => (
                            <button key={idx} className={idx === 0 ? "btn btn-green" : "btn btn-outline-gold"} style={{ padding: "0.5rem 1rem", fontSize: "0.8rem" }}>
                                {cat}
                            </button>
                        ))}
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "2rem" }}>
                        {programs.map((prog) => (
                            <a href={`/programs/${prog.id}`} key={prog.id} style={{ display: "block" }}>
                                <div style={{ backgroundColor: "var(--bg-secondary)", borderRadius: "8px", overflow: "hidden", border: "1px solid var(--border-color)", transition: "border-color 0.3s" }}>
                                    <div style={{ width: "100%", height: "200px", position: "relative", backgroundColor: "#0b1a0e" }}>
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={prog.image} alt={prog.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                    </div>
                                    <div style={{ padding: "1.5rem" }}>
                                        <span style={{ backgroundColor: "var(--button-green)", color: "white", padding: "0.2rem 0.6rem", fontSize: "0.7rem", borderRadius: "4px", display: "inline-block", marginBottom: "0.5rem" }}>
                                            {prog.category}
                                        </span>
                                        <h3 style={{ fontSize: "1.2rem", fontWeight: "600", marginBottom: "0.5rem" }}>{prog.title}</h3>
                                        <div style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginBottom: "1rem" }}>{prog.time}</div>
                                        <span style={{ color: "var(--accent-gold)", fontWeight: "500", fontSize: "0.9rem" }}>View Details →</span>
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
