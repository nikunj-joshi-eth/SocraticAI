import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, RotateCcw, Lightbulb, CheckCircle2, Target } from 'lucide-react';
import TiltCard from '../components/TiltCard';
import { useExam } from '../context/ExamContext';

// Exam-Specific Daily 5 Tough Question Sets (Strict PCM for JEE, Strict PCB for NEET)
const EXAM_SPECIFIC_DAILY_QUESTIONS = {
  "JEE Advanced": [
    {
      id: 1,
      subject: "Physics",
      exam: "JEE Advanced 2023",
      chapter: "Rotational Dynamics",
      question: "A solid cylinder of mass M and radius R rolls without slipping down a rough incline of angle θ. What is the friction force acting on the cylinder?",
      subtext: "JEE Advanced Physics Challenge:",
      options: [
        { id: "A", text: "(A) f = (1/3) Mg sin θ", isCorrect: true, hint: "Correct! Torque τ = Iα = f R and a = (g sin θ - f/M). Solving yields f = (1/3) Mg sin θ." },
        { id: "B", text: "(B) f = (1/2) Mg sin θ", isCorrect: false, hint: "Check your moment of inertia formula for a cylinder: I = (1/2) M R². Re-evaluate α = a/R." },
        { id: "C", text: "(C) f = (2/7) Mg sin θ", isCorrect: false, hint: "Notice: 2/7 Mg sin θ is for a solid sphere (I = 2/5 M R²), not a cylinder!" },
        { id: "D", text: "(D) f = Mg sin θ", isCorrect: false, hint: "If f = Mg sin θ, net acceleration a = 0, which would mean zero linear motion down the incline." }
      ]
    },
    {
      id: 2,
      subject: "Chemistry",
      exam: "JEE Advanced 2022",
      chapter: "Organic Mechanisms",
      question: "Benzaldehyde is treated with concentrated 50% NaOH solution. What is the major organic product formed?",
      subtext: "JEE Advanced Organic Chemistry Challenge:",
      options: [
        { id: "A", text: "(A) Benzyl Alcohol & Sodium Benzoate", isCorrect: true, hint: "Correct! Benzaldehyde lacks α-hydrogens, undergoing self-redox Cannizzaro reaction." },
        { id: "B", text: "(B) Cinnamic Acid", isCorrect: false, hint: "Cinnamic acid requires reaction with acetic anhydride (Perkin reaction)." },
        { id: "C", text: "(C) Acetophenone", isCorrect: false, hint: "Acetophenone requires Friedel-Crafts acylation of benzene with acetyl chloride." },
        { id: "D", text: "(D) Benzoic Anhydride", isCorrect: false, hint: "Dehydration of benzoic acid is needed to yield benzoic anhydride." }
      ]
    },
    {
      id: 3,
      subject: "Mathematics",
      exam: "JEE Advanced 2023",
      chapter: "Definite Integrals",
      question: "Evaluate the integral I = ∫[0 to π/2] (√sin x / (√sin x + √cos x)) dx.",
      subtext: "JEE Advanced Mathematics Challenge:",
      options: [
        { id: "A", text: "(A) π / 4", isCorrect: true, hint: "Correct! Applying King's Property ∫f(x)dx = ∫f(a-x)dx yields 2I = ∫1 dx = π/2 ⇒ I = π/4." },
        { id: "B", text: "(B) π / 2", isCorrect: false, hint: "Remember that adding I + I gives 2I = π/2. Don't forget to divide by 2 at the end." },
        { id: "C", text: "(C) π", isCorrect: false, hint: "Check the upper limit of integration: π/2, not π." },
        { id: "D", text: "(D) 0", isCorrect: false, hint: "The integrand is strictly positive over [0, π/2], so integral cannot be zero." }
      ]
    },
    {
      id: 4,
      subject: "Physics",
      exam: "JEE Advanced 2021",
      chapter: "Electrostatics",
      question: "Find the work done in moving a charge +q from axial point A(r, 0) to equatorial point B(0, r) of a dipole p.",
      subtext: "JEE Advanced Electrostatics Challenge:",
      options: [
        { id: "A", text: "(A) W = q p / (4πε₀ r²)", isCorrect: true, hint: "Correct! W = q(VB - VA). Potential on axial line VA = p/(4πε₀ r²) and equatorial VB = 0." },
        { id: "B", text: "(B) W = 0", isCorrect: false, hint: "Potential at B is zero, but potential at A is non-zero. W = q(0 - VA) ≠ 0." },
        { id: "C", text: "(C) W = 2 q p / (4πε₀ r²)", isCorrect: false, hint: "Recall potential of dipole drops with 1/r², not 2/r²." },
        { id: "D", text: "(D) W = -q p / (4πε₀ r³)", isCorrect: false, hint: "Electric field varies with 1/r³, but potential varies with 1/r²." }
      ]
    },
    {
      id: 5,
      subject: "Mathematics",
      exam: "JEE Advanced 2023",
      chapter: "3D Geometry",
      question: "Find the shortest distance between skew lines r = (i + 2j + k) + λ(i - j + k) and r = (2i - j - k) + μ(2i + j + 2k).",
      subtext: "JEE Advanced 3D Vectors Challenge:",
      options: [
        { id: "A", text: "(A) 9 / √14", isCorrect: true, hint: "Correct! Using d = |(a₂ - a₁) · (b₁ × b₂)| / |b₁ × b₂|, computation yields 9 / √14." },
        { id: "B", text: "(B) 3√2 / 2", isCorrect: false, hint: "Check vector cross product b₁ × b₂ components." },
        { id: "C", text: "(C) 5 / √13", isCorrect: false, hint: "Verify numerator dot product (a₂ - a₁) · (b₁ × b₂)." },
        { id: "D", text: "(D) 1 / √6", isCorrect: false, hint: "Recalculate magnitude of cross product vector b₁ × b₂." }
      ]
    }
  ],

  "JEE Main": [
    {
      id: 1,
      subject: "Physics",
      exam: "JEE Main 2023",
      chapter: "Current Electricity",
      question: "A wire of resistance R is stretched to 3 times its original length. What will be its new resistance assuming uniform mass density?",
      subtext: "JEE Main Physics Challenge:",
      options: [
        { id: "A", text: "(A) 9 R", isCorrect: true, hint: "Correct! Volume V = A·L is constant. When L' = 3L, A' = A/3. R' = ρ L'/A' = 9 R." },
        { id: "B", text: "(B) 3 R", isCorrect: false, hint: "Remember that stretching a wire decreases its cross-sectional area A!" },
        { id: "C", text: "(C) R / 3", isCorrect: false, hint: "Stretching increases resistance, not decreases it." },
        { id: "D", text: "(D) 6 R", isCorrect: false, hint: "Resistance depends quadratically on length change when volume is conserved (R ∝ L²)." }
      ]
    },
    {
      id: 2,
      subject: "Chemistry",
      exam: "JEE Main 2023",
      chapter: "Chemical Bonding",
      question: "What is the hybridisation and shape of SF₄ molecule according to VSEPR theory?",
      subtext: "JEE Main Chemistry Challenge:",
      options: [
        { id: "A", text: "(A) sp³d, See-saw shape", isCorrect: true, hint: "Correct! SF₄ has 4 bond pairs and 1 lone pair (Steric Number = 5), forming a See-saw geometry." },
        { id: "B", text: "(B) sp³, Tetrahedral", isCorrect: false, hint: "Sulfur has 6 valence electrons. In SF₄, 1 lone pair remains on sulfur." },
        { id: "C", text: "(C) sp³d², Square planar", isCorrect: false, hint: "Square planar is for XeF₄ (4 bond pairs + 2 lone pairs)." },
        { id: "D", text: "(D) sp³d, Trigonal bipyramidal", isCorrect: false, hint: "Trigonal bipyramidal is electron geometry; molecular shape is See-saw due to lone pair." }
      ]
    },
    {
      id: 3,
      subject: "Mathematics",
      exam: "JEE Main 2022",
      chapter: "Matrices & Determinants",
      question: "If A is a 3 × 3 matrix with |A| = 4, find the value of |adj(A)|.",
      subtext: "JEE Main Mathematics Challenge:",
      options: [
        { id: "A", text: "(A) 16", isCorrect: true, hint: "Correct! Property |adj(A)| = |A|^(n-1). For n=3, |adj(A)| = 4^(3-1) = 4² = 16." },
        { id: "B", text: "(B) 64", isCorrect: false, hint: "64 is |A|^n = 4³. The formula uses (n-1) exponent." },
        { id: "C", text: "(C) 4", isCorrect: false, hint: "|adj(A)| is equal to |A| only for 2 × 2 matrices." },
        { id: "D", text: "(D) 12", isCorrect: false, hint: "Recall exponent rule: |A|^(n-1)." }
      ]
    },
    {
      id: 4,
      subject: "Physics",
      exam: "JEE Main 2023",
      chapter: "Kinematics in 1D",
      question: "A ball dropped from height H rebounds to a height H/2. Find the total distance traveled before coming to rest.",
      subtext: "JEE Main Physics Challenge:",
      options: [
        { id: "A", text: "(A) 3 H", isCorrect: true, hint: "Correct! Total Distance = H + 2(H/2 + H/4 + H/8 + ...) = H + 2H = 3 H." },
        { id: "B", text: "(B) 2 H", isCorrect: false, hint: "Remember the ball travels up AND down on each rebound." },
        { id: "C", text: "(C) 1.5 H", isCorrect: false, hint: "Don't forget the infinite geometric series sum S = a / (1 - r)." },
        { id: "D", text: "(D) 4 H", isCorrect: false, hint: "Sum the infinite series for rebounds: r = 1/2." }
      ]
    },
    {
      id: 5,
      subject: "Chemistry",
      exam: "JEE Main 2022",
      chapter: "Hydrocarbons",
      question: "What is the major product when propene reacts with HBr in the presence of benzoyl peroxide?",
      subtext: "JEE Main Chemistry Challenge:",
      options: [
        { id: "A", text: "(A) 1-Bromopropane", isCorrect: true, hint: "Correct! Peroxide effect (Kharasch effect) leads to Anti-Markovnikov addition of HBr." },
        { id: "B", text: "(B) 2-Bromopropane", isCorrect: false, hint: "2-Bromopropane is formed without peroxide (Markovnikov addition)." },
        { id: "C", text: "(C) 1,2-Dibromopropane", isCorrect: false, hint: "Addition of Br₂ yields dibromopropane, not HBr." },
        { id: "D", text: "(D) Propane", isCorrect: false, hint: "Peroxide initiates free radical addition, not reduction to alkane." }
      ]
    }
  ],

  "NEET UG": [
    {
      id: 1,
      subject: "Biology",
      exam: "NEET UG 2023",
      chapter: "Genetics & Evolution",
      question: "In a dihybrid cross between RrYy × RrYy, what proportion of offspring will be homozygous recessive for both traits (rryy)?",
      subtext: "NEET Biology Challenge:",
      options: [
        { id: "A", text: "(A) 1 / 16", isCorrect: true, hint: "Correct! In 9:3:3:1 Mendelian ratio, the double homozygous recessive genotype rryy occurs in 1/16 offspring." },
        { id: "B", text: "(B) 3 / 16", isCorrect: false, hint: "3/16 represents single recessive phenotypes (R_yy or rrY_)." },
        { id: "C", text: "(C) 9 / 16", isCorrect: false, hint: "9/16 represents double dominant phenotype (R_Y_)." },
        { id: "D", text: "(D) 1 / 4", isCorrect: false, hint: "1/4 is the monohybrid recessive phenotypic ratio." }
      ]
    },
    {
      id: 2,
      subject: "Biology",
      exam: "NEET UG 2022",
      chapter: "Plant Physiology",
      question: "Which of the following plants exhibits Kranz anatomy in its leaves for C₄ photosynthesis?",
      subtext: "NEET Biology Challenge:",
      options: [
        { id: "A", text: "(A) Maize (Zea mays) & Sugarcane", isCorrect: true, hint: "Correct! C₄ plants like Maize and Sugarcane possess Kranz anatomy around bundle sheath cells." },
        { id: "B", text: "(B) Wheat & Rice", isCorrect: false, hint: "Wheat and Rice are C₃ plants without Kranz anatomy." },
        { id: "C", text: "(C) Mango & Sunflower", isCorrect: false, hint: "Mango and Sunflower are typical C₃ dicot plants." },
        { id: "D", text: "(D) Pea & Beans", isCorrect: false, hint: "Legumes are C₃ plants utilizing the Calvin cycle only." }
      ]
    },
    {
      id: 3,
      subject: "Biology",
      exam: "NEET UG 2023",
      chapter: "Human Physiology",
      question: "What does the QRS complex represent in a standard Electrocardiogram (ECG)?",
      subtext: "NEET Biology Challenge:",
      options: [
        { id: "A", text: "(A) Depolarization of the ventricles", isCorrect: true, hint: "Correct! QRS complex represents ventricular depolarization, triggering ventricular contraction." },
        { id: "B", text: "(B) Depolarization of the atria", isCorrect: false, hint: "P-wave represents atrial depolarization." },
        { id: "C", text: "(C) Repolarization of the ventricles", isCorrect: false, hint: "T-wave represents ventricular repolarization." },
        { id: "D", text: "(D) Repolarization of the atria", isCorrect: false, hint: "Atrial repolarization is masked inside the QRS complex." }
      ]
    },
    {
      id: 4,
      subject: "Physics",
      exam: "NEET UG 2022",
      chapter: "Ray Optics",
      question: "A ray of light is incident at an angle of 60° on one face of a 60° prism. If it suffers minimum deviation, what is angle of refraction inside the prism?",
      subtext: "NEET Physics Challenge:",
      options: [
        { id: "A", text: "(A) 30°", isCorrect: true, hint: "Correct! At minimum deviation r₁ = r₂ = A/2 = 60°/2 = 30°." },
        { id: "B", text: "(B) 45°", isCorrect: false, hint: "Formula at minimum deviation: r = A/2." },
        { id: "C", text: "(C) 60°", isCorrect: false, hint: "60° is the prism angle A, not the internal refraction angle r." },
        { id: "D", text: "(D) 15°", isCorrect: false, hint: "Re-evaluate r = A / 2." }
      ]
    },
    {
      id: 5,
      subject: "Chemistry",
      exam: "NEET UG 2023",
      chapter: "Thermodynamics",
      question: "For a process at constant T and P, under what condition is a chemical reaction spontaneous?",
      subtext: "NEET Chemistry Challenge:",
      options: [
        { id: "A", text: "(A) ΔG < 0 (Negative)", isCorrect: true, hint: "Correct! Gibbs free energy change ΔG = ΔH - TΔS must be negative for spontaneity." },
        { id: "B", text: "(B) ΔG > 0 (Positive)", isCorrect: false, hint: "ΔG > 0 indicates a non-spontaneous process." },
        { id: "C", text: "(C) ΔG = 0", isCorrect: false, hint: "ΔG = 0 indicates state of chemical equilibrium." },
        { id: "D", text: "(D) ΔH = 0", isCorrect: false, hint: "Spontaneity depends on net Gibbs energy change ΔG, not ΔH alone." }
      ]
    }
  ]
};

