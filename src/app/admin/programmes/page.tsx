"use client";

import { useState, useEffect } from "react";
import { programmes as defaultProgrammes, Programme } from "@/lib/programmes";

export default function ManageProgrammes() {
    const [programmes, setProgrammes] = useState<Programme[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("ALL");

    // Modal Control States
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingProgramme, setEditingProgramme] = useState<Programme | null>(null);

    // Form Field States
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("DRAMA SERIES");
    const [synopsis, setSynopsis] = useState("");
    const [notableCast, setNotableCast] = useState("");
    const [image, setImage] = useState("");

    // Load initial programmes
    useEffect(() => {
        const stored = localStorage.getItem("moontv_programmes");
        if (stored) {
            try {
                setProgrammes(JSON.parse(stored));
            } catch (e) {
                setProgrammes(defaultProgrammes);
            }
        } else {
            setProgrammes(defaultProgrammes);
            localStorage.setItem("moontv_programmes", JSON.stringify(defaultProgrammes));
        }
    }, []);

    // Save programmes to localStorage
    const saveToLocalStorage = (updatedList: Programme[]) => {
        setProgrammes(updatedList);
        localStorage.setItem("moontv_programmes", JSON.stringify(updatedList));
    };

    // Add Programme Action
    const handleAddProgramme = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !synopsis.trim()) return;

        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

        const newProg: Programme = {
            id: programmes.length > 0 ? Math.max(...programmes.map(p => p.id)) + 1 : 1,
            slug,
            title,
            category,
            image: image || "/Moon TV Program Details - Batch 1/Down Town/Down Town Images/Down Town - Image 1.png", // Default fall back
            gallery: [],
            synopsis,
            notableCast: notableCast ? notableCast.split(",").map(c => c.trim()).filter(Boolean) : []
        };

        const updated = [...programmes, newProg];
        saveToLocalStorage(updated);
        resetForm();
        setIsAddModalOpen(false);
    };

    // Edit Programme Action (Open modal)
    const openEditModal = (prog: Programme) => {
        setEditingProgramme(prog);
        setTitle(prog.title);
        setCategory(prog.category);
        setSynopsis(prog.synopsis);
        setNotableCast(prog.notableCast.join(", "));
        setImage(prog.image);
        setIsEditModalOpen(true);
    };

    // Save Edited Programme
    const handleEditProgramme = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingProgramme || !title.trim() || !synopsis.trim()) return;

        const updated = programmes.map(p => {
            if (p.id === editingProgramme.id) {
                return {
                    ...p,
                    title,
                    category,
                    synopsis,
                    image,
                    notableCast: notableCast ? notableCast.split(",").map(c => c.trim()).filter(Boolean) : []
                };
            }
            return p;
        });

        saveToLocalStorage(updated);
        resetForm();
        setIsEditModalOpen(false);
    };

    // Delete Programme
    const handleDeleteProgramme = (id: number) => {
        if (!confirm("Are you sure you want to delete this programme? This cannot be undone.")) return;
        const updated = programmes.filter(p => p.id !== id);
        saveToLocalStorage(updated);
    };

    const resetForm = () => {
        setTitle("");
        setCategory("DRAMA SERIES");
        setSynopsis("");
        setNotableCast("");
        setImage("");
        setEditingProgramme(null);
    };

    // Filter and Search Logic
    const categories = ["ALL", ...Array.from(new Set(defaultProgrammes.map(p => p.category)))];
    
    const filteredProgrammes = programmes.filter(p => {
        const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              p.synopsis.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === "ALL" || p.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    return (
        <div>
            {/* Page Header */}
            <header className="adminHeader">
                <div>
                    <h1 className="adminPageTitle">Manage Programmes</h1>
                    <p className="adminPageSubtitle">Add, edit, or remove shows from the network library</p>
                </div>
                <div className="adminHeaderActions">
                    <button className="btn btn-green" onClick={() => { resetForm(); setIsAddModalOpen(true); }}>
                        ➕ Add New Show
                    </button>
                </div>
            </header>

            {/* Filter and Search Bar */}
            <div className="dashboardModule" style={{ marginBottom: "2rem", padding: "1.5rem" }}>
                <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", alignItems: "center" }}>
                    <div style={{ flex: 1, minWidth: "250px", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                        <label className="formLabel">Search Shows</label>
                        <input
                            type="text"
                            placeholder="Type keyword..."
                            className="formInput"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div style={{ width: "220px", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                        <label className="formLabel">Filter Category</label>
                        <select
                            className="formInput"
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            style={{ height: "45px" }}
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Programmes Table */}
            <div className="dashboardModule" style={{ padding: "1.5rem" }}>
                <div className="dataTableWrapper">
                    <table className="dataTable">
                        <thead>
                            <tr>
                                <th>Thumbnail</th>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Notable Cast</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProgrammes.length > 0 ? (
                                filteredProgrammes.map(prog => (
                                    <tr key={prog.id}>
                                        <td>
                                            <div className="rowThumbnail">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img src={prog.image} alt={prog.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                            </div>
                                        </td>
                                        <td className="rowTitle">{prog.title}</td>
                                        <td>
                                            <span className="rowCategoryBadge">{prog.category}</span>
                                        </td>
                                        <td style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}>
                                            {prog.notableCast.length > 0 ? prog.notableCast.join(", ") : <span style={{ fontStyle: "italic", opacity: 0.5 }}>None listed</span>}
                                        </td>
                                        <td>
                                            <div className="rowActions">
                                                <button
                                                    className="actionBtn actionBtnEdit"
                                                    title="Edit Show"
                                                    onClick={() => openEditModal(prog)}
                                                >
                                                    ✏️ Edit
                                                </button>
                                                <button
                                                    className="actionBtn actionBtnDelete"
                                                    title="Delete Show"
                                                    onClick={() => handleDeleteProgramme(prog.id)}
                                                >
                                                    🗑️ Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} style={{ textAlign: "center", padding: "3rem", color: "var(--text-secondary)", fontStyle: "italic" }}>
                                        No programmes found matching search parameters.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal: Add Show */}
            {isAddModalOpen && (
                <div className="modalOverlay">
                    <form className="modalContent" onSubmit={handleAddProgramme}>
                        <div className="modalHeader">
                            <h3 className="modalTitle">Create New Show</h3>
                            <button type="button" className="modalCloseBtn" onClick={() => setIsAddModalOpen(false)}>×</button>
                        </div>
                        <div className="modalBody">
                            <div className="formGroup">
                                <label className="formLabel">Show Title</label>
                                <input type="text" className="formInput" placeholder="e.g. Down Town" value={title} onChange={(e) => setTitle(e.target.value)} required />
                            </div>

                            <div className="formGroup">
                                <label className="formLabel">Category</label>
                                <select className="formInput" value={category} onChange={(e) => setCategory(e.target.value)}>
                                    {categories.filter(c => c !== "ALL").map(c => (
                                        <option key={c} value={c}>{c}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="formGroup">
                                <label className="formLabel">Synopsis</label>
                                <textarea className="formTextarea" placeholder="Enter synopsis detail..." value={synopsis} onChange={(e) => setSynopsis(e.target.value)} required></textarea>
                            </div>

                            <div className="formGroup">
                                <label className="formLabel">Notable Cast (Comma separated)</label>
                                <input type="text" className="formInput" placeholder="e.g. Sir Brainard, Ma Brainard" value={notableCast} onChange={(e) => setNotableCast(e.target.value)} />
                            </div>

                            <div className="formGroup">
                                <label className="formLabel">Image URL / Path</label>
                                <input type="text" className="formInput" placeholder="e.g. /Moon TV Program Details - Batch 1/Down Town/Down Town Images/Down Town - Image 1.png" value={image} onChange={(e) => setImage(e.target.value)} />
                            </div>
                        </div>
                        <div className="modalFooter">
                            <button type="button" className="btn btn-outline-green" style={{ padding: "0.5rem 1.2rem", fontSize: "0.85rem" }} onClick={() => setIsAddModalOpen(false)}>Cancel</button>
                            <button type="submit" className="btn btn-green" style={{ padding: "0.5rem 1.2rem", fontSize: "0.85rem" }}>Create Show</button>
                        </div>
                    </form>
                </div>
            )}

            {/* Modal: Edit Show */}
            {isEditModalOpen && (
                <div className="modalOverlay">
                    <form className="modalContent" onSubmit={handleEditProgramme}>
                        <div className="modalHeader">
                            <h3 className="modalTitle">Edit Programme Details</h3>
                            <button type="button" className="modalCloseBtn" onClick={() => setIsEditModalOpen(false)}>×</button>
                        </div>
                        <div className="modalBody">
                            <div className="formGroup">
                                <label className="formLabel">Show Title</label>
                                <input type="text" className="formInput" value={title} onChange={(e) => setTitle(e.target.value)} required />
                            </div>

                            <div className="formGroup">
                                <label className="formLabel">Category</label>
                                <select className="formInput" value={category} onChange={(e) => setCategory(e.target.value)}>
                                    {categories.filter(c => c !== "ALL").map(c => (
                                        <option key={c} value={c}>{c}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="formGroup">
                                <label className="formLabel">Synopsis</label>
                                <textarea className="formTextarea" value={synopsis} onChange={(e) => setSynopsis(e.target.value)} required></textarea>
                            </div>

                            <div className="formGroup">
                                <label className="formLabel">Notable Cast (Comma separated)</label>
                                <input type="text" className="formInput" value={notableCast} onChange={(e) => setNotableCast(e.target.value)} />
                            </div>

                            <div className="formGroup">
                                <label className="formLabel">Image URL / Path</label>
                                <input type="text" className="formInput" value={image} onChange={(e) => setImage(e.target.value)} />
                            </div>
                        </div>
                        <div className="modalFooter">
                            <button type="button" className="btn btn-outline-green" style={{ padding: "0.5rem 1.2rem", fontSize: "0.85rem" }} onClick={() => setIsEditModalOpen(false)}>Cancel</button>
                            <button type="submit" className="btn btn-green" style={{ padding: "0.5rem 1.2rem", fontSize: "0.85rem" }}>Save Changes</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
