import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Menu, X, ChevronDown, Check } from 'lucide-react';
import MagneticButton from './MagneticButton';
import { useExam } from '../context/ExamContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [examDropdownOpen, setExamDropdownOpen] = useState(false);

  const { targetExam, setTargetExam } = useExam();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Product', href: '#product' },
    { name: 'How it Works', href: '#how-it-works' },
    { name: 'Doubt Portal', href: '#doubt-portal' },
    { name: 'Adaptive AI', href: '#adaptive-ai' },
    { name: 'Demo', href: '#demo' },
  ];

  const handleLinkClick = (href) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const exams = ['JEE Main', 'JEE Advanced', 'NEET UG'];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 md:px-8 py-4 transition-all duration-500">
      <div
        className={`max-w-7xl mx-auto rounded-full transition-all duration-500 px-6 py-3 flex items-center justify-between ${
          scrolled
            ? 'glass-panel border-white/10 shadow-2xl backdrop-blur-xl bg-[#0A0A0F]/80'
            : 'bg-transparent border border-transparent'
        }`}
      >
        {/* Brand Logo & Target Exam Selector Badge */}
        <div className="flex items-center gap-4">
          <a
            href="#"
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-brand-violet to-brand-cyan p-[1px] shadow-glow-violet group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-[#050507] rounded-[11px] flex items-center justify-center relative overflow-hidden">
                <span className="font-mono font-extrabold text-sm text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-violet group-hover:rotate-12 transition-transform duration-300">
                  ∑
                </span>
              </div>
            </div>
            <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
              Socratic<span className="text-brand-cyan font-semibold">AI</span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse" />
            </span>
          </a>

          {/* Active Target Exam Selector Dropdown Badge */}
          <div className="relative hidden sm:block">
            <button
              onClick={() => setExamDropdownOpen(!examDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-violet/20 border border-brand-violet/40 text-brand-cyan text-xs font-mono font-bold hover:bg-brand-violet/30 transition-all shadow-glow-violet"
            >
              <span>{targetExam}</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {examDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-40 bg-[#0A0A12] border border-white/15 rounded-xl p-1.5 shadow-2xl backdrop-blur-xl z-50">
                {exams.map((ex) => (
                  <button
                    key={ex}
                    onClick={() => {
                      setTargetExam(ex);
                      setExamDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-mono font-bold flex items-center justify-between transition-all ${
                      targetExam === ex
                        ? 'bg-brand-violet text-white'
                        : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span>{ex}</span>
                    {targetExam === ex && <Check className="w-3.5 h-3.5 text-brand-cyan" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(link.href);
              }}
              className="text-sm font-medium text-slate-300 hover:text-white hover:text-brand-cyan transition-colors duration-200 relative group py-1"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-brand-violet to-brand-cyan group-hover:w-full transition-all duration-300 rounded-full" />
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex items-center gap-4">
          <MagneticButton
            variant="primary"
            onClick={() => handleLinkClick('#demo')}
          >
            <span>Try SocraticAI</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </MagneticButton>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-slate-300 hover:text-white p-2 focus:outline-none"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Animated Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-20 left-4 right-4 glass-card rounded-2xl p-6 border border-white/10 bg-[#0A0A0F]/95 backdrop-blur-2xl shadow-2xl flex flex-col gap-4"
          >
            <div className="pb-3 border-b border-white/10 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">Target Exam:</span>
              <div className="flex gap-1.5">
                {exams.map((ex) => (
                  <button
                    key={ex}
                    onClick={() => setTargetExam(ex)}
                    className={`px-2.5 py-1 rounded text-xs font-mono font-bold ${
                      targetExam === ex ? 'bg-brand-violet text-white' : 'bg-white/5 text-slate-400'
                    }`}
                  >
                    {ex}
                  </button>
                ))}
              </div>
            </div>

            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="text-lg font-medium text-slate-200 hover:text-brand-cyan py-2 border-b border-white/5"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2">
              <MagneticButton
                variant="primary"
                className="w-full"
                onClick={() => handleLinkClick('#demo')}
              >
                <span>Try SocraticAI</span>
                <ArrowRight className="w-4 h-4" />
              </MagneticButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
