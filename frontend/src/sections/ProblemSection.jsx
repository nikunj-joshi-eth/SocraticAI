import React from 'react';
import { motion } from 'framer-motion';
import { Clock, HelpCircle, GitCommit } from 'lucide-react';
import TiltCard from '../components/TiltCard';
import { PROBLEM_CARDS } from '../data/mockData';

export default function ProblemSection() {
  const cardIcons = {
    "01": <Clock className="w-6 h-6 text-rose-400" />,
    "02": <HelpCircle className="w-6 h-6 text-amber-400" />,
    "03": <GitCommit className="w-6 h-6 text-cyan-400" />,
  };

  return (
    <section id="product" className="py-24 px-4 md:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight mb-6"
          >
            The problem isn't finding the answer. <br className="hidden sm:inline" />
            <span className="text-slate-400">It's knowing why you got it wrong.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-base sm:text-lg text-slate-400"
          >
            JEE & NEET demand deep diagnostic reasoning. Traditional doubt solving and generic AI LLMs have created three systemic traps:
          </motion.p>
        </div>

        {/* 3 Cinematic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PROBLEM_CARDS.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: index * 0.18 }}
            >
              <TiltCard className={`h-full flex flex-col justify-between p-8 bg-gradient-to-b ${card.accentColor} border-white/10 ${card.borderColor}`}>
                <div>
                  {/* Top Badge & Number */}
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-3xl sm:text-4xl font-mono font-extrabold text-white tracking-wider">
                      {card.stat}
                    </span>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
                      {cardIcons[card.id]}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-400 text-sm leading-relaxed mb-6 font-normal">
                    {card.description}
                  </p>
                </div>

                {/* Bottom Tag */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="font-mono text-slate-300 font-medium">
                    {card.tag}
                  </span>
                  <span className="text-slate-400 font-mono">CRITICAL</span>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
