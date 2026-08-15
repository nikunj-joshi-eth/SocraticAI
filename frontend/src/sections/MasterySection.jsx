import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Flame, Award, Zap, CheckCircle } from 'lucide-react';
import TiltCard from '../components/TiltCard';

export default function MasterySection() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [xpCount, setXpCount] = useState(0);
  const [activeExamCategory, setActiveExamCategory] = useState("JEE Main");

  const separateMasteryData = {
    "JEE Main": [
      { name: "Mathematics — Calculus & Algebra", accuracy: 89, color: "#8B5CF6", level: "JEE Main Mastered" },
      { name: "Physics — Mechanics & Electrodynamics", accuracy: 87, color: "#22D3EE", level: "Top Percentile" },
      { name: "Chemistry — Physical & Inorganic", accuracy: 84, color: "#10B981", level: "Mastery Level 4" }
    ],
    "JEE Advanced": [
      { name: "Physics — Rotational Dynamics & Optics", accuracy: 81, color: "#22D3EE", level: "JEE Advanced Ready" },
      { name: "Mathematics — Coordinate & Vectors", accuracy: 78, color: "#8B5CF6", level: "AIR < 1000 Target" },
      { name: "Chemistry — Organic Mechanisms", accuracy: 83, color: "#10B981", level: "Advanced Diagnostic" }
    ],
    "NEET UG": [
      { name: "Biology — Human Physiology & Genetics", accuracy: 96, color: "#10B981", level: "NEET Top Tier" },
      { name: "Chemistry — Organic & Bio-molecules", accuracy: 92, color: "#8B5CF6", level: "Speed Mastered" },
      { name: "Physics — Kinematics & Optics", accuracy: 91, color: "#22D3EE", level: "High Accuracy" }
    ]
  };

  useEffect(() => {
    if (isInView) {
      let current = 0;
      const target = 120;
      const timer = setInterval(() => {
        current += 4;
        if (current >= target) {
          setXpCount(target);
          clearInterval(timer);
        } else {
          setXpCount(current);
        }
      }, 30);
      return () => clearInterval(timer);
    }
  }, [isInView]);

  return (
    <section ref={ref} className="py-24 px-4 md:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-emerald/10 border border-brand-emerald/30 text-brand-emerald text-xs font-semibold tracking-wider uppercase mb-4 shadow-glow-emerald"
          >
            <Award className="w-3.5 h-3.5" />
            <span>Reinforcement & Mastery Loop</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight mb-6"
          >
            Every correct answer <br />
            <span className="text-gradient-purple-cyan">makes the system smarter.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-400"
          >
            Track real cognitive growth. Select an exam target below to view its independently calculated mastery metrics.
          </motion.p>
        </div>

        {/* Dashboard Mastery Card */}
        <div className="max-w-4xl mx-auto">
          <TiltCard className="bg-[#09090F] border-white/10 p-6 md:p-10 shadow-2xl relative overflow-hidden">
            
            {/* Top Stat Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8 border-b border-white/10 mb-8">
              
              {/* XP Counter Card */}
              <div className="bg-[#050508] rounded-2xl p-6 border border-brand-violet/30 flex items-center justify-between relative overflow-hidden group">
                <div>
                  <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">
                    Last Session Reward
                  </div>
                  <div className="text-4xl font-mono font-extrabold text-brand-cyan tracking-tight">
                    +{xpCount} XP
                  </div>
                  <div className="text-xs text-brand-purple font-mono mt-1">
                    Diagnostic Boost Applied
                  </div>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-brand-violet/20 border border-brand-violet/40 flex items-center justify-center text-brand-cyan shadow-glow-violet">
                  <Zap className="w-7 h-7 animate-pulse" />
                </div>
              </div>

              {/* Streak Card */}
              <div className="bg-[#050508] rounded-2xl p-6 border border-amber-500/30 flex items-center justify-between relative overflow-hidden">
                <div>
                  <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">
                    Cognitive Consistency
                  </div>
                  <div className="text-3xl font-mono font-extrabold text-amber-400 tracking-tight flex items-center gap-2">
                    🔥 12 DAY STREAK
                  </div>
                  <div className="text-xs text-slate-400 font-mono mt-1">
                    Top 2% Aspirant Momentum
                  </div>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                  <Flame className="w-7 h-7 animate-bounce" />
                </div>
              </div>

            </div>

            {/* Separate Exam Category Tab Bar */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Exam Calculation Target:
              </span>
              <div className="flex gap-2">
                {Object.keys(separateMasteryData).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveExamCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                      activeExamCategory === cat
                        ? 'bg-brand-violet text-white shadow-glow-violet'
                        : 'bg-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Subject Mastery Progress Bars for Selected Exam */}
            <div className="space-y-6">
              {separateMasteryData[activeExamCategory].map((subject, idx) => (
                <div key={subject.name} className="bg-[#050508] rounded-xl p-4 border border-white/5">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-base">{subject.name}</span>
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/5">
                        {subject.level}
                      </span>
                    </div>
                    <span className="text-lg font-mono font-extrabold" style={{ color: subject.color }}>
                      {isInView ? subject.accuracy : 0}%
                    </span>
                  </div>

                  <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden p-0.5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: isInView ? `${subject.accuracy}%` : 0 }}
                      transition={{ duration: 1.2, delay: 0.2 + idx * 0.15, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: subject.color }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Verification Note */}
            <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle className="w-4 h-4" />
                {activeExamCategory} Isolated Score Vector: Active
              </span>
              <span>Updated in real-time</span>
            </div>

          </TiltCard>
        </div>

      </div>
    </section>
  );
}
