import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NoContent from "@/components/NoContent";
import { getStreamUrl } from "@/lib/stream";
import "../home.css";

export default function Watch() {
    const streamUrl = getStreamUrl();

    return (
        <>
            <Header isInner={true} />
            <main style={{ paddingTop: "60px", paddingBottom: "100px", minHeight: "100vh" }}>
                <div className="container">
                    <span className="section-subtitle">MOON TV LIVE</span>
                    <h1 className="section-title">
                        Watch <span>Live</span>
                    </h1>

                    {streamUrl ? (
                        <div
                            style={{
                                marginTop: "3rem",
                                position: "relative",
                                width: "100%",
                                aspectRatio: "16 / 9",
                                borderRadius: "12px",
                                overflow: "hidden",
                                border: "1px solid var(--border-color)",
                                backgroundColor: "#050b07",
                            }}
                        >
                            <iframe
                                src={streamUrl}
                                title="Moon TV live stream"
                                allow="autoplay; fullscreen; picture-in-picture"
                                allowFullScreen
                                referrerPolicy="no-referrer-when-downgrade"
                                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
                            />
                        </div>
                    ) : (
                        <div style={{ marginTop: "3rem" }}>
                            <NoContent message="Live stream is not configured yet" />
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
}
