'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Calendar, User } from 'lucide-react';
import { PetProfile } from '@/types';

interface DetailsStepProps {
  profile: PetProfile;
  updateProfile: (updates: Partial<PetProfile>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function DetailsStep({ profile, updateProfile, onNext, onBack }: DetailsStepProps) {
  const canContinue = 
    profile.petName.trim() !== '' && 
    profile.petGender !== '' && 
    profile.dateOfBirth !== '';

  const today = new Date().toISOString().split('T')[0];
  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 25);
  const minDateStr = minDate.toISOString().split('T')[0];

  return (
    <div className="flex flex-col py-6 px-4">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl md:text-3xl font-bold text-center mb-2 text-[#1E3A5F]"
      >
        Tell us about your pet
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-[#1E3A5F]/60 text-center mb-6"
      >
        These details help us calculate an accurate price estimate
      </motion.p>

      <div className="space-y-4">
        {/* Pet Name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <label className="block text-[#1E3A5F]/80 font-medium mb-2">
            Pet&apos;s Name
          </label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1E3A5F]/40" />
            <input
              type="text"
              value={profile.petName}
              onChange={(e) => updateProfile({ petName: e.target.value })}
              placeholder="Enter your pet's name"
              className="w-full pl-12 pr-4 py-3 bg-white border-2 border-[#1E3A5F]/20 rounded-xl text-[#1E3A5F] placeholder-[#1E3A5F]/40 focus:outline-none focus:border-[#1E3A5F]/50 focus:ring-2 focus:ring-[#1E3A5F]/10 transition-all"
            />
          </div>
        </motion.div>

        {/* Gender Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <label className="block text-[#1E3A5F]/80 font-medium mb-2">
            Gender
          </label>
          <div className="grid grid-cols-2 gap-3">
            {(['Male', 'Female'] as const).map((gender) => (
              <button
                key={gender}
                onClick={() => updateProfile({ petGender: gender })}
                className={`p-3 rounded-xl border-2 transition-all duration-200 font-medium ${
                  profile.petGender === gender
                    ? 'border-[#1E3A5F] bg-[#1E3A5F] text-white'
                    : 'border-[#1E3A5F]/20 bg-white text-[#1E3A5F] hover:border-[#1E3A5F]/40 hover:bg-[#1E3A5F]/5'
                }`}
              >
                {gender}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Date of Birth */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <label className="block text-[#1E3A5F]/80 font-medium mb-2">
            Date of Birth
          </label>
          <div className="relative">
            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1E3A5F]/40" />
            <input
              type="date"
              value={profile.dateOfBirth}
              onChange={(e) => updateProfile({ dateOfBirth: e.target.value })}
              max={today}
              min={minDateStr}
              className="w-full pl-12 pr-4 py-3 bg-white border-2 border-[#1E3A5F]/20 rounded-xl text-[#1E3A5F] focus:outline-none focus:border-[#1E3A5F]/50 focus:ring-2 focus:ring-[#1E3A5F]/10 transition-all"
            />
          </div>
        </motion.div>

        {/* Desexed Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <button
            onClick={() => updateProfile({ isDesexed: !profile.isDesexed })}
            className="w-full flex items-center justify-between p-3 rounded-xl bg-white border-2 border-[#1E3A5F]/20 hover:bg-[#1E3A5F]/5 transition-all"
          >
            <span className="text-[#1E3A5F]/80 font-medium">Is your pet desexed?</span>
            <div className={`w-12 h-7 rounded-full transition-all duration-300 ${
              profile.isDesexed ? 'bg-[#1E3A5F]' : 'bg-[#1E3A5F]/20'
            }`}>
              <motion.div
                className="w-5 h-5 bg-white rounded-full mt-1 shadow-md"
                animate={{ x: profile.isDesexed ? 24 : 4 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </div>
          </button>
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
