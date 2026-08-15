import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowDownRight, ArrowUpRight, Check, X, Sparkles, HelpCircle } from 'lucide-react';
import TiltCard from '../components/TiltCard';

export default function ZeroPenaltySection() {
  const [activePath, setActivePath] = useState('incorrect'); // 'correct' or 'incorrect'

  return (
    <section className="py-24 px-4 md:px-8 relative z-10 bg-bg-card/40 border-y border-white/5">
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
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Zero Negative Penalty Philosophy</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight mb-6"
          >
            Wrong isn't failure. <br />
            <span className="text-gradient-purple-cyan">It's data.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-400"
          >
            In traditional test series, wrong answers penalize you with negative marks. SocraticAI treats wrong attempts as precious diagnostic telemetry to pinpoint exact conceptual missteps.
          </motion.p>
        </div>

        {/* Interactive Path Selector & Flow Diagram */}
        <div className="max-w-4xl mx-auto">
          <TiltCard className="bg-[#08080E] border-white/10 p-6 md:p-10 relative overflow-hidden">
            
            {/* Toggle Path Buttons */}
            <div className="flex items-center justify-center gap-4 mb-10">
              <button
                onClick={() => setActivePath('correct')}
                className={`px-5 py-2.5 rounded-full text-xs font-mono font-bold transition-all ${
                  activePath === 'correct'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 shadow-glow-emerald'
                    : 'bg-white/5 text-slate-400 hover:text-white'
                }`}
              >
                Simulate Correct Path
              </button>
              <button
                onClick={() => setActivePath('incorrect')}
                className={`px-5 py-2.5 rounded-full text-xs font-mono font-bold transition-all ${
                  activePath === 'incorrect'
                    ? 'bg-brand-violet/30 text-brand-cyan border border-brand-violet/50 shadow-glow-violet'
                    : 'bg-white/5 text-slate-400 hover:text-white'
                }`}
              >
                Simulate Misstep Path
              </button>
            </div>

            {/* Visual Node Flow */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              
              {/* Node 1: ANSWER SUBMISSION */}
              <div className="bg-[#0D0D14] border border-white/10 rounded-2xl p-6 text-center">
                <div className="text-xs font-mono text-slate-400 mb-1">STEP 01</div>
                <div className="text-lg font-bold text-white mb-2">Student Answer</div>
                <div className="text-xs text-brand-purple font-mono bg-brand-violet/10 py-1 px-2 rounded">
                  Attempt Submitted
                </div>
              </div>

              {/* Node 2: DIAGNOSTIC EVALUATION */}
              <div className="flex flex-col items-center justify-center py-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-500 ${
                  activePath === 'correct' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-brand-violet/20 text-brand-cyan border border-brand-violet/40'
                }`}>
                  {activePath === 'correct' ? <Check className="w-6 h-6" /> : <HelpCircle className="w-6 h-6" />}
                </div>
                <div className="text-xs font-mono text-slate-400 mt-2">
                  {activePath === 'correct' ? 'Correct Concept' : 'Diagnostic Telemetry'}
                </div>
              </div>

              {/* Node 3: SYSTEM ACTION */}
              <motion.div
                key={activePath}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`border rounded-2xl p-6 text-center ${
                  activePath === 'correct'
                    ? 'bg-emerald-500/10 border-emerald-500/40'
                    : 'bg-brand-violet/10 border-brand-violet/40'
                }`}
              >
                <div className="text-xs font-mono text-slate-400 mb-1">
                  {activePath === 'correct' ? 'REWARD & POLICY UPDATE' : 'ZERO PENALTY & GUIDANCE'}
                </div>
                <div className="text-xl font-bold text-white mb-2">
                  {activePath === 'correct' ? '+120 XP & Skill Level Up' : '0 Penalty + Socratic Hint'}
                </div>
                <div className="text-xs font-mono text-slate-300">
                  {activePath === 'correct'
                    ? 'Student advances to higher difficulty branch'
                    : 'Targeted micro-hint issued to resolve specific concept gap'}
                </div>
              </motion.div>

            </div>

          </TiltCard>
        </div>

      </div>
    </section>
  );
}
