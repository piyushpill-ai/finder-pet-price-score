'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Loader2, Sparkles } from 'lucide-react';
import { PetProfile } from '@/types';

interface LocationStepProps {
  profile: PetProfile;
  updateProfile: (updates: Partial<PetProfile>) => void;
  onSubmit: () => void;
  onBack: () => void;
  isLoading: boolean;
}

export default function LocationStep({ 
  profile, 
  updateProfile, 
  onSubmit, 
  onBack, 
  isLoading 
}: LocationStepProps) {
  const isValidPostcode = /^\d{4}$/.test(profile.postcode);
  const canSubmit = isValidPostcode && !isLoading;

  return (
    <div className="flex flex-col py-6 px-4">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl md:text-3xl font-bold text-center mb-2 text-[#1E3A5F]"
      >
        Where are you located?
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-[#1E3A5F]/60 text-center mb-6"
      >
        Enter your Australian postcode for location-based pricing
      </motion.p>

      <div className="flex flex-col items-center">
        {/* Postcode Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-xs"
        >
          <label className="block text-[#1E3A5F]/80 font-medium mb-2 text-center">
            Postcode
          </label>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1E3A5F]/40" />
            <input
              type="text"
              value={profile.postcode}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '').slice(0, 4);
                updateProfile({ postcode: value });
              }}
              placeholder="e.g. 2000"
              maxLength={4}
              className="w-full pl-12 pr-4 py-3 bg-white border-2 border-[#1E3A5F]/20 rounded-xl text-[#1E3A5F] placeholder-[#1E3A5F]/40 focus:outline-none focus:border-[#1E3A5F]/50 focus:ring-2 focus:ring-[#1E3A5F]/10 transition-all text-center text-xl font-mono tracking-widest"
            />
          </div>
          {profile.postcode.length > 0 && !isValidPostcode && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-sm text-center mt-2"
            >
              Please enter a valid 4-digit Australian postcode
            </motion.p>
          )}
        </motion.div>

        {/* Summary Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 p-4 bg-white/80 rounded-2xl border border-[#1E3A5F]/10 w-full max-w-sm"
        >
          <h3 className="text-[#1E3A5F]/80 font-medium mb-3 text-center text-sm">Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-[#1E3A5F]/50">Species</span>
              <span className="text-[#1E3A5F] capitalize font-medium">{profile.species || '—'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#1E3A5F]/50">Breed</span>
              <span className="text-[#1E3A5F] font-medium">{profile.breedName || '—'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#1E3A5F]/50">Name</span>
              <span className="text-[#1E3A5F] font-medium">{profile.petName || '—'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#1E3A5F]/50">Gender</span>
              <span className="text-[#1E3A5F] font-medium">{profile.petGender || '—'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#1E3A5F]/50">Date of Birth</span>
              <span className="text-[#1E3A5F] font-medium">
                {profile.dateOfBirth 
                  ? new Date(profile.dateOfBirth).toLocaleDateString('en-AU', { 
                      day: 'numeric', 
                      month: 'short', 
                      year: 'numeric' 
                    }) 
                  : '—'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#1E3A5F]/50">Desexed</span>
              <span className="text-[#1E3A5F] font-medium">{profile.isDesexed ? 'Yes' : 'No'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#1E3A5F]/50">Postcode</span>
              <span className="text-[#1E3A5F] font-medium">{profile.postcode || '—'}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Navigation */}
      <div className="flex gap-3 mt-6">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onBack}
          disabled={isLoading}
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white border-2 border-[#1E3A5F]/20 text-[#1E3A5F] hover:bg-[#1E3A5F]/5 transition-all font-medium disabled:opacity-50"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </motion.button>
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={canSubmit ? { scale: 1.02 } : {}}
          whileTap={canSubmit ? { scale: 0.98 } : {}}
          onClick={onSubmit}
          disabled={!canSubmit}
          className={`flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all ${
            canSubmit
              ? 'bg-[#1E3A5F] text-white hover:bg-[#2A4A73] shadow-lg shadow-[#1E3A5F]/25'
              : 'bg-[#1E3A5F]/20 text-[#1E3A5F]/40 cursor-not-allowed'
          }`}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Calculating...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Compare Prices
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
}
