import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../../home.css";

export default async function ProgramDetail({ params }: { params: { id: string } }) {
    // Mock data for the ID
    const prog = {
        title: "Hello Nigeria",
        category: "CULTURE",
        time: "Mon - Fri • 18:00 WAT",
        image: "/microphone.png",
        synopsis: "A new show that brings the entire nation closer. We highlight the stories of ordinary people doing extraordinary things, and we showcase the unique cultures of Nigeria.",
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
                            <span style={{ backgroundColor: "var(--button-green)", color: "white", padding: "0.4rem 1rem", fontSize: "0.9rem", borderRadius: "4px", display: "inline-block", marginBottom: "1rem", fontWeight: "600" }}>
                                {prog.category}
                            </span>
                            <h1 style={{ fontSize: "4rem", fontWeight: "700", marginBottom: "0.5rem" }}>{prog.title}</h1>
                            <div style={{ color: "var(--accent-gold)", fontSize: "1.2rem", fontWeight: "500" }}>{prog.time}</div>
                        </div>
                    </div>

                    <div style={{ display: "flex", gap: "4rem", marginTop: "4rem" }}>
                        <div style={{ flex: 2 }}>
                            <h2 style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>Synopsis</h2>
                            <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, fontSize: "1.1rem" }}>
                                {prog.synopsis}
                            </p>
                            <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, fontSize: "1.1rem", marginTop: "1.5rem" }}>
                                Join our hosts as they travel across the vibrant cities and breathtaking landscapes of the nation, capturing the spirit of a united people. Through revealing interviews, cultural performances, and deep dives into the lives of everyday heroes, "Hello Nigeria" stands as a testament to the resilience and beauty of the Nigerian spirit.
                            </p>
                        </div>
                        <div style={{ flex: 1, backgroundColor: "var(--bg-secondary)", borderRadius: "12px", padding: "2rem", border: "1px solid var(--border-color)", height: "fit-content" }}>
                            <h3 style={{ fontSize: "1.2rem", color: "var(--accent-gold)", marginBottom: "1.5rem" }}>Related Programs</h3>
                            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                                <a href="/programs/2" style={{ display: "flex", gap: "1rem", alignItems: "center", borderBottom: "1px solid var(--border-color)", paddingBottom: "1rem" }}>
                                    <img src="/program_1.png" style={{ width: "80px", height: "60px", objectFit: "cover", borderRadius: "4px" }} alt="" />
                                    <div>
                                        <h4 style={{ fontSize: "1rem" }}>Cultural Crossroads</h4>
                                        <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>DANCE</span>
                                    </div>
                                </a>
                                <a href="/programs/3" style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                                    <img src="/program_2.png" style={{ width: "80px", height: "60px", objectFit: "cover", borderRadius: "4px" }} alt="" />
                                    <div>
                                        <h4 style={{ fontSize: "1rem" }}>Innovations Hub</h4>
                                        <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>TECH</span>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
