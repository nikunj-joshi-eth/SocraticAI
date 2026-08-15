import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, CheckCircle2, RefreshCw, BrainCircuit } from 'lucide-react';
import MagneticButton from '../components/MagneticButton';
import TiltCard from '../components/TiltCard';
import { HERO_PROBLEMS } from '../data/mockData';
import { useExam } from '../context/ExamContext';

export default function HeroSection() {
  const { targetExam } = useExam();
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const heroProblem = HERO_PROBLEMS[targetExam] || HERO_PROBLEMS["JEE Main"];

  useEffect(() => {
    setActiveStepIndex(0);
  }, [targetExam]);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveStepIndex((prev) => (prev + 1) % heroProblem.steps.length);
    }, 3800);
    return () => clearInterval(interval);
  }, [isAutoPlaying, heroProblem]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-28 pb-16 px-4 md:px-8 overflow-hidden">
      {/* Subtle Background Glowing Ambient Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-violet/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-brand-cyan/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center z-10">
        
        {/* Left Column — Text & CTAs */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col items-start text-left"
        >
          {/* Eyebrow */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-violet/10 border border-brand-violet/30 text-brand-cyan text-xs font-semibold tracking-wider uppercase mb-6 shadow-glow-violet backdrop-blur-md"
          >
            <BrainCircuit className="w-3.5 h-3.5 text-brand-cyan animate-pulse" />
            <span>Autonomous AI for {targetExam} Aspirants</span>
          </motion.div>

          {/* Headline Word-by-Word Reveal */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] mb-6"
          >
            <span className="block">Don't get the answer.</span>
            <span className="block text-gradient-animated mt-1">
              Discover it.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg lg:text-xl text-slate-400 font-normal leading-relaxed max-w-2xl mb-8"
          >
            SocraticAI doesn't dump solutions. It understands your mistake, adapts to your level, and guides you toward the answer through diagnostic reasoning.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-4 w-full sm:w-auto"
          >
            <MagneticButton
              variant="primary"
              onClick={() => {
                const el = document.querySelector('#demo');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span>Start Solving</span>
              <ArrowRight className="w-4 h-4" />
            </MagneticButton>

            <MagneticButton
              variant="secondary"
              onClick={() => {
                const el = document.querySelector('#how-it-works');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span>See How It Works</span>
            </MagneticButton>
          </motion.div>

          {/* Social Proof Metadata */}
          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-wrap items-center gap-6 text-xs sm:text-sm text-slate-400 border-t border-white/5 pt-6 w-full max-w-xl"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-emerald" />
              <span>RL Policy Trained on {targetExam} Doubts</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-cyan" />
              <span>Zero Answer-Dumping</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column — Floating Interactive AI Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 relative"
        >
          <TiltCard className="w-full bg-[#0A0A0F]/90 border-white/10 p-6 md:p-8 shadow-2xl relative">
            {/* Top Bar of Floating Problem Interface */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-xs font-mono text-slate-400">socratic-diagnostic-v4.2</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-brand-cyan bg-brand-cyan/10 px-2.5 py-1 rounded-full border border-brand-cyan/20">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse" />
                <span>Live AI Analysis</span>
              </div>
            </div>

            {/* Input Problem Display */}
            <div className="bg-[#050507] rounded-xl p-5 border border-white/5 mb-6 relative overflow-hidden group">
              <div className="flex justify-between items-center text-xs text-slate-400 mb-2">
                <span className="font-mono text-brand-violet">{heroProblem.topic}</span>
                <span className="bg-white/5 px-2 py-0.5 rounded text-[10px] text-slate-300">STUDENT INPUT</span>
              </div>
              
              <div className="font-mono text-xl sm:text-2xl font-bold text-white tracking-wide flex items-center justify-between">
                <span>{heroProblem.equation}</span>
                <Sparkles className="w-5 h-5 text-brand-violet animate-pulse" />
              </div>

              {/* Glowing Scan Bar */}
              <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-brand-violet via-brand-cyan to-brand-purple animate-pulse" />
            </div>

            {/* Socratic AI Diagnostic Step Display */}
            <div className="space-y-4 min-h-[170px] relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStepIndex}
                  initial={{ opacity: 0, y: 15, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -15, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="bg-brand-violet/10 border border-brand-violet/30 rounded-xl p-5 backdrop-blur-md relative"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-brand-cyan uppercase tracking-wider">
                      {heroProblem.steps[activeStepIndex]?.title}
                    </span>
                    <span className="text-[11px] font-medium bg-brand-violet/20 text-brand-purple border border-brand-violet/30 px-2.5 py-0.5 rounded-full">
                      {heroProblem.steps[activeStepIndex]?.badge}
                    </span>
                  </div>

                  <p className="text-sm md:text-base font-medium text-slate-100 leading-relaxed font-sans">
                    "{heroProblem.steps[activeStepIndex]?.hint}"
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Interactive Step Switcher Controls */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5">
                {heroProblem.steps.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setIsAutoPlaying(false);
                      setActiveStepIndex(idx);
                    }}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      activeStepIndex === idx
                        ? 'w-7 bg-brand-cyan shadow-glow-cyan'
                        : 'w-2 bg-white/20 hover:bg-white/40'
                    }`}
                    aria-label={`Go to hint step ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isAutoPlaying ? 'animate-spin' : ''}`} />
                <span>{isAutoPlaying ? 'Auto-stepping' : 'Paused'}</span>
              </button>
            </div>
          </TiltCard>
        </motion.div>

      </div>
    </section>
  );
}
