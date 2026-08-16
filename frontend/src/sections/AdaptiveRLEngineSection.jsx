import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Target, ArrowUpRight, BarChart3, CheckCircle, ShieldCheck } from 'lucide-react';
import TiltCard from '../components/TiltCard';
import { SEPARATE_EXAM_DATA } from '../data/mockData';

export default function AdaptiveRLEngineSection() {
  const [selectedExam, setSelectedExam] = useState('JEE Main');
  const [accuracyProgress, setAccuracyProgress] = useState(0);

  const activeModelData = SEPARATE_EXAM_DATA[selectedExam];

  useEffect(() => {
    const target = activeModelData.targetAccuracy;
    setAccuracyProgress(0);
    const steps = 25;
    const duration = 800;
    const stepTime = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current++;
      const val = Math.round((current / steps) * target);
      setAccuracyProgress(val);
      if (current >= steps) clearInterval(timer);
    }, stepTime);

    return () => clearInterval(timer);
  }, [selectedExam]);

  return (
    <section id="adaptive-ai" className="py-24 px-4 md:px-8 relative z-10 bg-bg-card/30 border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan text-xs font-semibold tracking-wider uppercase mb-4 shadow-glow-cyan"
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Independent Exam Diagnostic Models</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight mb-6"
          >
            Your difficulty curve <span className="text-gradient-animated">learns with you.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-400"
          >
            JEE Main, JEE Advanced, and NEET UG feature isolated RL diagnostic models with independent difficulty curves, accuracy benchmarks, and score predictions.
          </motion.p>
        </div>

        {/* Separate Exam Stream Selector Tabs */}
        <div className="flex justify-center mb-10">
          <div className="bg-[#08080E] border border-white/10 p-1.5 rounded-2xl inline-flex gap-2 shadow-2xl">
            {Object.keys(SEPARATE_EXAM_DATA).map((examKey) => (
              <button
                key={examKey}
                onClick={() => setSelectedExam(examKey)}
                className={`px-6 py-3 rounded-xl text-xs font-mono font-bold transition-all duration-300 ${
                  selectedExam === examKey
                    ? 'bg-brand-violet text-white shadow-glow-violet scale-[1.02]'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {examKey}
              </button>
            ))}
          </div>
        </div>

        {/* Independent Exam Calculation Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto">
          
          {/* Left: Exam Overview Metrics */}
          <div className="lg:col-span-6">
            <TiltCard className="h-full bg-[#08080E] border-brand-violet/30 p-6 md:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                  <span className="text-xs font-mono text-brand-cyan font-bold flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" />
                    {activeModelData.examName}
                  </span>
                  <span className="text-[11px] font-mono text-brand-purple bg-brand-violet/10 px-2.5 py-0.5 rounded-full border border-brand-violet/20">
                    Isolated Calculation
                  </span>
                </div>

                <div className="mb-6">
                  <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">
                    Target Concept Accuracy
                  </div>
                  <div className="text-4xl font-mono font-extrabold text-white mb-2">
                    {accuracyProgress}%
                  </div>
                  <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/5">
                    <motion.div
                      className="h-full bg-gradient-to-r from-brand-violet via-brand-cyan to-emerald-400 rounded-full"
                      style={{ width: `${accuracyProgress}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-[#050508] p-4 rounded-xl border border-white/5">
                    <div className="text-[11px] font-mono text-slate-400">Predicted Benchmark Score</div>
                    <div className="text-lg font-bold text-brand-cyan font-mono mt-0.5">
                      {activeModelData.predictedScore}
                    </div>
                  </div>

                  <div className="bg-[#050508] p-4 rounded-xl border border-white/5">
                    <div className="text-[11px] font-mono text-slate-400">Calibrated Question Difficulty</div>
                    <div className="text-base font-bold text-white font-mono mt-0.5 flex items-center justify-between">
                      <span>{activeModelData.recommendedDifficulty}</span>
                      <ArrowUpRight className="w-4 h-4 text-brand-cyan" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 text-xs font-mono text-slate-400 flex items-center justify-between">
                <span>Model Engine: Standalone PPO</span>
                <span className="text-emerald-400">100% Isolated Metrics</span>
              </div>
            </TiltCard>
          </div>

          {/* Right: Independent Subtopic Mastery Breakdown */}
          <div className="lg:col-span-6">
            <TiltCard className="h-full bg-[#0A0A14] border-white/10 p-6 md:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                  <span className="text-xs font-mono text-slate-400 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-brand-cyan" />
                    {selectedExam} Subtopic Mastery Matrix
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    Real-time Diagnostic
                  </span>
                </div>

                <div className="space-y-4 mb-6">
                  {activeModelData.subtopics.map((topic) => (
                    <div key={topic.name} className="bg-[#050508] p-4 rounded-xl border border-white/5">
                      <div className="flex justify-between items-center mb-1.5 text-xs font-mono">
                        <span className="text-slate-200 font-bold">{topic.name}</span>
                        <span className="text-brand-cyan font-bold">{topic.score}%</span>
                      </div>
                      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-brand-violet to-brand-cyan rounded-full transition-all duration-500"
                          style={{ width: `${topic.score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 text-xs text-slate-400 font-mono">
                Subtopic parameters are computed independently for {selectedExam} without mixing with other exams.
              </div>
            </TiltCard>
          </div>

        </div>

      </div>
    </section>
  );
}
