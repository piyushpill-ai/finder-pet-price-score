'use client';

import { motion } from 'framer-motion';
import { Dog, Cat } from 'lucide-react';
import { PetProfile } from '@/types';

interface SpeciesStepProps {
  profile: PetProfile;
  updateProfile: (updates: Partial<PetProfile>) => void;
  onNext: () => void;
}

export default function SpeciesStep({ profile, updateProfile, onNext }: SpeciesStepProps) {
  const handleSelect = (species: 'dog' | 'cat') => {
    updateProfile({ species, breedCode: '', breedName: '' });
    onNext();
  };

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl md:text-3xl font-bold text-center mb-2 text-[#1E3A5F]"
      >
        What type of pet do you have?
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-[#1E3A5F]/60 text-center mb-8 text-base"
      >
        Select your furry friend&apos;s species to get started
      </motion.p>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-lg px-4">
        <motion.button
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.03, y: -4 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleSelect('dog')}
          className={`flex-1 p-6 rounded-2xl border-2 transition-all duration-300 group ${
            profile.species === 'dog'
              ? 'border-[#1E3A5F] bg-[#1E3A5F] shadow-lg shadow-[#1E3A5F]/20'
              : 'border-[#1E3A5F]/20 bg-white hover:border-[#1E3A5F]/50 hover:bg-[#1E3A5F]/5'
          }`}
        >
          <div className="flex flex-col items-center gap-3">
            <div className={`p-4 rounded-2xl transition-all duration-300 ${
              profile.species === 'dog'
                ? 'bg-white/20'
                : 'bg-[#1E3A5F]/10 group-hover:bg-[#1E3A5F]/20'
            }`}>
              <Dog className={`w-12 h-12 transition-colors duration-300 ${
                profile.species === 'dog' ? 'text-white' : 'text-[#1E3A5F] group-hover:text-[#1E3A5F]'
              }`} />
            </div>
            <span className={`text-xl font-semibold transition-colors duration-300 ${
              profile.species === 'dog' ? 'text-white' : 'text-[#1E3A5F] group-hover:text-[#1E3A5F]'
            }`}>
              Dog
            </span>
          </div>
        </motion.button>

        <motion.button
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.03, y: -4 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleSelect('cat')}
          className={`flex-1 p-6 rounded-2xl border-2 transition-all duration-300 group ${
            profile.species === 'cat'
              ? 'border-[#1E3A5F] bg-[#1E3A5F] shadow-lg shadow-[#1E3A5F]/20'
              : 'border-[#1E3A5F]/20 bg-white hover:border-[#1E3A5F]/50 hover:bg-[#1E3A5F]/5'
          }`}
        >
          <div className="flex flex-col items-center gap-3">
            <div className={`p-4 rounded-2xl transition-all duration-300 ${
              profile.species === 'cat'
                ? 'bg-white/20'
                : 'bg-[#1E3A5F]/10 group-hover:bg-[#1E3A5F]/20'
            }`}>
              <Cat className={`w-12 h-12 transition-colors duration-300 ${
                profile.species === 'cat' ? 'text-white' : 'text-[#1E3A5F] group-hover:text-[#1E3A5F]'
              }`} />
            </div>
            <span className={`text-xl font-semibold transition-colors duration-300 ${
              profile.species === 'cat' ? 'text-white' : 'text-[#1E3A5F] group-hover:text-[#1E3A5F]'
            }`}>
              Cat
            </span>
          </div>
        </motion.button>
      </div>
    </div>
  );
}
