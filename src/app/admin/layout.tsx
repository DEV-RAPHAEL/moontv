"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import "./admin.css";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const menuItems = [
        { name: "Dashboard", href: "/admin", icon: "📊" },
        { name: "Programmes", href: "/admin/programmes", icon: "📺" },
        { name: "EPG Schedule", href: "/admin/schedule", icon: "📅" }
    ];

    return (
        <div className="adminContainer">
            {/* Sidebar Navigation */}
            <aside className="adminSidebar">
                <div className="sidebarHeader">
                    <div style={{ width: "32px", height: "32px", borderRadius: "50%", backgroundColor: "var(--accent-gold)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--bg-primary)", fontWeight: "bold" }}>
                        🌙
                    </div>
                    <span className="sidebarLogoText">MOON TV ADMIN</span>
                </div>
                <nav className="sidebarMenu">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`sidebarMenuItem ${isActive ? "sidebarMenuItemActive" : ""}`}
                            >
                                <span style={{ fontSize: "1.1rem" }}>{item.icon}</span>
                                <span>{item.name}</span>
                            </Link>
                        );
                    })}
                    <Link
                        href="/"
                        className="sidebarMenuItem"
                        style={{ marginTop: "auto", borderTop: "1px solid var(--border-color)", paddingTop: "1.5rem", borderRadius: 0 }}
                    >
                        <span>🏠</span>
                        <span>Back to Website</span>
                    </Link>
                </nav>
                <div className="sidebarFooter">
                    <div className="adminUserBadge">
                        <div className="userAvatar">A</div>
                        <div className="userInfo">
                            <span className="userName">Admin User</span>
                            <span className="userRole">Super Admin</span>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Subpage Content */}
            <main className="adminContent">
                {children}
            </main>
        </div>
    );
}
