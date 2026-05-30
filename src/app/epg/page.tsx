'use client';

import React, { useState, useEffect } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { programmes } from "@/lib/programmes";
import { weeklySchedule, enrichSlotsWithNigeriaTime, getNigeriaDayName } from "@/lib/schedule";
import "../home.css";

type Day = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export default function EPG() {
    const days: Day[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    // Default to current Nigeria day
    const [activeDay, setActiveDay] = useState<Day>('Monday');
    const [nigeriaDay, setNigeriaDay] = useState<Day>('Monday');
    const [nigeriaTime, setNigeriaTime] = useState<string>('');

    useEffect(() => {
        const computeDay = () => {
            const day = getNigeriaDayName() as Day;
            setNigeriaDay(day);
            setActiveDay(day);

            const now = new Date();
            const lagosDate = new Date(now.toLocaleString('en-US', { timeZone: 'Africa/Lagos' }));
            const h = String(lagosDate.getHours()).padStart(2, '0');
            const m = String(lagosDate.getMinutes()).padStart(2, '0');
            setNigeriaTime(`${h}:${m} WAT`);
        };
        computeDay();
        const interval = setInterval(computeDay, 60000);
        return () => clearInterval(interval);
    }, []);

    // Enrich current day's slots with real isNowPlaying based on Nigeria time
    const rawSlots = weeklySchedule[activeDay] || [];
    const currentSlots = activeDay === nigeriaDay
        ? enrichSlotsWithNigeriaTime(rawSlots)
        : rawSlots.map(s => ({ ...s, isNowPlaying: false }));

    const getProgrammeImage = (slug?: string) => {
        if (!slug) return "/hero_bg.jpg";
        const found = programmes.find(p => p.slug === slug);
        return found ? found.image : "/hero_bg.jpg";
    };

    return (
        <>
            <Header isInner={true} />
            <main style={{ paddingTop: "100px", paddingBottom: "100px", minHeight: "100vh", backgroundColor: "var(--bg-primary)" }}>
                <div className="container">
                    <div style={{ marginBottom: "3rem", textAlign: "center" }}>
                        <span className="section-subtitle" style={{ color: "var(--accent-gold)", letterSpacing: "2px" }}>EPG GUIDE</span>
                        <h1 className="section-title">Weekly Broadcast <span>Schedule</span></h1>
                        <p style={{ color: "var(--text-secondary)", maxWidth: "600px", margin: "1rem auto 0", fontSize: "1.05rem" }}>
                            Stay tuned to Moon TV. Filter showtimes dynamically day-by-day and select EPG slots to explore programme cast and synopsis details.
                        </p>
                        {nigeriaTime && (
                            <p style={{ color: "var(--accent-gold)", fontSize: "0.85rem", fontWeight: "bold", marginTop: "0.5rem" }}>
                                🕐 Nigeria Standard Time: {nigeriaTime} — Today is {nigeriaDay}
                            </p>
                        )}
                    </div>

                    {/* Day Selector Navigation Tabs */}
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "0.75rem",
                        marginBottom: "4rem",
                        flexWrap: "wrap"
                    }}>
                        {days.map((day) => (
                            <button
                                key={day}
                                onClick={() => setActiveDay(day)}
                                className={activeDay === day ? "btn btn-green" : "btn btn-outline-gold"}
                                style={{
                                    padding: "0.75rem 1.75rem",
                                    fontSize: "0.9rem",
                                    borderRadius: "30px",
                                    fontWeight: "bold",
                                    transition: "all 0.3s ease",
                                    position: "relative"
                                }}
                            >
                                {day}
                                {day === nigeriaDay && (
                                    <span style={{
                                        position: "absolute",
                                        top: "-6px",
                                        right: "-6px",
                                        width: "10px",
                                        height: "10px",
                                        backgroundColor: "#c82333",
                                        borderRadius: "50%",
                                        border: "2px solid var(--bg-primary)"
                                    }} />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Timeline Slot Grid */}
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1.5rem",
                        maxWidth: "900px",
                        margin: "0 auto"
                    }}>
                        {currentSlots.map((slot, idx) => (
                            <div
                                key={idx}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    backgroundColor: "var(--bg-secondary)",
                                    borderRadius: "16px",
                                    border: slot.isNowPlaying ? "2px solid var(--accent-gold)" : "1px solid var(--border-color)",
                                    padding: "1.5rem 2rem",
                                    gap: "2.5rem",
                                    position: "relative",
                                    boxShadow: slot.isNowPlaying ? "0 8px 30px rgba(216,182,66,0.12)" : "none",
                                    transition: "transform 0.3s ease, border-color 0.3s ease",
                                }}
                            >
                                {/* Time Column */}
                                <div style={{
                                    flex: "0 0 200px",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "0.25rem"
                                }}>
                                    <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontWeight: "bold", letterSpacing: "1px", textTransform: "uppercase" }}>Time Slot (WAT)</span>
                                    <span style={{ fontSize: "1.1rem", fontWeight: "bold", color: slot.isNowPlaying ? "var(--accent-gold)" : "white" }}>
                                        {slot.time}
                                    </span>
                                </div>

                                {/* Channel Card Content */}
                                <div style={{
                                    flex: "1",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "1.5rem"
                                }}>
                                    <div style={{
                                        width: "80px",
                                        height: "60px",
                                        position: "relative",
                                        borderRadius: "6px",
                                        overflow: "hidden",
                                        flexShrink: 0,
                                        border: "1px solid var(--border-color)",
                                        backgroundColor: "#050b07"
                                    }}>
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={getProgrammeImage(slot.slug)} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                    </div>

                                    <div>
                                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
                                            <span style={{ fontSize: "0.7rem", backgroundColor: "rgba(216,182,66,0.08)", color: "var(--accent-gold)", padding: "0.2rem 0.5rem", borderRadius: "4px", fontWeight: "bold" }}>
                                                {slot.category}
                                            </span>
                                            {slot.isNowPlaying && (
                                                <span style={{
                                                    backgroundColor: "#c82333",
                                                    color: "white",
                                                    padding: "0.15rem 0.5rem",
                                                    fontSize: "0.6rem",
                                                    fontWeight: "bold",
                                                    borderRadius: "4px",
                                                    letterSpacing: "0.5px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "4px"
                                                }}>
                                                    <span style={{ width: "6px", height: "6px", backgroundColor: "white", borderRadius: "50%", display: "inline-block" }}></span>
                                                    ON AIR NOW
                                                </span>
                                            )}
                                        </div>
                                        <h3 style={{ fontSize: "1.25rem", fontWeight: "bold", color: "white", marginTop: "6px", margin: "4px 0 0 0" }}>{slot.title}</h3>
                                    </div>
                                </div>

                                {/* Dynamic Show Detail Link Button */}
                                {slot.slug && (
                                    <div style={{ flexShrink: 0 }}>
                                        <Link href={`/program/${slot.slug}`} className="btn btn-outline-green" style={{ padding: "0.5rem 1.25rem", fontSize: "0.8rem", borderRadius: "30px" }}>
                                            View Details
                                        </Link>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
