import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getProgrammeBySlug, programmes } from "@/lib/programmes";
import Image from "next/image";
import { notFound } from "next/navigation";
import "../../home.css";

export async function generateStaticParams() {
    return programmes.map((programme) => ({ slug: programme.slug }));
}

export default async function ProgramDetail({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const prog = getProgrammeBySlug(resolvedParams.slug);

    if (!prog) {
        notFound();
    }

    const otherProgrammes = programmes.filter((programme) => programme.slug !== prog.slug).slice(0, 3);

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
                            <div style={{ color: "var(--accent-gold)", fontSize: "1.2rem", fontWeight: "500" }}>{prog.category}</div>
                        </div>
                    </div>

                    <div className="programDetailLayout" style={{ display: "flex", gap: "4rem", marginTop: "4rem", flexWrap: "wrap" }}>
                        <div style={{ flex: "2 1 600px" }}>
                            <h2 style={{ fontSize: "2rem", marginBottom: "1.5rem", fontWeight: "600", color: "white" }}>Synopsis</h2>
                            <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, fontSize: "1.15rem", marginBottom: "3rem" }}>
                                {prog.synopsis}
                            </p>

                            {prog.notableCast.length > 0 && (
                                <>
                                    <h2 style={{ fontSize: "2rem", marginBottom: "1.5rem", fontWeight: "600", color: "white" }}>Notable Cast & Hosts</h2>
                                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem", marginBottom: "3.5rem" }}>
                                        {prog.notableCast.map((castMember) => (
                                            <div key={castMember} style={{ display: "flex", alignItems: "center", gap: "1rem", backgroundColor: "var(--bg-secondary)", padding: "1.25rem 1.5rem", borderRadius: "8px", border: "1px solid var(--border-color)" }}>
                                                <div style={{ width: "44px", height: "44px", borderRadius: "50%", backgroundColor: "rgba(216, 182, 66, 0.08)", border: "1.5px solid var(--accent-gold)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent-gold)", fontSize: "1.1rem", fontWeight: "700", flexShrink: 0 }}>
                                                    {castMember.split(' ').map(n => n[0]).join('')}
                                                </div>
                                                <div>
                                                    <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px", fontWeight: "600" }}>
                                                        {prog.category.includes("TALK") || prog.category.includes("CULINARY") || prog.category.includes("AVIATION") || prog.category.includes("HEALTH") ? "Host / Presenter" : "Cast Member"}
                                                    </div>
                                                    <h4 style={{ fontSize: "1.05rem", fontWeight: "600", color: "white", marginTop: "2px" }}>{castMember}</h4>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}

                            <h2 style={{ fontSize: "1.8rem", marginBottom: "1.5rem", marginTop: "3rem" }}>Gallery</h2>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem" }}>
                                {prog.gallery.map((image) => (
                                    <div key={image} style={{ height: "150px", borderRadius: "8px", overflow: "hidden", border: "1px solid var(--border-color)", backgroundColor: "var(--bg-secondary)", position: "relative" }}>
                                        <Image src={image} alt={`${prog.title} gallery`} fill style={{ objectFit: "cover" }} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div style={{ flex: "1 1 300px" }}>
                            <div style={{ backgroundColor: "var(--bg-secondary)", borderRadius: "12px", padding: "2rem", border: "1px solid var(--border-color)", position: "sticky", top: "100px" }}>
                                <h3 style={{ fontSize: "1.2rem", color: "var(--accent-gold)", marginBottom: "1.5rem" }}>Other Programmes</h3>
                                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                                    {otherProgrammes.map((programme, index) => (
                                        <a
                                            href={`/program/${programme.slug}`}
                                            key={programme.slug}
                                            style={{ display: "flex", gap: "1rem", alignItems: "center", borderBottom: index === otherProgrammes.length - 1 ? "none" : "1px solid var(--border-color)", paddingBottom: index === otherProgrammes.length - 1 ? 0 : "1rem" }}
                                        >
                                            <div style={{ width: "80px", height: "60px", position: "relative", flex: "0 0 80px", borderRadius: "4px", overflow: "hidden" }}>
                                                <Image src={programme.image} fill style={{ objectFit: "cover" }} alt="" />
                                            </div>
                                            <div>
                                                <h4 style={{ fontSize: "1rem", color: "white" }}>{programme.title}</h4>
                                                <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>{programme.category}</span>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                                <a href="/programs" className="btn btn-green" style={{ width: "100%", marginTop: "2rem" }}>View All Programmes</a>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
