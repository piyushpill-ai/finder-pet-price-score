'use client';

import { motion } from 'framer-motion';
import { RefreshCw, Dog, Cat, Info, Star } from 'lucide-react';
import { PetProfile, QuoteResponse } from '@/types';
import Image from 'next/image';

interface ResultStepProps {
  profile: PetProfile;
  result: QuoteResponse;
  onReset: () => void;
}

// Pet insurance companies underwritten by PetSure
const insuranceCompanies = [
  { name: 'Stella Pet Insurance', priceModifier: 1 },
  { name: 'Australian Seniors Pet Insurance', priceModifier: 1 },
  { name: 'Australian Unity Pet Insurance', priceModifier: 1 },
  { name: 'Commonwealth Bank Pet Insurance', priceModifier: 1 },
  { name: 'Orivet Pet Insurance', priceModifier: 1 },
  { name: 'Potiki Pet Insurance', priceModifier: 1 },
  { name: 'ahm Pet Insurance', priceModifier: 1 },
  { name: 'Bow Wow Meow Pet Insurance', priceModifier: 1 },
  { name: 'Bupa Pet Insurance', priceModifier: 0.5 }, // Deduct half
  { name: 'Coles Pet Insurance', priceModifier: 1 },
  { name: 'HCF Pet Insurance', priceModifier: 0.5 }, // Deduct half
  { name: 'Kogan Pet Insurance', priceModifier: 1 },
  { name: 'Petinsurance.com.au Pet Insurance', priceModifier: 1 },
  { name: 'Medibank Pet Insurance', priceModifier: 1 },
  { name: 'Petbarn Pet Insurance', priceModifier: 1 },
];

function getScoreColor(score: number): string {
  if (score <= 1.5) return 'bg-emerald-500';
  if (score <= 2.5) return 'bg-green-500';
  if (score <= 3.5) return 'bg-amber-500';
  if (score <= 4.5) return 'bg-orange-500';
  return 'bg-rose-500';
}

function getScoreBand(score: number): string {
  if (score <= 1) return '$';
  if (score <= 2) return '$$';
  if (score <= 3) return '$$$';
  if (score <= 4) return '$$$$';
  return '$$$$$';
}

function getScoreLabel(score: number): string {
  if (score <= 1.5) return 'Budget-Friendly';
  if (score <= 2.5) return 'Affordable';
  if (score <= 3.5) return 'Moderate';
  if (score <= 4.5) return 'Premium';
  return 'Luxury';
}

export default function ResultStep({ profile, result, onReset }: ResultStepProps) {
  const { priceScore } = result;
  const baseScore = priceScore.score;

  // Generate company scores
  const companyScores = insuranceCompanies.map((company) => {
    const adjustedScore = Math.max(1, Math.min(5, baseScore * company.priceModifier));
    const roundedScore = Math.round(adjustedScore * 10) / 10;
    return {
      ...company,
      score: roundedScore,
      band: getScoreBand(roundedScore),
      label: getScoreLabel(roundedScore),
      colorClass: getScoreColor(roundedScore),
    };
  });

  // Sort by score (lowest first = best value)
  const sortedCompanies = [...companyScores].sort((a, b) => a.score - b.score);

  return (
    <div className="flex flex-col py-6 px-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#1E3A5F] rounded-full mb-3"
        >
          {profile.species === 'dog' ? (
            <Dog className="w-5 h-5 text-[#FFD700]" />
          ) : (
            <Cat className="w-5 h-5 text-[#FFD700]" />
          )}
          <span className="text-white font-medium">{profile.petName}&apos;s Price Comparison</span>
        </motion.div>
        <h2 className="text-xl md:text-2xl font-bold text-[#1E3A5F]">
          Compare Pet Insurance Prices
        </h2>
        <p className="text-[#1E3A5F]/60 text-sm mt-1">
          All providers below are underwritten by PetSure
        </p>
      </motion.div>

      {/* Comparison Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="overflow-hidden rounded-2xl border border-[#1E3A5F]/10 bg-white shadow-lg mb-6"
      >
        {/* Table Header */}
        <div className="grid grid-cols-[1fr,80px,100px] md:grid-cols-[1fr,100px,120px] gap-2 p-3 bg-[#1E3A5F] text-white text-sm font-medium">
          <div>Provider</div>
          <div className="text-center">Score</div>
          <div className="text-center">Price Band</div>
        </div>

        {/* Table Body */}
        <div className="max-h-[350px] overflow-y-auto scrollbar-thin">
          {sortedCompanies.map((company, index) => (
            <motion.div
              key={company.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.05 }}
              className={`grid grid-cols-[1fr,80px,100px] md:grid-cols-[1fr,100px,120px] gap-2 p-3 items-center border-b border-[#1E3A5F]/5 hover:bg-[#1E3A5F]/5 transition-colors ${
                index === 0 ? 'bg-emerald-50' : ''
              }`}
            >
              {/* Company Name */}
              <div className="flex items-center gap-2">
                {index === 0 && (
                  <Star className="w-4 h-4 text-[#FFD700] fill-[#FFD700] flex-shrink-0" />
                )}
                <span className={`text-sm ${index === 0 ? 'font-semibold text-[#1E3A5F]' : 'text-[#1E3A5F]/80'}`}>
                  {company.name}
                </span>
              </div>

              {/* Score */}
              <div className="flex justify-center">
                <div className={`w-10 h-10 rounded-full ${company.colorClass} flex items-center justify-center`}>
                  <span className="text-white font-bold text-sm">{company.score}</span>
                </div>
              </div>

              {/* Price Band */}
              <div className="text-center">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                  company.score <= 2.5 
                    ? 'bg-emerald-100 text-emerald-700' 
                    : company.score <= 3.5 
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-rose-100 text-rose-700'
                }`}>
                  {company.band}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Disclaimer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="mb-6 p-3 bg-[#1E3A5F]/5 rounded-xl"
      >
        <div className="flex gap-2">
          <Info className="w-4 h-4 text-[#1E3A5F]/60 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-[#1E3A5F]/60 leading-relaxed">
            This is an <strong className="text-[#1E3A5F]">indicative price score</strong> based on typical 
            Australian pet insurance rates. Actual premiums may vary. Lower scores indicate better value.
            We recommend getting quotes from multiple insurers for accurate pricing.
          </p>
        </div>
      </motion.div>

      {/* Reset Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onReset}
        className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#1E3A5F] text-white font-semibold hover:bg-[#2A4A73] shadow-lg shadow-[#1E3A5F]/25 transition-all mx-auto"
      >
        <RefreshCw className="w-5 h-5" />
        Check Another Pet
      </motion.button>
    </div>
  );
}
