export interface PetProfile {
  species: 'dog' | 'cat' | '';
  breedCode: string;
  breedName: string;
  petName: string;
  petGender: 'Male' | 'Female' | '';
  dateOfBirth: string;
  isDesexed: boolean;
  postcode: string;
}

export interface Breed {
  breedCode: string;
  breedName: string;
  breedDescription?: string;
}

export interface PriceScore {
  score: number;
  band: string;
  category: string;
  monthlyEstimate: string;
  factors: {
    breedRisk: string;
    ageImpact: string;
    locationFactor: string;
  };
}

export interface QuoteResponse {
  success: boolean;
  priceScore: PriceScore;
  source: 'api' | 'calculated' | 'fallback';
}

export type FormStep = 'species' | 'breed' | 'details' | 'location' | 'result';

