import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, RotateCcw, Lightbulb, CheckCircle2, AlertCircle } from 'lucide-react';
import TiltCard from '../components/TiltCard';

const DAILY_5_TOUGH_QUESTIONS = [
  {
    id: 1,
    subject: "Physics",
    exam: "JEE Advanced 2023",
    chapter: "Rotational Dynamics",
    question: "A solid cylinder of mass M and radius R rolls without slipping down a rough incline of angle θ. What is the friction force acting on the cylinder?",
    subtext: "Choose your response below to test Socratic guidance:",
    options: [
      { id: "A", text: "(A) f = (1/3) Mg sin θ", isCorrect: true, hint: "Correct! Torque τ = Iα = f R and a = (g sin θ - f/M). Solving yields f = (1/3) Mg sin θ." },
      { id: "B", text: "(B) f = (1/2) Mg sin θ", isCorrect: false, hint: "Check your moment of inertia formula for a cylinder: I = (1/2) M R². Re-evaluate α = a/R." },
      { id: "C", text: "(C) f = (2/7) Mg sin θ", isCorrect: false, hint: "Notice: 2/7 Mg sin θ is for a solid sphere (I = 2/5 M R²), not a cylinder!" },
      { id: "D", text: "(D) f = Mg sin θ", isCorrect: false, hint: "If f = Mg sin θ, net acceleration a = 0, which would mean zero linear motion down the incline." }
    ]
  },
  {
    id: 2,
    subject: "Chemistry",
    exam: "JEE Advanced 2022",
    chapter: "Organic Mechanisms",
    question: "Benzaldehyde is treated with concentrated 50% NaOH solution. What is the major organic product formed?",
    subtext: "Select an option to evaluate reaction mechanism:",
    options: [
      { id: "A", text: "(A) Benzyl Alcohol & Sodium Benzoate", isCorrect: true, hint: "Correct! Benzaldehyde lacks α-hydrogens, undergoing self-redox Cannizzaro reaction." },
      { id: "B", text: "(B) Cinnamic Acid", isCorrect: false, hint: "Cinnamic acid requires reaction with acetic anhydride (Perkin reaction)." },
      { id: "C", text: "(C) Acetophenone", isCorrect: false, hint: "Acetophenone requires Friedel-Crafts acylation of benzene with acetyl chloride." },
      { id: "D", text: "(D) Benzoic Anhydride", isCorrect: false, hint: "Dehydration of benzoic acid is needed to yield benzoic anhydride." }
    ]
  },
  {
    id: 3,
    subject: "Mathematics",
    exam: "JEE Advanced 2023",
    chapter: "Definite Integrals",
    question: "Evaluate the integral I = ∫[0 to π/2] (√sin x / (√sin x + √cos x)) dx.",
    subtext: "Select your answer:",
    options: [
      { id: "A", text: "(A) π / 4", isCorrect: true, hint: "Correct! Applying King's Property ∫f(x)dx = ∫f(a-x)dx yields 2I = ∫1 dx = π/2 ⇒ I = π/4." },
      { id: "B", text: "(B) π / 2", isCorrect: false, hint: "Remember that adding I + I gives 2I = π/2. Don't forget to divide by 2 at the end." },
      { id: "C", text: "(C) π", isCorrect: false, hint: "Check the upper limit of integration: π/2, not π." },
      { id: "D", text: "(D) 0", isCorrect: false, hint: "The integrand is strictly positive over [0, π/2], so integral cannot be zero." }
    ]
  },
  {
    id: 4,
    subject: "Physics",
    exam: "JEE Advanced 2021",
    chapter: "Electrostatics",
    question: "Find the work done in moving a charge +q from axial point A(r, 0) to equatorial point B(0, r) of a dipole p.",
    subtext: "Select option to verify electrostatic potential energy:",
    options: [
      { id: "A", text: "(A) W = q p / (4πε₀ r²)", isCorrect: true, hint: "Correct! W = q(VB - VA). Potential on axial line VA = p/(4πε₀ r²) and equatorial VB = 0." },
      { id: "B", text: "(B) W = 0", isCorrect: false, hint: "Potential at B is zero, but potential at A is non-zero. W = q(0 - VA) ≠ 0." },
      { id: "C", text: "(C) W = 2 q p / (4πε₀ r²)", isCorrect: false, hint: "Recall potential of dipole drops with 1/r², not 2/r²." },
      { id: "D", text: "(D) W = -q p / (4πε₀ r³)", isCorrect: false, hint: "Electric field varies with 1/r³, but potential varies with 1/r²." }
    ]
  },
  {
    id: 5,
    subject: "Biology",
    exam: "NEET UG 2023",
    chapter: "Genetics & Evolution",
    question: "In a dihybrid cross between RrYy × RrYy, what proportion of offspring will be homozygous recessive for both traits (rryy)?",
    subtext: "Select Mendel's dihybrid ratio probability:",
    options: [
      { id: "A", text: "(A) 1 / 16", isCorrect: true, hint: "Correct! In 9:3:3:1 ratio, the double homozygous recessive genotype rryy occurs in 1/16 offspring." },
      { id: "B", text: "(B) 3 / 16", isCorrect: false, hint: "3/16 represents single recessive phenotypes (R_yy or rrY_)." },
      { id: "C", text: "(C) 9 / 16", isCorrect: false, hint: "9/16 represents double dominant phenotype (R_Y_)." },
      { id: "D", text: "(D) 1 / 4", isCorrect: false, hint: "1/4 is the monohybrid recessive phenotypic ratio." }
    ]
  }
];

