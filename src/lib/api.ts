export const WP_URL = process.env.NEXT_PUBLIC_WP_URL || 'http://moontv.local';
const API_BASE = `${WP_URL}/wp-json/wp/v2`;

export async function getProgrammes() {
    try {
        // revalidate every 60 seconds or on demand
        const res = await fetch(`${API_BASE}/programme?_embed&per_page=100`, { next: { revalidate: 60 } });
        if (!res.ok) throw new Error('Failed to fetch programmes');
        return await res.json();
    } catch (error) {
        console.error("Error fetching programmes:", error);
        return [];
    }
}

export async function getProgrammeBySlug(slug: string) {
    try {
        const res = await fetch(`${API_BASE}/programme?slug=${slug}&_embed`, { next: { revalidate: 60 } });
        if (!res.ok) throw new Error('Failed to fetch programme');
        const data = await res.json();
        return data.length > 0 ? data[0] : null;
    } catch (error) {
        console.error(`Error fetching programme ${slug}:`, error);
        return null;
    }
}

export async function getSchedules() {
    try {
        const res = await fetch(`${API_BASE}/schedule?_embed&per_page=100`, { next: { revalidate: 60 } });
        if (!res.ok) throw new Error('Failed to fetch schedules');
        return await res.json();
    } catch (error) {
        console.error("Error fetching schedules:", error);
        return [];
    }
}
