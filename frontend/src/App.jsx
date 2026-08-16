import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { ExamProvider } from './context/ExamContext';
import OnboardingModal from './components/OnboardingModal';
import CustomCursor from './components/CustomCursor';
import MathCanvasBackground from './components/MathCanvasBackground';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import HeroSection from './sections/HeroSection';
import ProblemSection from './sections/ProblemSection';
import VisionSection from './sections/VisionSection';
import GuidanceSection from './sections/GuidanceSection';
import DoubtPortalSection from './sections/DoubtPortalSection';
import AdaptiveRLEngineSection from './sections/AdaptiveRLEngineSection';
import LeaderboardSection from './sections/LeaderboardSection';
import MasterySection from './sections/MasterySection';
import InteractiveDemoSection from './sections/InteractiveDemoSection';
import Footer from './components/Footer';

function MainAppContent() {
  useEffect(() => {
    // Initialize Lenis smooth kinetic scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#050507] text-[#F8FAFC] font-sans selection:bg-brand-violet/30 selection:text-brand-cyan overflow-x-hidden bg-noise">
      {/* Onboarding Target Exam Selection Modal */}
      <OnboardingModal />

      {/* Background ambient canvas particle field */}
      <MathCanvasBackground />

      {/* Mouse radial glow spotlight */}
      <CustomCursor />

      {/* Top scroll progress indicator */}
      <ScrollProgress />

      {/* Navigation Header */}
      <Navbar />

      {/* Main Landing Page Sections */}
      <main className="relative z-10">
        <HeroSection />
        <ProblemSection />
        <VisionSection />
        <GuidanceSection />
        <DoubtPortalSection />
        <AdaptiveRLEngineSection />
        <LeaderboardSection />
        <MasterySection />
        <InteractiveDemoSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ExamProvider>
      <MainAppContent />
    </ExamProvider>
  );
}
