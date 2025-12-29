import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch('https://pointercrate.com/api/v1/demons/?limit=50', {
      headers: { 
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0' 
      },
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}