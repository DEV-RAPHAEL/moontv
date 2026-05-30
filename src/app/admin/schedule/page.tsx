"use client";

import { useState } from "react";
import { programmes } from "@/lib/programmes";

export default function BroadcastSchedule() {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const timeSlots = ["08:00 - 10:00", "10:00 - 12:00", "12:00 - 14:00", "14:00 - 16:00", "16:00 - 18:00", "18:00 - 20:00", "20:00 - 22:00", "22:00 - 00:00"];

    // Mock initial schedule assignments
    const [schedule, setSchedule] = useState<{ [key: string]: string }>({
        "Monday-18:00 - 20:00": "Down Town",
        "Monday-20:00 - 22:00": "Tomorrow Is Now",
        "Tuesday-18:00 - 20:00": "Kilanse",
        "Wednesday-18:00 - 20:00": "Aviation Insights",
        "Thursday-18:00 - 20:00": "Wives Roundtable",
        "Friday-20:00 - 22:00": "In My Closet",
        "Saturday-20:00 - 22:00": "The Triple M Show",
        "Sunday-16:00 - 18:00": "Family Heritage",
        "Sunday-20:00 - 22:00": "My Tomorrow Drama Series"
    });

    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
    const [selectedShow, setSelectedShow] = useState(programmes[0].title);

    const handleAssignShow = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedSlot) return;

        setSchedule(prev => ({
            ...prev,
            [selectedSlot]: selectedShow
        }));
        setSelectedSlot(null);
    };

    const handleRemoveSlot = (slotKey: string) => {
        const updated = { ...schedule };
        delete updated[slotKey];
        setSchedule(updated);
    };

    return (
        <div>
            {/* Header */}
            <header className="adminHeader">
                <div>
                    <h1 className="adminPageTitle">EPG Schedule Manager</h1>
                    <p className="adminPageSubtitle">Manage time-slots and programming schedules across the broadcast week</p>
                </div>
            </header>

            {/* Schedule Weekly Board */}
            <div className="dashboardModule" style={{ padding: "2rem", overflowX: "auto" }}>
                <div style={{ minWidth: "900px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "150px repeat(7, 1fr)", gap: "0.75rem", marginBottom: "1rem" }}>
                        <div style={{ fontWeight: "700", fontSize: "0.85rem", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.5px" }}>Time Slots</div>
                        {days.map(day => (
                            <div key={day} style={{ fontWeight: "700", fontSize: "0.85rem", color: "white", textTransform: "uppercase", letterSpacing: "0.5px", textAlign: "center", borderBottom: "2px solid var(--border-color)", pb: "0.5rem" }}>
                                {day.substring(0, 3)}
                            </div>
                        ))}
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                        {timeSlots.map(time => (
                            <div key={time} style={{ display: "grid", gridTemplateColumns: "150px repeat(7, 1fr)", gap: "0.75rem", alignItems: "center" }}>
                                {/* Time Column */}
                                <div style={{ fontSize: "0.85rem", fontWeight: "600", color: "var(--accent-gold)" }}>{time}</div>

                                {/* Days Columns */}
                                {days.map(day => {
                                    const key = `${day}-${time}`;
                                    const assignedShow = schedule[key];

                                    return (
                                        <div
                                            key={day}
                                            style={{
                                                backgroundColor: assignedShow ? "rgba(20, 89, 39, 0.1)" : "rgba(255,255,255,0.01)",
                                                border: assignedShow ? "1px solid var(--button-green)" : "1px solid var(--border-color)",
                                                borderRadius: "6px",
                                                height: "65px",
                                                padding: "0.5rem",
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "space-between",
                                                transition: "all 0.3s ease",
                                                cursor: "pointer",
                                                position: "relative"
                                            }}
                                            onClick={() => {
                                                if (!assignedShow) {
                                                    setSelectedShow(programmes[0].title);
                                                    setSelectedSlot(key);
                                                }
                                            }}
                                        >
                                            {assignedShow ? (
                                                <>
                                                    <div style={{ fontSize: "0.75rem", fontWeight: "600", color: "white", overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
                                                        {assignedShow}
                                                    </div>
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); handleRemoveSlot(key); }}
                                                        style={{ alignSelf: "flex-end", background: "none", border: "none", color: "#ef4444", fontSize: "0.7rem", fontWeight: "bold", cursor: "pointer", padding: 0 }}
                                                    >
                                                        Remove ×
                                                    </button>
                                                </>
                                            ) : (
                                                <div style={{ fontSize: "0.7rem", color: "var(--text-secondary)", fontStyle: "italic", opacity: 0.3, textAlign: "center", margin: "auto" }}>
                                                    + Slot
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Modal: Assign Slot Show */}
            {selectedSlot && (
                <div className="modalOverlay">
                    <form className="modalContent" style={{ maxWidth: "450px" }} onSubmit={handleAssignShow}>
                        <div className="modalHeader">
                            <h3 className="modalTitle">Assign Show to Slot</h3>
                            <button type="button" className="modalCloseBtn" onClick={() => setSelectedSlot(null)}>×</button>
                        </div>
                        <div className="modalBody">
                            <div style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginBottom: "1rem" }}>
                                Assigning a programme for <strong style={{ color: "white" }}>{selectedSlot.split("-").join(" at ")}</strong>
                            </div>

                            <div className="formGroup">
                                <label className="formLabel">Select Programme</label>
                                <select
                                    className="formInput"
                                    value={selectedShow}
                                    onChange={(e) => setSelectedShow(e.target.value)}
                                    style={{ height: "45px" }}
                                >
                                    {programmes.map(prog => (
                                        <option key={prog.id} value={prog.title}>{prog.title}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="modalFooter">
                            <button type="button" className="btn btn-outline-green" style={{ padding: "0.5rem 1.2rem", fontSize: "0.85rem" }} onClick={() => setSelectedSlot(null)}>Cancel</button>
                            <button type="submit" className="btn btn-green" style={{ padding: "0.5rem 1.2rem", fontSize: "0.85rem" }}>Assign Slot</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
