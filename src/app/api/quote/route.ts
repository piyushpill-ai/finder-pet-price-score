import { NextRequest, NextResponse } from 'next/server';

const PETSURE_API_BASE = 'https://api-cspmw-sit.petsure.com.au';

export interface QuoteRequest {
  partnerNumber?: string;
  species: string;
  breedCode: string;
  petName: string;
  petGender: string;
  dateOfBirth: string;
  isDesexed: boolean;
  postcode: string;
  state?: string;
}

export interface PriceScore {
  score: number; // 1-5 scale
  band: string; // $ to $$$$$
  category: string; // "Budget", "Moderate", "Premium", "Luxury"
  monthlyEstimate: string; // range like "$30-50"
  factors: {
    breedRisk: string;
    ageImpact: string;
    locationFactor: string;
  };
}

function calculatePriceScore(quoteResponse: any): PriceScore {
  // Extract premium from the quote response
  // The actual structure depends on the API response
  let basePremium = 0;
  
  if (quoteResponse?.products && quoteResponse.products.length > 0) {
    // Get the average premium from available products
    const premiums = quoteResponse.products
      .map((p: any) => p.monthlyPremium || p.premium || 0)
      .filter((p: number) => p > 0);
    
    if (premiums.length > 0) {
      basePremium = premiums.reduce((a: number, b: number) => a + b, 0) / premiums.length;
    }
  } else if (quoteResponse?.premium) {
    basePremium = quoteResponse.premium;
  } else if (quoteResponse?.monthlyPremium) {
    basePremium = quoteResponse.monthlyPremium;
  }

  // If we can't get real premium, calculate indicative score based on inputs
  // This is a fallback using typical Australian pet insurance ranges
  if (basePremium === 0) {
    basePremium = 50; // Default middle-ground estimate
  }

  // Convert to 1-5 score based on Australian pet insurance typical ranges
  // Budget: $20-40/month, Mid: $40-70, High: $70-100, Premium: $100-150, Luxury: $150+
  let score: number;
  let band: string;
  let category: string;
  let monthlyEstimate: string;

  if (basePremium <= 40) {
    score = 1;
    band = '$';
    category = 'Budget-Friendly';
    monthlyEstimate = '$20-40';
  } else if (basePremium <= 70) {
    score = 2;
    band = '$$';
    category = 'Moderate';
    monthlyEstimate = '$40-70';
  } else if (basePremium <= 100) {
    score = 3;
    band = '$$$';
    category = 'Standard';
    monthlyEstimate = '$70-100';
  } else if (basePremium <= 150) {
    score = 4;
    band = '$$$$';
    category = 'Premium';
    monthlyEstimate = '$100-150';
  } else {
    score = 5;
    band = '$$$$$';
    category = 'Luxury';
    monthlyEstimate = '$150+';
  }

  return {
    score,
    band,
    category,
    monthlyEstimate,
    factors: {
      breedRisk: quoteResponse?.breedRisk || 'Standard',
      ageImpact: quoteResponse?.ageImpact || 'Normal',
      locationFactor: quoteResponse?.locationFactor || 'Average',
    },
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: QuoteRequest = await request.json();

    // Build the quote request for PetSure API
    const quotePayload = {
      partnerNumber: body.partnerNumber || 'PETB',
      pets: [
        {
          species: body.species,
          breedCode: body.breedCode,
          petName: body.petName || 'Pet',
          petGender: body.petGender,
          dateOfBirth: body.dateOfBirth,
          isDesexed: body.isDesexed,
        },
      ],
      postcode: body.postcode,
      state: body.state || '',
    };

    const response = await fetch(`${PETSURE_API_BASE}/api/Quote/getquote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(quotePayload),
    });

    if (!response.ok) {
      // If the API fails, return a simulated score based on known factors
      console.warn('PetSure API returned error, using fallback calculation');
      
      const fallbackScore = calculateFallbackScore(body);
      return NextResponse.json({
        success: true,
        priceScore: fallbackScore,
        source: 'calculated',
      });
    }

    const quoteData = await response.json();
    const priceScore = calculatePriceScore(quoteData);

    return NextResponse.json({
      success: true,
      priceScore,
      source: 'api',
    });
  } catch (error) {
    console.error('Failed to get quote:', error);
    
    // Return a fallback response so the user still gets something
    return NextResponse.json({
      success: true,
      priceScore: {
        score: 3,
        band: '$$$',
        category: 'Standard',
        monthlyEstimate: '$70-100',
        factors: {
          breedRisk: 'Unknown',
          ageImpact: 'Unknown',
          locationFactor: 'Unknown',
        },
      },
      source: 'fallback',
    });
  }
}

function calculateFallbackScore(input: QuoteRequest): PriceScore {
  let baseScore = 3; // Start at middle

  // Age adjustment
  const birthDate = new Date(input.dateOfBirth);
  const ageYears = (Date.now() - birthDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000);
  
  if (ageYears < 1) baseScore -= 0.5;
  else if (ageYears > 8) baseScore += 1;
  else if (ageYears > 5) baseScore += 0.5;

  // Species adjustment
  if (input.species.toLowerCase() === 'dog') {
    baseScore += 0.5; // Dogs typically cost more
  }

  // Desexed adjustment
  if (input.isDesexed) {
    baseScore -= 0.3;
  }

  // Clamp to 1-5
  baseScore = Math.max(1, Math.min(5, Math.round(baseScore)));

  const bands: Record<number, { band: string; category: string; estimate: string }> = {
    1: { band: '$', category: 'Budget-Friendly', estimate: '$20-40' },
    2: { band: '$$', category: 'Moderate', estimate: '$40-70' },
    3: { band: '$$$', category: 'Standard', estimate: '$70-100' },
    4: { band: '$$$$', category: 'Premium', estimate: '$100-150' },
    5: { band: '$$$$$', category: 'Luxury', estimate: '$150+' },
  };

  const bandInfo = bands[baseScore];

  return {
    score: baseScore,
    band: bandInfo.band,
    category: bandInfo.category,
    monthlyEstimate: bandInfo.estimate,
    factors: {
      breedRisk: 'Calculated',
      ageImpact: ageYears > 5 ? 'Higher' : 'Lower',
      locationFactor: 'Average',
    },
  };
}

