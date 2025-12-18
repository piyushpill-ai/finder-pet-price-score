import { NextResponse } from 'next/server';

const PETSURE_API_BASE = 'https://api-cspmw-sit.petsure.com.au';

export async function GET() {
  try {
    const response = await fetch(`${PETSURE_API_BASE}/api/Quote/postcodes`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`PetSure API error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Failed to fetch postcodes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch postcodes' },
      { status: 500 }
    );
  }
}

