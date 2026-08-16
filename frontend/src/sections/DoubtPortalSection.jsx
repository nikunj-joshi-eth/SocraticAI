import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Camera, Upload, X, CheckCircle2, FileJson, Sparkles, BookOpen, Layers, HelpCircle, Download } from 'lucide-react';
import TiltCard from '../components/TiltCard';
import MagneticButton from '../components/MagneticButton';
import { useExam } from '../context/ExamContext';
import chaptersData from '../data/chaptersData.json';

export default function DoubtPortalSection() {
  const { targetExam, setTargetExam } = useExam();

  const [selectedSubject, setSelectedSubject] = useState('Physics');
  const [selectedClass, setSelectedClass] = useState('11');
  const [selectedChapter, setSelectedChapter] = useState('');
  const [selectedSubtopic, setSelectedSubtopic] = useState('');
  const [errorTag, setErrorTag] = useState('Conceptual Blindspot');
  const [questionText, setQuestionText] = useState('');

  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedResult, setSubmittedResult] = useState(null);
  const [showExportModal, setShowExportModal] = useState(false);

  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const taxonomy = chaptersData.JEE_NEET_Exhaustive_Syllabus_Taxonomy;

  // Filter available subjects based on target exam (Hide Math if NEET!)
  const availableSubjects = targetExam.includes('NEET')
    ? ['Physics', 'Chemistry', 'Biology']
    : ['Physics', 'Chemistry', 'Mathematics'];

  // Keep subject valid when exam changes
  useEffect(() => {
    if (targetExam.includes('NEET') && selectedSubject === 'Mathematics') {
      setSelectedSubject('Physics');
    }
  }, [targetExam, selectedSubject]);

  // Filter available chapters based on Subject and Class
  const chaptersForSubjectAndClass = taxonomy[selectedSubject]
    ? taxonomy[selectedSubject].filter(item => item.class === selectedClass)
    : [];

  // Reset chapter & subtopic when subject or class changes
  useEffect(() => {
    if (chaptersForSubjectAndClass.length > 0) {
      setSelectedChapter(chaptersForSubjectAndClass[0].chapter);
    } else {
      setSelectedChapter('');
    }
  }, [selectedSubject, selectedClass, targetExam]);

  // Find subtopics for selected chapter
  const currentChapterObj = chaptersForSubjectAndClass.find(c => c.chapter === selectedChapter);
  const availableSubtopics = currentChapterObj ? currentChapterObj.subtopics : [];

  useEffect(() => {
    if (availableSubtopics.length > 0) {
      setSelectedSubtopic(availableSubtopics[0]);
    } else {
      setSelectedSubtopic('');
    }
  }, [selectedChapter]);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedResult({
        ticketId: `SOC-${Math.floor(100000 + Math.random() * 900000)}`,
        exam: targetExam,
        subject: selectedSubject,
        chapter: selectedChapter,
        subtopic: selectedSubtopic,
        errorTag: errorTag,
        diagnostic: {
          conceptStatus: "Diagnostic Telemetry Logged",
          suggestedHint: `Review core principles of ${selectedChapter}. Focus on ${selectedSubtopic}.`,
          nextQuestionDifficulty: "Calibrated for " + targetExam
        }
      });
    }, 1000);
  };

  const handleExportJSON = () => {
    const payload = {
      timestamp: new Date().toISOString(),
      studentSession: {
        exam: targetExam,
        subject: selectedSubject,
        class: selectedClass,
        chapter: selectedChapter,
        subtopic: selectedSubtopic,
        errorTag: errorTag,
        doubtText: questionText,
        hasAttachment: !!imagePreview
      }
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(payload, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `socratic_doubt_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <section id="doubt-portal" className="py-24 px-4 md:px-8 relative z-10 bg-bg-card/40 border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-violet/10 border border-brand-violet/30 text-brand-cyan text-xs font-semibold tracking-wider uppercase mb-4 shadow-glow-violet"
          >
            <Layers className="w-3.5 h-3.5 text-brand-cyan" />
            <span>React Doubt Submission & Diagnostic Portal</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight mb-6"
          >
            Submit a Doubt & <span className="text-gradient-animated">Get Socratic Diagnosis.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-base sm:text-lg text-slate-400"
          >
            Select your syllabus chapter, attach notebook photos, and submit for instant AI diagnostic reasoning.
          </motion.p>
        </div>

        {/* Main Portal Container */}
        <div className="max-w-4xl mx-auto">
          <TiltCard className="bg-[#08080E] border-brand-violet/30 p-6 md:p-10 shadow-2xl relative">
            
            {/* Top Action Bar */}
            <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-8">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full bg-brand-cyan animate-pulse" />
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  Syllabus Taxonomy Connected
                </span>
              </div>
              
              <button
                onClick={() => setShowExportModal(true)}
                className="text-xs font-mono text-slate-300 hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:border-brand-cyan transition-all"
              >
                <FileJson className="w-3.5 h-3.5 text-brand-cyan" />
                <span>Export Data Specs</span>
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleFormSubmit} className="space-y-8">
              
              {/* STEP 1: Syllabus Cascade Selectors */}
              <div>
                <div className="text-xs font-mono font-bold text-brand-cyan uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-brand-cyan/20 border border-brand-cyan/40 text-brand-cyan flex items-center justify-center text-[10px]">1</span>
                  Select Syllabus & Chapter Context
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                  {/* Exam Target */}
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">Target Exam *</label>
                    <select
                      value={targetExam}
                      onChange={(e) => setTargetExam(e.target.value)}
                      className="w-full bg-[#050508] border border-white/15 text-white text-xs font-mono rounded-xl p-3 focus:outline-none focus:border-brand-cyan"
                    >
                      <option value="JEE Main">JEE Main</option>
                      <option value="JEE Advanced">JEE Advanced</option>
                      <option value="NEET UG">NEET UG</option>
                    </select>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">Subject *</label>
                    <select
                      value={selectedSubject}
                      onChange={(e) => setSelectedSubject(e.target.value)}
                      className="w-full bg-[#050508] border border-white/15 text-white text-xs font-mono rounded-xl p-3 focus:outline-none focus:border-brand-cyan"
                    >
                      {availableSubjects.map(subj => (
                        <option key={subj} value={subj}>{subj}</option>
                      ))}
                    </select>
                  </div>

                  {/* Class */}
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">Class Level *</label>
                    <select
                      value={selectedClass}
                      onChange={(e) => setSelectedClass(e.target.value)}
                      className="w-full bg-[#050508] border border-white/15 text-white text-xs font-mono rounded-xl p-3 focus:outline-none focus:border-brand-cyan"
                    >
                      <option value="11">Class 11</option>
                      <option value="12">Class 12</option>
                    </select>
                  </div>
                </div>

                {/* Chapter & Subtopic Selectors */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">Chapter *</label>
                    <select
                      value={selectedChapter}
                      onChange={(e) => setSelectedChapter(e.target.value)}
                      className="w-full bg-[#050508] border border-white/15 text-white text-xs font-mono rounded-xl p-3 focus:outline-none focus:border-brand-cyan"
                    >
                      {chaptersForSubjectAndClass.map(ch => (
                        <option key={ch.chapter} value={ch.chapter}>{ch.chapter}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">Subtopic *</label>
                    <select
                      value={selectedSubtopic}
                      onChange={(e) => setSelectedSubtopic(e.target.value)}
                      className="w-full bg-[#050508] border border-white/15 text-white text-xs font-mono rounded-xl p-3 focus:outline-none focus:border-brand-cyan"
                    >
                      {availableSubtopics.map(sub => (
                        <option key={sub} value={sub}>{sub}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* STEP 2: Camera & Notebook Attachment */}
              <div>
                <div className="text-xs font-mono font-bold text-brand-cyan uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-brand-cyan/20 border border-brand-cyan/40 text-brand-cyan flex items-center justify-center text-[10px]">2</span>
                  Attach Notebook Photo / Camera Snapshot
                </div>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />

                <input
                  type="file"
                  ref={cameraInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                />

                {!imagePreview ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="p-6 rounded-2xl bg-[#050508] border border-dashed border-white/20 hover:border-brand-cyan text-center flex flex-col items-center justify-center gap-2 transition-all group"
                    >
                      <Upload className="w-6 h-6 text-slate-400 group-hover:text-brand-cyan transition-colors" />
                      <span className="text-xs font-mono font-bold text-slate-300">Upload Image File</span>
                      <span className="text-[10px] text-slate-500">PNG, JPG up to 10MB</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => cameraInputRef.current?.click()}
                      className="p-6 rounded-2xl bg-[#050508] border border-dashed border-white/20 hover:border-brand-violet text-center flex flex-col items-center justify-center gap-2 transition-all group"
                    >
                      <Camera className="w-6 h-6 text-slate-400 group-hover:text-brand-purple transition-colors" />
                      <span className="text-xs font-mono font-bold text-slate-300">Use Camera Snapshot</span>
                      <span className="text-[10px] text-slate-500">Click to snap photo</span>
                    </button>
                  </div>
                ) : (
                  <div className="relative bg-[#050508] border border-white/10 rounded-2xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <img src={imagePreview} alt="Doubt notebook attachment" className="w-16 h-16 object-cover rounded-xl border border-white/10" />
                      <div>
                        <div className="text-xs font-mono font-bold text-white">Notebook Photo Attached</div>
                        <div className="text-[10px] font-mono text-emerald-400">Ready for Multimodal Vision OCR</div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setImagePreview(null)}
                      className="p-2 rounded-xl bg-white/5 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* STEP 3: Question Text & Error Tag */}
              <div>
                <div className="text-xs font-mono font-bold text-brand-cyan uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-brand-cyan/20 border border-brand-cyan/40 text-brand-cyan flex items-center justify-center text-[10px]">3</span>
                  Doubt Statement & Error Classification
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">Question / Doubt Description</label>
                    <textarea
                      rows={3}
                      value={questionText}
                      onChange={(e) => setQuestionText(e.target.value)}
                      placeholder="Type your question or specify where you got stuck..."
                      className="w-full bg-[#050508] border border-white/15 text-white text-xs font-sans rounded-xl p-3.5 focus:outline-none focus:border-brand-cyan"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">Suspected Error Type</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {['Conceptual Blindspot', 'Calculation Slip', 'Speed Bottleneck', 'Formula Amnesia'].map(tag => (
                        <button
                          type="button"
                          key={tag}
                          onClick={() => setErrorTag(tag)}
                          className={`py-2 px-3 rounded-xl text-xs font-mono font-bold transition-all ${
                            errorTag === tag
                              ? 'bg-brand-violet text-white shadow-glow-violet'
                              : 'bg-[#050508] text-slate-400 border border-white/10 hover:text-white'
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-white/10 flex justify-end">
                <MagneticButton
                  variant="primary"
                  className="px-8 py-3.5"
                >
                  <span>{isSubmitting ? "Processing Diagnostic..." : "Submit Doubt for Diagnosis ➔"}</span>
                </MagneticButton>
              </div>

            </form>

            {/* Diagnostic Result Modal */}
            <AnimatePresence>
              {submittedResult && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="mt-8 bg-emerald-500/10 border border-emerald-500/40 rounded-2xl p-6 relative backdrop-blur-xl"
                >
                  <div className="flex items-center justify-between mb-4 border-b border-emerald-500/20 pb-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      <span className="text-sm font-mono font-bold text-white">
                        Diagnostic Ticket #{submittedResult.ticketId} Created!
                      </span>
                    </div>
                    <button
                      onClick={() => setSubmittedResult(null)}
                      className="text-xs text-slate-400 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono mb-4">
                    <div>
                      <span className="text-slate-400 block">Exam Context:</span>
                      <span className="text-white font-bold">{submittedResult.exam} — {submittedResult.subject}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Chapter:</span>
                      <span className="text-brand-cyan font-bold">{submittedResult.chapter}</span>
                    </div>
                  </div>

                  <div className="bg-[#050508] rounded-xl p-4 border border-white/10 text-xs font-sans">
                    <strong className="text-emerald-400 block font-mono mb-1">Socratic AI Next Action:</strong>
                    <p className="text-slate-200">{submittedResult.diagnostic.suggestedHint}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </TiltCard>
        </div>

      </div>

      {/* Export Data Specs Modal */}
      <AnimatePresence>
        {showExportModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="max-w-xl w-full bg-[#0A0A12] border border-brand-violet/40 rounded-3xl p-6 shadow-2xl relative"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                <span className="text-sm font-mono font-bold text-white flex items-center gap-2">
                  <FileJson className="w-4 h-4 text-brand-cyan" />
                  Backend Export Data Schema
                </span>
                <button
                  onClick={() => setShowExportModal(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="bg-[#050508] rounded-xl p-4 font-mono text-xs text-brand-cyan overflow-x-auto max-h-60 mb-6 border border-white/10">
                <pre>{JSON.stringify({
                  exam: targetExam,
                  subject: selectedSubject,
                  class: selectedClass,
                  chapter: selectedChapter,
                  subtopic: selectedSubtopic,
                  errorTag: errorTag,
                  questionText: questionText || "Sample question statement"
                }, null, 2)}</pre>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={handleExportJSON}
                  className="px-4 py-2 rounded-xl bg-brand-violet text-white text-xs font-mono font-bold flex items-center gap-2 shadow-glow-violet"
                >
                  <Download className="w-4 h-4" />
                  <span>Download JSON Payload</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
