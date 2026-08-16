import React from 'react';
import { motion } from 'framer-motion';
import { useMagnetic } from '../hooks/useMagnetic';

export default function MagneticButton({
  children,
  onClick,
  className = "",
  variant = "primary"
}) {
  const { ref, position } = useMagnetic(0.25);

  const baseStyles = "relative inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 overflow-hidden group cursor-pointer";
  
  const variants = {
    primary: "bg-gradient-to-r from-brand-violet to-brand-purple text-white shadow-glow-violet hover:shadow-lg hover:shadow-brand-violet/50 border border-brand-violet/40 px-7 py-3.5 text-sm md:text-base",
    secondary: "bg-bg-elevated/80 text-slate-200 border border-white/10 hover:border-brand-cyan/40 hover:text-brand-cyan px-6 py-3.5 text-sm md:text-base backdrop-blur-md",
    ghost: "text-slate-300 hover:text-white px-4 py-2 text-sm"
  };

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 200, damping: 15, mass: 0.1 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
      {/* Light sheen effect on hover */}
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
    </motion.button>
  );
}
