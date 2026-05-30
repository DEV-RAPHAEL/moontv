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

export async function POST(request: Request) {
    try {
        const { username, email, password } = await request.json();

        if (!username || !email || !password) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const db = await readDB();
        
        // Validate uniqueness
        const exists = db.users.find((u: any) => u.email.toLowerCase() === email.toLowerCase());
        if (exists) {
            return NextResponse.json({ error: 'User already exists' }, { status: 400 });
        }

        // Add user record
        const newUser = { id: Date.now().toString(), username, email, password };
        db.users.push(newUser);
        await writeDB(db);

        return NextResponse.json({ success: true, user: { username, email } });
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
