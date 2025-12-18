'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PetProfile, FormStep, QuoteResponse } from '@/types';
import SpeciesStep from './steps/SpeciesStep';
import BreedStep from './steps/BreedStep';
import DetailsStep from './steps/DetailsStep';
import LocationStep from './steps/LocationStep';
import ResultStep from './steps/ResultStep';
import ProgressBar from './ProgressBar';

const initialProfile: PetProfile = {
  species: '',
  breedCode: '',
  breedName: '',
  petName: '',
  petGender: '',
  dateOfBirth: '',
  isDesexed: false,
  postcode: '',
};

const steps: FormStep[] = ['species', 'breed', 'details', 'location', 'result'];

export default function FormWizard() {
  const [currentStep, setCurrentStep] = useState<FormStep>('species');
  const [profile, setProfile] = useState<PetProfile>(initialProfile);
  const [result, setResult] = useState<QuoteResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const currentIndex = steps.indexOf(currentStep);

  const updateProfile = (updates: Partial<PetProfile>) => {
    setProfile((prev) => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex]);
    }
  };

  const prevStep = () => {
    const prevIndex = currentIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex]);
    }
  };

  const submitQuote = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          species: profile.species,
          breedCode: profile.breedCode,
          petName: profile.petName,
          petGender: profile.petGender,
          dateOfBirth: profile.dateOfBirth,
          isDesexed: profile.isDesexed,
          postcode: profile.postcode,
        }),
      });

      const data = await response.json();
      setResult(data);
      nextStep();
    } catch (error) {
      console.error('Failed to get quote:', error);
      // Show fallback result
      setResult({
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
      nextStep();
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setProfile(initialProfile);
    setResult(null);
    setCurrentStep('species');
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {currentStep !== 'result' && (
        <ProgressBar currentStep={currentIndex} totalSteps={steps.length - 1} />
      )}

      <div className="relative min-h-[580px]">
        <AnimatePresence mode="wait" custom={1}>
          <motion.div
            key={currentStep}
            custom={1}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="w-full"
          >
            {currentStep === 'species' && (
              <SpeciesStep
                profile={profile}
                updateProfile={updateProfile}
                onNext={nextStep}
              />
            )}
            {currentStep === 'breed' && (
              <BreedStep
                profile={profile}
                updateProfile={updateProfile}
                onNext={nextStep}
                onBack={prevStep}
              />
            )}
            {currentStep === 'details' && (
              <DetailsStep
                profile={profile}
                updateProfile={updateProfile}
                onNext={nextStep}
                onBack={prevStep}
              />
            )}
            {currentStep === 'location' && (
              <LocationStep
                profile={profile}
                updateProfile={updateProfile}
                onSubmit={submitQuote}
                onBack={prevStep}
                isLoading={isLoading}
              />
            )}
            {currentStep === 'result' && result && (
              <ResultStep
                profile={profile}
                result={result}
                onReset={resetForm}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

