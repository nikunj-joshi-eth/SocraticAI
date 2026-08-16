import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Target, Stethoscope, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { useExam } from '../context/ExamContext';

export default function OnboardingModal() {
  const { showOnboardingModal, selectExam } = useExam();

  if (!showOnboardingModal) return null;

  const examOptions = [
    {
      id: 'JEE Main',
      title: 'JEE Main',
      tagline: 'Engineering Aspirants',
      icon: <Zap className="w-6 h-6 text-brand-cyan" />,
      desc: 'Focus on speed, formula application, NTA pattern concept isolation, and accuracy.',
      color: 'from-brand-cyan/20 to-brand-violet/10 border-brand-cyan/40 shadow-glow-cyan',
      badge: 'Speed & Concept Accuracy'
    },
    {
      id: 'JEE Advanced',
      title: 'JEE Advanced',
      tagline: 'IIT Aspirants',
      icon: <Target className="w-6 h-6 text-brand-purple" />,
      desc: 'Focus on deep multi-concept physics, complex calculus, rotational dynamics, and AIR rank optimization.',
      color: 'from-brand-violet/20 to-brand-purple/10 border-brand-violet/40 shadow-glow-violet',
      badge: 'Deep Multi-Concept Depth'
    },
    {
      id: 'NEET UG',
      title: 'NEET UG',
      tagline: 'Medical Aspirants',
      icon: <Stethoscope className="w-6 h-6 text-brand-emerald" />,
      desc: 'Focus on high-accuracy NCERT biology reasoning, organic reaction mechanisms, and rapid speed physics.',
      color: 'from-emerald-500/20 to-brand-cyan/10 border-emerald-500/40 shadow-glow-emerald',
      badge: 'NCERT & High Accuracy'
    }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl w-full bg-[#0A0A12] border border-brand-violet/40 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden"
        >
          {/* Subtle Ambient Background Orbs */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-violet/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-cyan/10 rounded-full blur-[100px] pointer-events-none" />

          {/* Header */}
          <div className="text-center mb-8 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-violet/10 border border-brand-violet/30 text-brand-cyan text-xs font-semibold tracking-wider uppercase mb-3 shadow-glow-violet">
              <Sparkles className="w-3.5 h-3.5 text-brand-cyan animate-pulse" />
              <span>Welcome to SocraticAI</span>
            </div>
            
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
              Select Your Target Exam Goal
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-lg mx-auto">
              Your choice configures the autonomous AI diagnostic engine, problem difficulty curve, and formula explanations.
            </p>
          </div>

          {/* 3 Exam Selection Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 relative z-10">
            {examOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => selectExam(opt.id)}
                className={`p-5 rounded-2xl border text-left flex flex-col justify-between bg-gradient-to-b ${opt.color} hover:scale-[1.03] transition-all duration-300 group cursor-pointer`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                      {opt.icon}
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-300 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                      {opt.tagline}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-brand-cyan transition-colors">
                    {opt.title}
                  </h3>
                  
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {opt.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-brand-cyan">
                  <span>{opt.badge}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            ))}
          </div>

          {/* Bottom Note */}
          <div className="text-center text-xs text-slate-400 font-mono relative z-10">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 inline mr-1.5" />
            You can switch your target exam stream at any time from the top navigation bar.
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
