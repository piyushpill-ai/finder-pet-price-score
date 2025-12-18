import FormWizard from '@/components/FormWizard';
import { Shield, TrendingUp } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen finder-gradient relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Subtle gradient orbs */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#2A4A73]/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#FFD700]/5 rounded-full blur-[100px]" />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 215, 0, 0.3) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255, 215, 0, 0.3) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Header */}
      <header className="relative z-10 pt-6 pb-4 px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/finder-logo.png"
              alt="Finder"
              width={48}
              height={48}
              className="rounded-lg"
            />
            <div className="flex flex-col">
              <span className="text-xl font-bold text-white">
                Finder
              </span>
              <span className="text-xs text-[#FFD700]/80">
                Price Score Indicator
              </span>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-6 text-sm text-white/70">
            <span className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-[#FFD700]" />
              Secure
            </span>
            <span className="flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-[#FFD700]" />
              Real Data
            </span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 text-center px-6 pt-6 pb-4">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 leading-tight">
          <span className="text-white">
            Compare Pet Insurance
          </span>
          <br />
          <span className="text-[#FFD700]">
            Price Scores
          </span>
        </h1>
        <p className="text-white/70 max-w-xl mx-auto text-base">
          Get an instant indicative price comparison across Australia&apos;s top pet insurers.
        </p>
      </section>

      {/* Form Section - Yellow Card */}
      <section className="relative z-10 px-4 py-6">
        <div className="max-w-2xl mx-auto">
          <div className="finder-card rounded-3xl shadow-2xl shadow-black/20 p-6 md:p-8">
            <FormWizard />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-6 px-6 mt-4">
        <div className="max-w-4xl mx-auto text-center text-sm text-white/50">
          <p>
            This tool provides indicative pricing only. Actual insurance premiums vary by provider.
          </p>
          <p className="mt-2">
            Powered by PetSure data • Built for Australian pet owners
          </p>
        </div>
      </footer>
    </main>
  );
}
