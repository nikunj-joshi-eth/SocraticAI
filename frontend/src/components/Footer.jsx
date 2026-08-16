import React from 'react';
import { Github, Twitter, Linkedin, Heart, Shield } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#040406] py-16 px-4 md:px-8 relative z-10 text-slate-400">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10">
        
        {/* Brand Column */}
        <div className="md:col-span-5 flex flex-col justify-between">
          <div>
            <a href="#" className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-violet to-brand-cyan p-[1px] shadow-glow-violet">
                <div className="w-full h-full bg-[#050507] rounded-[11px] flex items-center justify-center">
                  <span className="font-mono font-extrabold text-sm text-brand-cyan">∑</span>
                </div>
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Socratic<span className="text-brand-cyan">AI</span>
              </span>
            </a>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed mb-6 font-normal">
              AI that teaches you to think. Autonomous multimodal diagnostic learning platform designed exclusively for JEE Main, JEE Advanced & NEET UG aspirants.
            </p>
          </div>
          <div className="text-xs text-slate-400 font-mono">
            © {new Date().getFullYear()} SocraticAI Technologies Inc. All rights reserved.
          </div>
        </div>

        {/* Links Column 1 */}
        <div className="md:col-span-3">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono mb-4">
            Platform
          </h4>
          <ul className="space-y-2.5 text-sm">
            <li><a href="#product" className="hover:text-brand-cyan transition-colors">Product Architecture</a></li>
            <li><a href="#how-it-works" className="hover:text-brand-cyan transition-colors">Multimodal Vision OCR</a></li>
            <li><a href="#adaptive-ai" className="hover:text-brand-cyan transition-colors">Adaptive RL Policy Engine</a></li>
            <li><a href="#demo" className="hover:text-brand-cyan transition-colors">Interactive Demo</a></li>
          </ul>
        </div>

        {/* Links Column 2 */}
        <div className="md:col-span-4">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono mb-4">
            Curriculum Standards
          </h4>
          <ul className="space-y-2.5 text-sm">
            <li><span className="text-slate-300">JEE Main Mathematics & Physics</span></li>
            <li><span className="text-slate-300">JEE Advanced Rotational Kinematics & Calculus</span></li>
            <li><span className="text-slate-300">NEET UG Organic Chemistry & Biology Reasoning</span></li>
            <li><span className="text-slate-300">Zero Answer-Dumping Compliance</span></li>
          </ul>

          <div className="mt-6 flex items-center gap-4 text-slate-400">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 hover:text-white hover:bg-white/10 transition-all">
              <Github className="w-4 h-4" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 hover:text-white hover:bg-white/10 transition-all">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 hover:text-white hover:bg-white/10 transition-all">
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
