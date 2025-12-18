'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import { PetProfile, Breed } from '@/types';

interface BreedStepProps {
  profile: PetProfile;
  updateProfile: (updates: Partial<PetProfile>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function BreedStep({ profile, updateProfile, onNext, onBack }: BreedStepProps) {
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBreeds = async () => {
      if (!profile.species) return;
      
      setIsLoading(true);
      try {
        const response = await fetch(`/api/breeds/${profile.species}`);
        const data = await response.json();
        
        if (Array.isArray(data)) {
          setBreeds(data);
        } else if (data.breeds) {
          setBreeds(data.breeds);
        } else {
          setBreeds(getFallbackBreeds(profile.species));
        }
      } catch (error) {
        console.error('Failed to fetch breeds:', error);
        setBreeds(getFallbackBreeds(profile.species));
      } finally {
        setIsLoading(false);
      }
    };

    fetchBreeds();
  }, [profile.species]);

  const filteredBreeds = useMemo(() => {
    if (!searchQuery) return breeds.slice(0, 50);
    
    const query = searchQuery.toLowerCase();
    return breeds
      .filter((breed) => 
        breed.breedName?.toLowerCase().includes(query) ||
        breed.breedDescription?.toLowerCase().includes(query)
      )
      .slice(0, 50);
  }, [breeds, searchQuery]);

  const handleSelectBreed = (breed: Breed) => {
    updateProfile({ 
      breedCode: breed.breedCode, 
      breedName: breed.breedName 
    });
  };

  const canContinue = profile.breedCode !== '';

  return (
    <div className="flex flex-col py-6 px-4">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl md:text-3xl font-bold text-center mb-2 text-[#1E3A5F]"
      >
        What breed is your {profile.species}?
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-[#1E3A5F]/60 text-center mb-4"
      >
        Search or scroll to find your pet&apos;s breed
      </motion.p>

      {/* Search Input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative mb-4"
      >
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1E3A5F]/40" />
        <input
          type="text"
          placeholder="Search breeds..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-white border-2 border-[#1E3A5F]/20 rounded-xl text-[#1E3A5F] placeholder-[#1E3A5F]/40 focus:outline-none focus:border-[#1E3A5F]/50 focus:ring-2 focus:ring-[#1E3A5F]/10 transition-all"
        />
      </motion.div>

      {/* Breed List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="overflow-y-auto space-y-2 mb-4 max-h-[240px] scrollbar-thin"
      >
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-8 h-8 text-[#1E3A5F] animate-spin" />
          </div>
        ) : filteredBreeds.length === 0 ? (
          <div className="text-center py-6 text-[#1E3A5F]/50">
            No breeds found matching &quot;{searchQuery}&quot;
          </div>
        ) : (
          filteredBreeds.map((breed, index) => (
            <motion.button
              key={breed.breedCode}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.02 }}
              onClick={() => handleSelectBreed(breed)}
              className={`w-full p-3 rounded-xl text-left transition-all duration-200 ${
                profile.breedCode === breed.breedCode
                  ? 'bg-[#1E3A5F] text-white shadow-lg shadow-[#1E3A5F]/20'
                  : 'bg-white border border-[#1E3A5F]/10 hover:bg-[#1E3A5F]/5 hover:border-[#1E3A5F]/30 text-[#1E3A5F]'
              }`}
            >
              <span className="font-medium">{breed.breedName}</span>
            </motion.button>
          ))
        )}
      </motion.div>

      {/* Navigation */}
      <div className="flex gap-3 mt-2">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onBack}
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white border-2 border-[#1E3A5F]/20 text-[#1E3A5F] hover:bg-[#1E3A5F]/5 transition-all font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </motion.button>
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={canContinue ? { scale: 1.02 } : {}}
          whileTap={canContinue ? { scale: 0.98 } : {}}
          onClick={onNext}
          disabled={!canContinue}
          className={`flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all ${
            canContinue
              ? 'bg-[#1E3A5F] text-white hover:bg-[#2A4A73] shadow-lg shadow-[#1E3A5F]/25'
              : 'bg-[#1E3A5F]/20 text-[#1E3A5F]/40 cursor-not-allowed'
          }`}
        >
          Continue
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
}

function getFallbackBreeds(species: string): Breed[] {
  if (species === 'dog') {
    return [
      { breedCode: 'LAB', breedName: 'Labrador Retriever' },
      { breedCode: 'GSD', breedName: 'German Shepherd' },
      { breedCode: 'GR', breedName: 'Golden Retriever' },
      { breedCode: 'BUL', breedName: 'Bulldog' },
      { breedCode: 'BEA', breedName: 'Beagle' },
      { breedCode: 'POO', breedName: 'Poodle' },
      { breedCode: 'ROT', breedName: 'Rottweiler' },
      { breedCode: 'YOR', breedName: 'Yorkshire Terrier' },
      { breedCode: 'BOX', breedName: 'Boxer' },
      { breedCode: 'DAC', breedName: 'Dachshund' },
      { breedCode: 'CAV', breedName: 'Cavalier King Charles Spaniel' },
      { breedCode: 'FRB', breedName: 'French Bulldog' },
      { breedCode: 'SHI', breedName: 'Shih Tzu' },
      { breedCode: 'BOR', breedName: 'Border Collie' },
      { breedCode: 'AUS', breedName: 'Australian Shepherd' },
      { breedCode: 'MIX', breedName: 'Mixed Breed' },
    ];
  } else {
    return [
      { breedCode: 'PER', breedName: 'Persian' },
      { breedCode: 'MAI', breedName: 'Maine Coon' },
      { breedCode: 'RAG', breedName: 'Ragdoll' },
      { breedCode: 'BRI', breedName: 'British Shorthair' },
      { breedCode: 'SIA', breedName: 'Siamese' },
      { breedCode: 'ABY', breedName: 'Abyssinian' },
      { breedCode: 'BEN', breedName: 'Bengal' },
      { breedCode: 'BIR', breedName: 'Birman' },
      { breedCode: 'AME', breedName: 'American Shorthair' },
      { breedCode: 'ORI', breedName: 'Oriental' },
      { breedCode: 'SPH', breedName: 'Sphynx' },
      { breedCode: 'DEV', breedName: 'Devon Rex' },
      { breedCode: 'SCO', breedName: 'Scottish Fold' },
      { breedCode: 'NOR', breedName: 'Norwegian Forest Cat' },
      { breedCode: 'RUS', breedName: 'Russian Blue' },
      { breedCode: 'MIX', breedName: 'Domestic/Mixed Breed' },
    ];
  }
}
