import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, Lightbulb } from 'lucide-react';
import TiltCard from '../components/TiltCard';
import { DEMO_QUESTION } from '../data/mockData';

export default function InteractiveDemoSection() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleSelectOption = (optionId) => {
    setSelectedOption(optionId);
    setShowExplanation(true);
  };

  const handleReset = () => {
    setSelectedOption(null);
    setShowExplanation(false);
  };

  return (
    <section id="demo" className="py-24 px-4 md:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-violet/10 border border-brand-violet/30 text-brand-cyan text-xs font-semibold tracking-wider uppercase mb-4 shadow-glow-violet"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Interactive Live Playground</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight mb-6"
          >
            Try SocraticAI <span className="text-gradient-animated">Right Now.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-400"
          >
            Select any option from A, B, C, or D. Notice how SocraticAI responds to your selection by prompting key reasoning steps instead of just declaring "Right" or "Wrong".
          </motion.p>
        </div>

        {/* Live Question Interactive Card */}
        <div className="max-w-4xl mx-auto">
          <TiltCard className="bg-[#090912] border-brand-violet/30 p-6 md:p-10 shadow-2xl relative">
            
            {/* Question Top Metadata */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <span className="text-xs font-mono text-brand-cyan font-semibold">
                Physics — Kinematics in 1D (4-Option Standard JEE & NEET Diagnostic)
              </span>
              <button
                onClick={handleReset}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>

            {/* Question Statement */}
            <div className="mb-8">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 leading-snug">
                "{DEMO_QUESTION.question}"
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 font-mono">
                {DEMO_QUESTION.subtext}
              </p>
            </div>

            {/* 4 Options Grid (A, B, C, D) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {DEMO_QUESTION.options.map((opt) => {
                const isSelected = selectedOption === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(opt.id)}
                    className={`p-5 rounded-xl border text-left font-mono font-bold text-base md:text-lg transition-all duration-300 relative overflow-hidden ${
                      isSelected
                        ? 'bg-brand-violet/25 border-brand-cyan text-white shadow-glow-cyan scale-[1.02]'
                        : 'bg-[#050508] border-white/10 text-slate-300 hover:border-white/30 hover:bg-white/5'
                    }`}
                  >
                    <span>{opt.label}</span>
                    {isSelected && (
                      <span className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-brand-cyan animate-pulse" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Simulated Socratic AI Response Panel */}
            <AnimatePresence>
              {showExplanation && selectedOption && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                  className={`p-6 rounded-2xl border backdrop-blur-xl ${
                    DEMO_QUESTION.options.find(o => o.id === selectedOption)?.isCorrect
                      ? 'bg-emerald-500/10 border-emerald-500/40'
                      : 'bg-brand-violet/10 border-brand-violet/40'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className={`w-5 h-5 ${
                      DEMO_QUESTION.options.find(o => o.id === selectedOption)?.isCorrect ? 'text-emerald-400' : 'text-brand-cyan'
                    }`} />
                    <span className="text-xs font-mono font-bold tracking-wider uppercase text-white">
                      Socratic AI Guidance Response
                    </span>
                  </div>

                  <p className="text-sm sm:text-base font-semibold text-slate-100 mb-3 leading-relaxed">
                    {DEMO_QUESTION.socraticResponses[selectedOption].feedback}
                  </p>

                  <div className="bg-[#050508]/80 rounded-xl p-4 border border-white/10 mb-4 font-mono text-xs sm:text-sm text-brand-cyan">
                    💡 "{DEMO_QUESTION.socraticResponses[selectedOption].hint}"
                  </div>

                  <div className="text-xs text-slate-300 font-sans leading-relaxed">
                    <strong className="text-white block mb-1">Guided Question for You:</strong>
                    {DEMO_QUESTION.socraticResponses[selectedOption].questionToStudent}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </TiltCard>
        </div>

      </div>
    </section>
  );
}
