import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'db_store.json');

async function readDB() {
    const data = await fs.readFile(DB_PATH, 'utf-8');
    return JSON.parse(data);
}

async function writeDB(data: any) {
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
}

// GET method to fetch favorites
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const email = searchParams.get('email');

        if (!email) {
            return NextResponse.json({ error: 'Missing email parameter' }, { status: 400 });
        }

        const db = await readDB();
        
        // Find existing favorites record
        const record = db.favorites.find((f: any) => f.userEmail.toLowerCase() === email.toLowerCase());
        const list = record ? record.slugs : [];

        return NextResponse.json({ success: true, favorites: list });
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}

// POST method to save/update favorites
export async function POST(request: Request) {
    try {
        const { email, favorites } = await request.json();

        if (!email || !Array.isArray(favorites)) {
            return NextResponse.json({ error: 'Missing email or favorites array' }, { status: 400 });
        }

        const db = await readDB();
        
        // Update or insert favorites record
        const index = db.favorites.findIndex((f: any) => f.userEmail.toLowerCase() === email.toLowerCase());
        
        if (index > -1) {
            db.favorites[index].slugs = favorites;
        } else {
            db.favorites.push({ userEmail: email, slugs: favorites });
        }

        await writeDB(db);
        return NextResponse.json({ success: true, favorites });
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}

export async function OPTIONS() {
    return new NextResponse(null, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
    });
}
