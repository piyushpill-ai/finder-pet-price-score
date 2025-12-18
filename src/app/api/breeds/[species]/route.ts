import { NextRequest, NextResponse } from 'next/server';

const PETSURE_API_BASE = 'https://api-cspmw-sit.petsure.com.au';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ species: string }> }
) {
  try {
    const { species } = await params;
    
    const response = await fetch(`${PETSURE_API_BASE}/api/Quote/breeds/${species}`, {
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
    console.error('Failed to fetch breeds:', error);
    return NextResponse.json(
      { error: 'Failed to fetch breeds' },
      { status: 500 }
    );
  }
}

