import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, BrainCircuit } from 'lucide-react';
import MagneticButton from '../components/MagneticButton';

export default function FinalCTASection() {
  return (
    <section className="py-32 px-4 md:px-8 relative z-10 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-t from-brand-violet/20 via-brand-cyan/10 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-violet/10 border border-brand-violet/30 text-brand-cyan text-xs font-semibold tracking-wider uppercase mb-8 shadow-glow-violet backdrop-blur-md"
        >
          <BrainCircuit className="w-4 h-4 text-brand-cyan animate-pulse" />
          <span>Transform Your Exam Preparation</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight mb-8"
        >
          Your next breakthrough <br />
          <span className="text-gradient-animated">is one question away.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-10 font-normal leading-relaxed"
        >
          Stop collecting passive answer keys. Join thousands of JEE & NEET aspirants mastering deep mathematical and physical intuition.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex justify-center"
        >
          <MagneticButton
            variant="primary"
            className="text-lg px-9 py-4"
            onClick={() => {
              const el = document.querySelector('#demo');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span>Start Solving Now</span>
            <ArrowRight className="w-5 h-5" />
          </MagneticButton>
        </motion.div>

      </div>
    </section>
  );
}
