import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../home.css";

export default function EPG() {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const timeSlots = ["08:00 AM", "10:30 AM", "01:00 PM", "04:30 PM", "06:00 PM", "08:00 PM"];

    return (
        <>
            <Header isInner={true} />
            <main style={{ paddingTop: "60px", paddingBottom: "100px", minHeight: "100vh" }}>
                <div className="container">
                    <span className="section-subtitle">SCHEDULE</span>
                    <h1 className="section-title">
                        Weekly <span>EPG Guide</span>
                    </h1>

                    <div style={{ marginTop: "3rem", display: "flex", gap: "1rem", overflowX: "auto", paddingBottom: "1rem" }}>
                        {days.map((day, idx) => (
                            <button key={idx} className={idx === 0 ? "btn btn-green" : "btn btn-outline-gold"} style={{ minWidth: "120px" }}>
                                {day}
                            </button>
                        ))}
                    </div>

                    <div style={{ marginTop: "2rem", backgroundColor: "var(--bg-secondary)", borderRadius: "12px", padding: "1rem", border: "1px solid var(--border-color)" }}>
                        {timeSlots.map((time, idx) => (
                            <div key={idx} style={{
                                display: "flex",
                                alignItems: "center",
                                padding: "1.5rem 1rem",
                                borderBottom: idx === timeSlots.length - 1 ? "none" : "1px solid var(--border-color)"
                            }}>
                                <div style={{ width: "120px", color: "var(--accent-gold)", fontWeight: "600", fontSize: "0.9rem" }}>
                                    {time}
                                </div>
                                <div style={{ flex: 1, paddingLeft: "2rem", borderLeft: "2px solid var(--button-green)" }}>
                                    <h3 style={{ fontSize: "1.1rem", marginBottom: "0.25rem" }}>
                                        {idx % 2 === 0 ? "Cultural Crossroads" : "Hello Nigeria LIVE"}
                                    </h3>
                                    <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}>
                                        {idx === 4 ? "NOW PLAYING" : "Upcoming Show"}
                                    </p>
                                </div>
                                <button className="btn btn-outline-green" style={{ padding: "0.4rem 1.2rem", fontSize: "0.8rem" }}>Alert Me</button>
                            </div>
                        ))}
                    </div>

                </div>
            </main>
            <Footer />
        </>
    );
}
