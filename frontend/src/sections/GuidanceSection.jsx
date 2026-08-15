import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, CheckCircle2, RotateCcw } from 'lucide-react';
import TiltCard from '../components/TiltCard';
import MagneticButton from '../components/MagneticButton';
import { GUIDANCE_SCENARIOS } from '../data/mockData';
import { useExam } from '../context/ExamContext';

export default function GuidanceSection() {
  const { targetExam } = useExam();
  const [currentHintLevel, setCurrentHintLevel] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);

  const scenario = GUIDANCE_SCENARIOS[targetExam] || GUIDANCE_SCENARIOS["JEE Main"];

  useEffect(() => {
    setCurrentHintLevel(1);
    setIsCompleted(false);
  }, [targetExam]);

  const handleNextHint = () => {
    if (currentHintLevel < scenario.hints.length) {
      setCurrentHintLevel(prev => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleReset = () => {
    setCurrentHintLevel(1);
    setIsCompleted(false);
  };

  return (
    <section className="py-24 px-4 md:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-violet/10 border border-brand-violet/30 text-brand-purple text-xs font-semibold tracking-wider uppercase mb-4 shadow-glow-violet"
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>Interactive Tutoring Engine — {targetExam}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight mb-6"
          >
            We don't solve it for you. <br />
            <span className="text-gradient-animated">We help you solve it yourself.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-400"
          >
            Experience how SocraticAI replaces direct answer-dumping with guided micro-questions tailored specifically for {targetExam} aspirants.
          </motion.p>
        </div>

        {/* Large Interactive Tutoring Demo Card */}
        <div className="max-w-4xl mx-auto">
          <TiltCard className="bg-[#0A0A10] border-white/10 p-6 md:p-10 shadow-2xl relative">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-violet/20 border border-brand-violet/40 flex items-center justify-center text-brand-cyan font-bold font-mono">
                  S
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Socratic Diagnostic Session</div>
                  <div className="text-xs text-slate-400 font-mono">{scenario.subject}</div>
                </div>
              </div>
              <button
                onClick={handleReset}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Demo</span>
              </button>
            </div>

            {/* Target Problem Banner */}
            <div className="bg-[#050508] rounded-xl p-5 border border-white/10 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-xs text-slate-400 uppercase tracking-wider font-mono block mb-1">Target Problem:</span>
                <div className="text-xl sm:text-2xl font-mono font-bold text-white">
                  <span className="text-brand-cyan">{scenario.problemText}</span>
                </div>
              </div>
              <div className="bg-brand-violet/10 text-brand-purple border border-brand-violet/20 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold self-start md:self-auto">
                {scenario.badge}
              </div>
            </div>

            {/* Progressive Socratic Hints Stream */}
            <div className="space-y-4 mb-8">
              {scenario.hints.slice(0, currentHintLevel).map((hint) => (
                <motion.div
                  key={hint.level}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="bg-[#0F0F1A] border border-brand-violet/30 rounded-xl p-5 relative overflow-hidden"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-brand-cyan">
                      {hint.title}
                    </span>
                    <span className="text-[11px] font-mono bg-brand-violet/20 text-brand-purple px-2.5 py-0.5 rounded-full">
                      {hint.chip}
                    </span>
                  </div>
                  <p className="text-base text-slate-100 font-medium mb-2 leading-relaxed font-sans">
                    "{hint.question}"
                  </p>
                  <div className="text-xs text-slate-400 font-mono italic">
                    💡 AI Guidance note: {hint.thought}
                  </div>
                </motion.div>
              ))}

              {/* Final Discovery Card */}
              {isCompleted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-emerald-500/10 border border-emerald-500/40 rounded-xl p-6 text-center backdrop-blur-md"
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center mb-3">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">{scenario.breakthrough.title}</h4>
                  <p className="text-sm sm:text-base text-slate-200 max-w-lg mx-auto font-mono mb-3">
                    {scenario.breakthrough.mathResult}
                  </p>
                  <span className="inline-block text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                    {scenario.breakthrough.reward}
                  </span>
                </motion.div>
              )}
            </div>

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
              <div className="text-xs text-slate-400 font-mono">
                Hint Progress: <span className="text-brand-cyan font-bold">{currentHintLevel} / {scenario.hints.length}</span>
              </div>

              {!isCompleted ? (
                <MagneticButton
                  variant="primary"
                  onClick={handleNextHint}
                >
                  <span>{currentHintLevel === scenario.hints.length ? "Discover Solution ➔" : "Reveal Next Socratic Hint ➔"}</span>
                </MagneticButton>
              ) : (
                <MagneticButton
                  variant="secondary"
                  onClick={handleReset}
                >
                  <span>Try Again</span>
                  <RotateCcw className="w-4 h-4" />
                </MagneticButton>
              )}
            </div>

          </TiltCard>
        </div>

      </div>
    </section>
  );
}
