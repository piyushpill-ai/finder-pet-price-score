import { NextRequest, NextResponse } from 'next/server';

const PETSURE_API_BASE = 'https://api-cspmw-sit.petsure.com.au';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const partnerNumber = searchParams.get('partnerNumber') || 'PETB';
    const postcode = searchParams.get('postcode');
    const species = searchParams.get('species');

    if (!postcode || !species) {
      return NextResponse.json(
        { error: 'Missing postcode or species' },
        { status: 400 }
      );
    }

    const response = await fetch(
      `${PETSURE_API_BASE}/api/Quote/products/${partnerNumber}/${postcode}/${species}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`PetSure API error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

