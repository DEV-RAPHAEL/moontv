"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { programmes } from "@/lib/programmes";

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        totalShows: programmes.length,
        weeklyAirings: 28,
        estReach: "4.2M",
        pendingAds: 5
    });

    const [nowPlaying, setNowPlaying] = useState(programmes[0]);
    const [currentTime, setCurrentTime] = useState("");

    useEffect(() => {
        // Load custom programs if present in localStorage
        const stored = localStorage.getItem("moontv_programmes");
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                setStats(prev => ({ ...prev, totalShows: parsed.length }));
                setNowPlaying(parsed[0]);
            } catch (e) {
                console.error(e);
            }
        }

        // Live clock simulation
        const updateClock = () => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString("en-US", { hour12: false }));
        };
        updateClock();
        const interval = setInterval(updateClock, 1000);
        return () => clearInterval(interval);
    }, []);

    // SVG Line Chart coordinates for Analytics
    const chartPoints = "10,120 80,90 150,110 220,50 290,65 360,35 430,45 500,15";

    return (
        <div>
            {/* Header */}
            <header className="adminHeader">
                <div>
                    <h1 className="adminPageTitle">Analytics Dashboard</h1>
                    <p className="adminPageSubtitle">Real-time broadcast metrics and content summary</p>
                </div>
                <div className="adminHeaderActions">
                    <span style={{ fontSize: "1.2rem", color: "var(--accent-gold)", fontWeight: "600", border: "1px solid var(--border-color)", padding: "0.5rem 1rem", borderRadius: "6px", backgroundColor: "rgba(255,255,255,0.01)" }}>
                        🕒 Live: {currentTime || "00:00:00"}
                    </span>
                </div>
            </header>

            {/* Metrics Row */}
            <div className="dashboardGrid">
                <div className="statCard">
                    <div className="statHeader">
                        <span className="statTitle">Total Programmes</span>
                        <span className="statIcon">📺</span>
                    </div>
                    <span className="statValue">{stats.totalShows}</span>
                    <div className="statFooter">
                        <span className="statTrendingUp">↑ 12%</span>
                        <span>versus last month</span>
                    </div>
                </div>

                <div className="statCard">
                    <div className="statHeader">
                        <span className="statTitle">Weekly Airings</span>
                        <span className="statIcon">📅</span>
                    </div>
                    <span className="statValue">{stats.weeklyAirings}</span>
                    <div className="statFooter">
                        <span className="statTrendingUp">↑ 4</span>
                        <span>new time slots scheduled</span>
                    </div>
                </div>

                <div className="statCard">
                    <div className="statHeader">
                        <span className="statTitle">Est. Weekly Reach</span>
                        <span className="statIcon">👥</span>
                    </div>
                    <span className="statValue">{stats.estReach}</span>
                    <div className="statFooter">
                        <span className="statTrendingUp">↑ 8.3%</span>
                        <span>organic national growth</span>
                    </div>
                </div>

                <div className="statCard">
                    <div className="statHeader">
                        <span className="statTitle">Pending Ad Deals</span>
                        <span className="statIcon">💰</span>
                    </div>
                    <span className="statValue">{stats.pendingAds}</span>
                    <div className="statFooter">
                        <span style={{ color: "var(--accent-gold)", fontWeight: "bold" }}>Action Required</span>
                        <span>rate cards sent</span>
                    </div>
                </div>
            </div>

            {/* Dashboard Sections (Main/Sidebar layout) */}
            <div className="dashboardSections">
                {/* Analytics SVG Chart */}
                <div className="dashboardModule">
                    <div className="moduleHeader">
                        <h3 className="moduleTitle">Broadcast Reach Growth</h3>
                        <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>Last 7 Days</span>
                    </div>
                    <div style={{ position: "relative", width: "100%", height: "200px", marginTop: "1rem" }}>
                        <svg viewBox="0 0 520 140" style={{ width: "100%", height: "100%" }}>
                            <defs>
                                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="var(--accent-gold)" stopOpacity="0.4" />
                                    <stop offset="100%" stopColor="var(--accent-gold)" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                            {/* Area fill */}
                            <path
                                d={`M 10,140 L ${chartPoints} L 500,140 Z`}
                                fill="url(#chartGradient)"
                            />
                            {/* Grid Lines */}
                            <line x1="10" y1="15" x2="500" y2="15" stroke="rgba(255,255,255,0.04)" strokeDasharray="3" />
                            <line x1="10" y1="65" x2="500" y2="65" stroke="rgba(255,255,255,0.04)" strokeDasharray="3" />
                            <line x1="10" y1="115" x2="500" y2="115" stroke="rgba(255,255,255,0.04)" strokeDasharray="3" />
                            
                            {/* Trend Line */}
                            <polyline
                                fill="none"
                                stroke="var(--accent-gold)"
                                strokeWidth="3"
                                points={chartPoints}
                            />
                            {/* End glow point */}
                            <circle cx="500" cy="15" r="5" fill="white" />
                            <circle cx="500" cy="15" r="10" fill="var(--accent-gold)" fillOpacity="0.3" />
                        </svg>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-secondary)", fontSize: "0.8rem", marginTop: "1rem" }}>
                        <span>Mon</span>
                        <span>Tue</span>
                        <span>Wed</span>
                        <span>Thu</span>
                        <span>Fri</span>
                        <span>Sat</span>
                        <span>Sun</span>
                    </div>
                </div>

                {/* Now Playing Simulation Module */}
                <div className="dashboardModule" style={{ borderLeft: "3px solid var(--accent-gold)" }}>
                    <div className="moduleHeader">
                        <h3 className="moduleTitle">Now Broadcasting</h3>
                        <span className="rowCategoryBadge" style={{ fontSize: "0.7rem" }}>LIVE</span>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                            <div style={{ width: "80px", height: "60px", backgroundColor: "#0c2112", borderRadius: "6px", overflow: "hidden", position: "relative", border: "1px solid var(--border-color)" }}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={nowPlaying?.image} alt={nowPlaying?.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            </div>
                            <div>
                                <h4 style={{ color: "white", fontSize: "1.1rem", fontWeight: "600" }}>{nowPlaying?.title}</h4>
                                <span style={{ fontSize: "0.8rem", color: "var(--accent-gold)" }}>{nowPlaying?.category}</span>
                            </div>
                        </div>

                        <div style={{ backgroundColor: "rgba(255,255,255,0.02)", border: "1px solid var(--border-color)", padding: "1rem", borderRadius: "6px" }}>
                            <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", textTransform: "uppercase", fontWeight: "600", letterSpacing: "0.5px" }}>Live Stream Controller</div>
                            <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.75rem" }}>
                                <button style={{ flex: 1, backgroundColor: "#ef4444", color: "white", padding: "0.4rem", borderRadius: "4px", fontSize: "0.8rem", fontWeight: "bold" }}>⏹ Stop</button>
                                <button style={{ flex: 1, backgroundColor: "var(--button-green)", color: "white", padding: "0.4rem", borderRadius: "4px", fontSize: "0.8rem", fontWeight: "bold" }}>🔄 Restart</button>
                            </div>
                        </div>

                        <div>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "0.5rem" }}>
                                <span>Elapsed (42 min)</span>
                                <span>Total (60 min)</span>
                            </div>
                            <div style={{ width: "100%", height: "6px", backgroundColor: "var(--border-color)", borderRadius: "3px", overflow: "hidden" }}>
                                <div style={{ width: "70%", height: "100%", backgroundColor: "var(--button-green)" }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions Row */}
            <div className="dashboardModule" style={{ marginTop: "2rem" }}>
                <div className="moduleHeader">
                    <h3 className="moduleTitle">Quick Shortcuts</h3>
                </div>
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                    <Link href="/admin/programmes" className="btn btn-green" style={{ padding: "0.6rem 1.2rem", fontSize: "0.85rem" }}>
                        📺 Manage Programmes
                    </Link>
                    <Link href="/admin/schedule" className="btn btn-outline-gold" style={{ padding: "0.6rem 1.2rem", fontSize: "0.85rem" }}>
                        📅 Edit EPG Guide
                    </Link>
                    <Link href="/programs" className="btn btn-outline-green" style={{ padding: "0.6rem 1.2rem", fontSize: "0.85rem" }}>
                        🏠 Open Website
                    </Link>
                </div>
            </div>
        </div>
    );
}
