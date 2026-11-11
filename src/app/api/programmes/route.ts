import { NextResponse } from 'next/server';
import { getAllProgrammes } from '@/lib/programmes';

export const revalidate = 60;

export async function GET() {
  try {
    const programmes = await getAllProgrammes();
    return NextResponse.json({ success: true, programmes });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to load programmes';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
