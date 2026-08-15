import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, CheckCircle, ScanLine, FileText, ArrowRight, Zap, Camera, Upload, Image as ImageIcon, BookOpen, Info } from 'lucide-react';
import TiltCard from '../components/TiltCard';
import { VISION_PRESETS } from '../data/mockData';
import { useExam } from '../context/ExamContext';

export default function VisionSection() {
  const { targetExam } = useExam();
  const [selectedPresetId, setSelectedPresetId] = useState("projectile");
  const [activeInputMode, setActiveInputMode] = useState("preset"); // "preset", "camera", "upload"
  const [customImage, setCustomImage] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const fileInputRef = useRef(null);

  // Sync preset with active target exam when exam changes
  useEffect(() => {
    if (targetExam === 'NEET UG') {
      setSelectedPresetId('chemistry');
    } else if (targetExam === 'JEE Main') {
      setSelectedPresetId('calculus');
    } else {
      setSelectedPresetId('projectile');
    }
    triggerScanAnimation();
  }, [targetExam]);

  const currentPreset = VISION_PRESETS.find(p => p.id === selectedPresetId) || VISION_PRESETS[0];

  const handleSelectPreset = (presetId) => {
    setActiveInputMode("preset");
    setSelectedPresetId(presetId);
    triggerScanAnimation();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCustomImage(event.target.result);
        setActiveInputMode("upload");
        triggerScanAnimation();
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerScanAnimation = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
    }, 1200);
  };

  return (
    <section id="how-it-works" className="py-24 px-4 md:px-8 relative z-10 bg-bg-card/40 border-y border-white/5">
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
            <Eye className="w-3.5 h-3.5" />
            <span>Multimodal Camera & Vision OCR Engine</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight mb-6"
          >
            From handwriting to <span className="text-gradient-purple-cyan">understanding.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-400"
          >
            Snap a picture with your camera or upload a note from your gallery. SocraticAI parses messy handwriting, vector diagrams, and chemical structures into clear mathematical formulas with plain-English breakdowns.
          </motion.p>
        </div>

        {/* Camera / Upload & Preset Dropdown Selection Bar */}
        <div className="bg-[#08080E] border border-white/10 rounded-2xl p-4 md:p-6 mb-12 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
          
          {/* Left: Dropdown Selector for Sample Notebook Pictures */}
          <div className="w-full md:w-auto flex-1 flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 whitespace-nowrap">
              <ImageIcon className="w-4 h-4 text-brand-cyan" />
              Select Notebook Sample:
            </span>
            
            <select
              value={selectedPresetId}
              onChange={(e) => handleSelectPreset(e.target.value)}
              className="w-full sm:w-auto bg-[#050508] border border-white/15 text-white text-xs font-mono rounded-xl px-4 py-2.5 focus:outline-none focus:border-brand-cyan transition-colors"
            >
              {VISION_PRESETS.map((preset) => (
                <option key={preset.id} value={preset.id}>
                  {preset.title}
                </option>
              ))}
            </select>
          </div>

          {/* Right: Camera Action & Upload Buttons */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              className="hidden"
            />

            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex-1 md:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 hover:border-brand-cyan hover:text-brand-cyan text-slate-200 text-xs font-mono font-semibold transition-all"
            >
              <Upload className="w-4 h-4" />
              <span>Upload Gallery Pic</span>
            </button>

            <button
              onClick={() => {
                setActiveInputMode("camera");
                triggerScanAnimation();
              }}
              className="flex-1 md:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand-violet text-white text-xs font-mono font-semibold shadow-glow-violet hover:bg-brand-purple transition-all"
            >
              <Camera className="w-4 h-4" />
              <span>Click Picture</span>
            </button>
          </div>

        </div>

        {/* Split Screen Multimodal Demonstration */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Simulated Handwritten Notebook / Camera Snapshot */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6"
          >
            <TiltCard className="h-full bg-[#07070A] border-white/10 p-6 relative overflow-hidden flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                  <span className="text-xs font-mono text-slate-400 flex items-center gap-2">
                    <Camera className="w-4 h-4 text-brand-violet" />
                    Input Stream Mode: <strong className="text-brand-cyan uppercase">{activeInputMode}</strong>
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded">
                    {currentPreset.stream}
                  </span>
                </div>

                {/* Notebook / Camera Canvas Container */}
                <div className="relative rounded-xl p-6 bg-[#0E0E14] border border-white/5 font-handwritten text-xl sm:text-2xl text-amber-200/90 leading-relaxed shadow-inner min-h-[260px] flex flex-col justify-center overflow-hidden">
                  
                  {activeInputMode === "upload" && customImage ? (
                    <div className="relative w-full h-48 flex items-center justify-center">
                      <img src={customImage} alt="Uploaded problem" className="max-h-full max-w-full object-contain rounded-lg" />
                    </div>
                  ) : activeInputMode === "camera" ? (
                    <div className="relative w-full h-48 bg-black/60 rounded-lg flex flex-col items-center justify-center border border-brand-cyan/40 text-center p-4">
                      <div className="w-12 h-12 rounded-full bg-brand-cyan/20 text-brand-cyan flex items-center justify-center mb-2 animate-pulse">
                        <Camera className="w-6 h-6" />
                      </div>
                      <span className="text-sm font-mono text-white font-bold">Camera Snapshot Captured!</span>
                      <span className="text-xs font-mono text-slate-400 mt-1">{currentPreset.handwrittenText}</span>
                    </div>
                  ) : (
                    <div>
                      <p className="mb-3 text-cyan-200">
                        {currentPreset.handwrittenText}
                      </p>

                      {selectedPresetId === "projectile" && (
                        <div className="mt-4 flex items-center justify-center py-2 opacity-80">
                          <svg viewBox="0 0 240 70" className="w-full max-w-[240px] h-auto stroke-current text-cyan-400 fill-none stroke-[2]">
                            <path d="M 10,60 Q 120,-10 230,60" strokeDasharray="4 4" />
                            <line x1="0" y1="60" x2="240" y2="60" className="text-slate-500" strokeWidth="1" />
                            <line x1="10" y1="60" x2="50" y2="35" className="text-amber-400" strokeWidth="2" />
                            <circle cx="120" cy="25" r="4" className="fill-brand-cyan" />
                          </svg>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Animated Scanline moving across */}
                  <motion.div
                    animate={{ y: isScanning ? [0, 220, 0] : [0, 220, 0] }}
                    transition={{ duration: isScanning ? 0.6 : 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-transparent via-brand-cyan to-transparent shadow-glow-cyan pointer-events-none"
                  />
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 font-mono">
                <span className="flex items-center gap-1.5 text-brand-cyan">
                  <ScanLine className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
                  {isScanning ? 'Processing image parameters...' : 'Multimodal spatial grid ready'}
                </span>
                <span>Accuracy: 99.4%</span>
              </div>
            </TiltCard>
          </motion.div>

          {/* Right Column: Beautiful Formatted Formula & Student Variable Breakdown */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-6"
          >
            <TiltCard className="h-full bg-[#0A0A12] border-brand-violet/30 p-6 md:p-8 flex flex-col justify-between">
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                  <span className="text-xs font-mono text-brand-cyan font-bold flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    Structured AI Vision Result
                  </span>
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Student Verification ✓
                  </span>
                </div>

                {/* Formatted Math Formula Block */}
                <div className="bg-[#050508] rounded-2xl p-6 border border-brand-violet/40 mb-6 text-center shadow-inner relative overflow-hidden">
                  <div className="text-xs text-brand-purple font-mono uppercase tracking-wider mb-3 flex items-center justify-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Formatted Concept Equation</span>
                  </div>

                  {/* Beautiful Clean Fractional Formula Rendering */}
                  <div className="flex items-center justify-center gap-3 font-mono text-white text-xl sm:text-2xl py-2">
                    <span className="font-bold text-brand-cyan">{currentPreset.displayFormula.left}</span>
                    <span className="text-slate-400 font-bold">=</span>
                    <div className="inline-flex flex-col items-center justify-center text-center">
                      <span className="px-3 pb-1 font-bold text-white border-b-2 border-brand-violet">
                        {currentPreset.displayFormula.numerator}
                      </span>
                      <span className="px-3 pt-1 font-bold text-brand-cyan">
                        {currentPreset.displayFormula.denominator}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Student-Friendly Variable Explanation Breakdown Table */}
                <div className="mb-6">
                  <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-brand-cyan" />
                    <span>What Every Part Means (Student Guide):</span>
                  </div>

                  <div className="space-y-2">
                    {currentPreset.variableBreakdown.map((item, idx) => (
                      <div key={idx} className="bg-white/5 rounded-xl p-3 border border-white/5 flex items-center gap-3 text-xs">
                        <span className="font-mono font-bold text-brand-cyan bg-brand-cyan/10 border border-brand-cyan/20 px-2.5 py-1 rounded min-w-[75px] text-center">
                          {item.symbol}
                        </span>
                        <span className="text-slate-300 font-sans leading-snug">
                          {item.meaning || item.symbolDesc}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Plain-English Explanation */}
                <div className="bg-brand-violet/10 border border-brand-violet/20 rounded-xl p-4">
                  <div className="text-xs font-bold text-white mb-1">
                    Student Physics Intuition:
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                    {currentPreset.studentExplanation}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>OCR Latency: 140ms</span>
                <span className="text-brand-purple">Socratic Diagnostic Active</span>
              </div>
            </TiltCard>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