export default function InteractiveDemoSection() {
  const [activeQuestionIdx, setActiveQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  const currentQ = DAILY_5_TOUGH_QUESTIONS[activeQuestionIdx];

  const handleSelectOption = (optionId) => {
    setSelectedOption(optionId);
  };

  const handleNextQuestion = (nextIdx) => {
    setActiveQuestionIdx(nextIdx);
    setSelectedOption(null);
  };

  const handleReset = () => {
    setSelectedOption(null);
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
            <span>5 Random Tough Questions Daily Challenge</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight mb-6"
          >
            Daily Interactive <span className="text-gradient-animated">Playground</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-400"
          >
            Challenge yourself with 5 daily tough questions selected from JEE Advanced & NEET archives. Select any option to test live Socratic reasoning!
          </motion.p>
        </div>

        {/* 5 Questions Switcher Bar */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-8 overflow-x-auto py-2">
          {DAILY_5_TOUGH_QUESTIONS.map((q, idx) => (
            <button
              key={q.id}
              onClick={() => handleNextQuestion(idx)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all ${
                activeQuestionIdx === idx
                  ? 'bg-brand-violet text-white border border-brand-cyan shadow-glow-violet scale-105'
                  : 'bg-[#090912] text-slate-400 border border-white/10 hover:text-white hover:bg-white/5'
              }`}
            >
              Q{idx + 1}: {q.subject}
            </button>
          ))}
        </div>

        {/* Live Question Card */}
        <div className="max-w-4xl mx-auto">
          <TiltCard className="bg-[#090912] border-brand-violet/30 p-6 md:p-10 shadow-2xl relative">
            
            {/* Question Top Metadata */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <span className="text-xs font-mono text-brand-cyan font-semibold">
                {currentQ.subject} — {currentQ.chapter} ({currentQ.exam})
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
                "{currentQ.question}"
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 font-mono">
                {currentQ.subtext}
              </p>
            </div>

            {/* 4 Options Grid (A, B, C, D) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {currentQ.options.map((opt) => {
                const isSelected = selectedOption === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(opt.id)}
                    className={`p-5 rounded-xl border text-left font-mono font-bold text-base md:text-lg transition-all duration-300 relative overflow-hidden ${
                      isSelected
                        ? opt.isCorrect
                          ? 'bg-emerald-500/20 border-emerald-500 text-white shadow-glow-emerald'
                          : 'bg-brand-violet/25 border-brand-cyan text-white shadow-glow-cyan'
                        : 'bg-[#050508] border-white/10 text-slate-300 hover:border-white/30 hover:bg-white/5'
                    }`}
                  >
                    <span>{opt.text}</span>
                  </button>
                );
              })}
            </div>

            {/* Socratic Feedback Box */}
            {selectedOption && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 rounded-xl bg-brand-violet/15 border border-brand-cyan/40 backdrop-blur-xl flex items-start gap-4"
              >
                <Lightbulb className="w-6 h-6 text-brand-cyan shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">
                    Socratic AI Feedback:
                  </h4>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {currentQ.options.find(o => o.id === selectedOption)?.hint}
                  </p>
                </div>
              </motion.div>
            )}
          </TiltCard>
        </div>
      </div>
    </section>
  );
}
