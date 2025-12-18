'use client';

import { motion } from 'framer-motion';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="mb-6">
      <div className="flex justify-between mb-2 text-sm">
        <span className="text-[#1E3A5F]/70 font-medium">Step {currentStep + 1} of {totalSteps}</span>
        <span className="text-[#1E3A5F]/70 font-medium">{Math.round(progress)}% Complete</span>
      </div>
      <div className="h-2 bg-[#1E3A5F]/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-[#1E3A5F] to-[#2A4A73]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