export default function InteractiveDemoSection() {
  const { targetExam } = useExam();
  
  // Pick active exam question set (Guarantees STRICT PCM for JEE, STRICT PCB for NEET!)
  const activeExamKey = targetExam.includes('NEET') 
    ? 'NEET UG' 
    : (targetExam.includes('Advanced') ? 'JEE Advanced' : 'JEE Main');
    
  const currentQuestionSet = EXAM_SPECIFIC_DAILY_QUESTIONS[activeExamKey];

  const [activeQuestionIdx, setActiveQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  // Reset index & option when target exam changes
  useEffect(() => {
    setActiveQuestionIdx(0);
    setSelectedOption(null);
  }, [targetExam]);

  const currentQ = currentQuestionSet[activeQuestionIdx] || currentQuestionSet[0];

  const handleSelectOption = (optionId) => {
    setSelectedOption(optionId);
  };

  const handleNextQuestion = (nextIdx) => {
    setActiveQuestionIdx(nextIdx);
    setSelectedOption(null);
  };

  const handleReset = () => {
    setSelectedOption(null);
  };

  return (
    <section id="demo" className="py-24 px-4 md:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-violet/10 border border-brand-violet/30 text-brand-cyan text-xs font-semibold tracking-wider uppercase mb-4 shadow-glow-violet"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Daily 5 Tough Questions Challenge — {activeExamKey}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight mb-6"
          >
            Daily Interactive <span className="text-gradient-animated">Playground</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-400"
          >
            Curated 5 daily questions for <strong className="text-brand-cyan">{activeExamKey}</strong> aspirants. Select any option to test live Socratic reasoning!
          </motion.p>
        </div>

        {/* 5 Questions Switcher Bar */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-8 overflow-x-auto py-2">
          {currentQuestionSet.map((q, idx) => (
            <button
              key={q.id}
              onClick={() => handleNextQuestion(idx)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all ${
                activeQuestionIdx === idx
                  ? 'bg-brand-violet text-white border border-brand-cyan shadow-glow-violet scale-105'
                  : 'bg-[#090912] text-slate-400 border border-white/10 hover:text-white hover:bg-white/5'
              }`}
            >
              Q{idx + 1}: {q.subject}
            </button>
          ))}
        </div>

        {/* Live Question Card */}
        <div className="max-w-4xl mx-auto">
          <TiltCard className="bg-[#090912] border-brand-violet/30 p-6 md:p-10 shadow-2xl relative">
            
            {/* Question Top Metadata */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <span className="text-xs font-mono text-brand-cyan font-semibold flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-brand-cyan" />
                {currentQ.subject} — {currentQ.chapter} ({currentQ.exam})
              </span>
              <button
                onClick={handleReset}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>

            {/* Question Statement */}
            <div className="mb-8">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 leading-snug">
                "{currentQ.question}"
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 font-mono">
                {currentQ.subtext}
              </p>
            </div>

            {/* 4 Options Grid (A, B, C, D) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {currentQ.options.map((opt) => {
                const isSelected = selectedOption === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(opt.id)}
                    className={`p-5 rounded-xl border text-left font-mono font-bold text-base md:text-lg transition-all duration-300 relative overflow-hidden ${
                      isSelected
                        ? opt.isCorrect
                          ? 'bg-emerald-500/20 border-emerald-500 text-white shadow-glow-emerald'
                          : 'bg-brand-violet/25 border-brand-cyan text-white shadow-glow-cyan'
                        : 'bg-[#050508] border-white/10 text-slate-300 hover:border-white/30 hover:bg-white/5'
                    }`}
                  >
                    <span>{opt.text}</span>
                  </button>
                );
              })}
            </div>

            {/* Socratic Feedback Box */}
            {selectedOption && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 rounded-xl bg-brand-violet/15 border border-brand-cyan/40 backdrop-blur-xl flex items-start gap-4"
              >
                <Lightbulb className="w-6 h-6 text-brand-cyan shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">
                    Socratic AI Feedback:
                  </h4>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {currentQ.options.find(o => o.id === selectedOption)?.hint}
                  </p>
                </div>
              </motion.div>
            )}
          </TiltCard>
        </div>
      </div>
    </section>
  );
}
