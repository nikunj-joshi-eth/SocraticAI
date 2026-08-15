// Exam-Specific Hero Problems
export const HERO_PROBLEMS = {
  "JEE Main": {
    equation: "x² + 5x + 6 = 0",
    topic: "Algebra — Quadratic Equations (JEE Main)",
    steps: [
      {
        id: 1,
        title: "Socratic Hint 01",
        hint: "What two numbers multiply to 6 and add up to 5?",
        badge: "Pattern Recognition",
        type: "guided_question"
      },
      {
        id: 2,
        title: "Socratic Hint 02",
        hint: "Rewrite the middle term 5x as (2x + 3x) and group terms.",
        badge: "Algebraic Restructuring",
        type: "guided_question"
      },
      {
        id: 3,
        title: "Breakthrough",
        hint: "(x + 2)(x + 3) = 0 ⟹ Roots are x = -2 and x = -3",
        badge: "Mastery Achieved",
        type: "solution_reveal"
      }
    ]
  },
  "JEE Advanced": {
    equation: "∫₀^(π/2) (sinⁿ x) / (sinⁿ x + cosⁿ x) dx",
    topic: "Definite Calculus — King's Property (JEE Advanced)",
    steps: [
      {
        id: 1,
        title: "Socratic Hint 01",
        hint: "Apply King's property f(x) ➔ f(a + b - x). What does sin(π/2 - x) become?",
        badge: "Calculus Transformation",
        type: "guided_question"
      },
      {
        id: 2,
        title: "Socratic Hint 02",
        hint: "Notice that swapping sin and cos leaves the denominator unchanged.",
        badge: "Symmetry Exploitation",
        type: "guided_question"
      },
      {
        id: 3,
        title: "Breakthrough",
        hint: "Add original and transformed integrals ⟹ 2I = ∫₀^(π/2) 1 dx ⟹ I = π/4",
        badge: "Mastery Achieved",
        type: "solution_reveal"
      }
    ]
  },
  "NEET UG": {
    equation: "CH₃-CH=CH₂ + HBr ➔ ?",
    topic: "Organic Chemistry — Markovnikov Reaction (NEET UG)",
    steps: [
      {
        id: 1,
        title: "Socratic Hint 01",
        hint: "Where will electrophile H⁺ attack to form the more stable carbocation?",
        badge: "Carbocation Stability",
        type: "guided_question"
      },
      {
        id: 2,
        title: "Socratic Hint 02",
        hint: "Is a 2° carbocation (CH₃-CH⁺-CH₃) more stable than a 1° carbocation?",
        badge: "Hyperconjugation",
        type: "guided_question"
      },
      {
        id: 3,
        title: "Breakthrough",
        hint: "Nucleophilic Br⁻ attacks C2 ⟹ Major Product is 2-Bromopropane!",
        badge: "Mastery Achieved",
        type: "solution_reveal"
      }
    ]
  }
};

// Exam-Specific Guidance Engine Scenarios
export const GUIDANCE_SCENARIOS = {
  "JEE Main": {
    subject: "Algebra — Quadratic Roots",
    problemText: "Find the roots of: x² + 5x + 6 = 0",
    badge: "JEE Main Target",
    hints: [
      {
        level: 1,
        title: "Socratic Hint 01 — Structural Breakdown",
        question: "What operation could help you rewrite this quadratic x² + 5x + 6 = 0?",
        thought: "Identify if factoring or the quadratic formula is easier here.",
        chip: "Factoring Method"
      },
      {
        level: 2,
        title: "Socratic Hint 02 — Product Condition",
        question: "Can you find two numbers whose product is 6?",
        thought: "Possible pairs: (1, 6) or (2, 3) or (-1, -6) or (-2, -3).",
        chip: "Product Check"
      },
      {
        level: 3,
        title: "Socratic Hint 03 — Sum Condition",
        question: "Those two numbers also need to add up to 5.",
        thought: "2 × 3 = 6 AND 2 + 3 = 5!",
        chip: "Sum Check"
      }
    ],
    breakthrough: {
      title: "Cognitive Breakthrough Achieved!",
      mathResult: "(x + 2)(x + 3) = 0 ⟹ Roots are x = -2 and x = -3",
      reward: "+120 Diagnostic XP Earned"
    }
  },
  "JEE Advanced": {
    subject: "Calculus — Definite Integration",
    problemText: "Evaluate I = ∫₀^(π/2) (sinⁿ x) / (sinⁿ x + cosⁿ x) dx",
    badge: "JEE Advanced Target",
    hints: [
      {
        level: 1,
        title: "Socratic Hint 01 — King's Property",
        question: "What property simplifies integrals with symmetric bounds [0, a]?",
        thought: "Try substituting x ➔ (π/2 - x).",
        chip: "f(a - x) Rule"
      },
      {
        level: 2,
        title: "Socratic Hint 02 — Trigo Transformation",
        question: "How does sin(π/2 - x) transform in the integrand?",
        thought: "sin(π/2 - x) = cos(x) and cos(π/2 - x) = sin(x).",
        chip: "Co-Function Identity"
      },
      {
        level: 3,
        title: "Socratic Hint 03 — System Addition",
        question: "If you add original integral I and transformed integral I, what is (sinⁿx + cosⁿx)/(sinⁿx + cosⁿx)?",
        thought: "Integrand simplifies to 1!",
        chip: "Integrand Reduction"
      }
    ],
    breakthrough: {
      title: "Calculus Mastery Achieved!",
      mathResult: "2I = ∫₀^(π/2) 1 dx = π/2 ⟹ I = π/4",
      reward: "+150 Diagnostic XP Earned"
    }
  },
  "NEET UG": {
    subject: "Organic Chemistry — Electrophilic Addition",
    problemText: "Predict major product of Propene (CH₃-CH=CH₂) + HBr",
    badge: "NEET UG Target",
    hints: [
      {
        level: 1,
        title: "Socratic Hint 01 — Electrophile Addition",
        question: "Which carbon will H⁺ attack first to generate the carbocation?",
        thought: "Check C1 vs C2 carbocation stability.",
        chip: "Carbocation Search"
      },
      {
        level: 2,
        title: "Socratic Hint 02 — Hyperconjugation",
        question: "Why is a secondary carbocation CH₃-CH⁺-CH₃ more stable than a primary carbocation?",
        thought: "+I effect and 6 alpha hydrogens stabilize 2° carbocation.",
        chip: "Stability Order"
      },
      {
        level: 3,
        title: "Socratic Hint 03 — Nucleophile Attack",
        question: "Where will Br⁻ attack the 2° carbocation?",
        thought: "Br⁻ attacks C2 to yield Markovnikov product.",
        chip: "Product Formation"
      }
    ],
    breakthrough: {
      title: "NEET Chemistry Mastery Achieved!",
      mathResult: "CH₃-CH=CH₂ + HBr ➔ CH₃-CH(Br)-CH₃ (2-Bromopropane)",
      reward: "+110 Diagnostic XP Earned"
    }
  }
};

export const PROBLEM_CARDS = [
  {
    id: "01",
    stat: "12–24 HOURS",
    title: "Waiting for a doubt",
    description: "Traditional coaching leaves students stuck overnight waiting for doubt sessions, killing momentum and retention.",
    tag: "Traditional Bottleneck",
    accentColor: "from-rose-500/20 to-violet-500/10",
    borderColor: "hover:border-rose-500/40"
  },
  {
    id: "02",
    stat: "FINAL ANSWER",
    title: "Answer dumping",
    description: "Generic AI chatbots copy-paste full step-by-step solutions instantly. You get the answer, but gain zero cognitive muscle.",
    tag: "Passive Learning Trap",
    accentColor: "from-amber-500/20 to-purple-500/10",
    borderColor: "hover:border-amber-500/40"
  },
  {
    id: "03",
    stat: "ONE-SIZE-FITS-ALL",
    title: "No personalization",
    description: "Static question banks give identical difficulty curves to everyone, ignoring concept blindspots and cognitive speed.",
    tag: "Suboptimal Growth",
    accentColor: "from-cyan-500/20 to-violet-500/10",
    borderColor: "hover:border-cyan-500/40"
  }
];

export const VISION_PRESETS = [
  {
    id: "chemistry",
    stream: "NEET UG",
    title: "Sample 1: Electrophilic Addition (Organic Chemistry - NEET UG)",
    handwrittenText: "Propene + HBr → ? Identify Markovnikov major product and carbocation intermediate stability.",
    params: [
      { label: "Reactant", value: "CH₃-CH=CH₂ (Propene)", verified: true },
      { label: "Reagent", value: "HBr (Hydrobromic Acid)", verified: true },
      { label: "Intermediate", value: "2° Carbocation (CH₃-CH⁺-CH₃)", verified: true },
      { label: "Major Product", value: "2-Bromopropane", verified: true }
    ],
    displayFormula: {
      left: "Major Product",
      numerator: "CH₃—CH(Br)—CH₃",
      denominator: "via 2° Carbocation Intermediate"
    },
    variableBreakdown: [
      { symbol: "H⁺ Attack", symbolDesc: "Electrophile H⁺ adds to CH₂ carbon to form more stable 2° carbocation" },
      { symbol: "Br⁻ Attack", symbolDesc: "Nucleophilic Br⁻ attacks carbocation at C2 position" },
      { symbol: "Markovnikov Rule", symbolDesc: "Rich gets richer — H goes to carbon with more hydrogens" }
    ],
    studentExplanation: "Secondary carbocations are more stable than primary carbocations due to hyperconjugation (+I effect of two methyl groups).",
    insight: "Protonation occurs at the less substituted carbon to form the more stable 2° carbocation intermediate prior to bromide nucleophilic attack."
  },
  {
    id: "projectile",
    stream: "JEE Advanced",
    title: "Sample 2: Projectile Kinematics (Physics - JEE / NEET)",
    handwrittenText: "A projectile launched from ground with v₀ = 20 m/s at θ = 30° to horizontal. Find H_max. (g = 9.8 m/s²)",
    params: [
      { label: "Initial Velocity (v₀)", value: "20 m/s", verified: true },
      { label: "Launch Angle (θ)", value: "30°", verified: true },
      { label: "Gravitational Acc. (g)", value: "9.8 m/s²", verified: true },
      { label: "Target Parameter", value: "Max Height (H_max)", verified: true }
    ],
    displayFormula: {
      left: "H_max",
      numerator: "v₀² · sin²(θ)",
      denominator: "2g"
    },
    variableBreakdown: [
      { symbol: "H_max", meaning: "Maximum vertical height reached by the ball (in meters)" },
      { symbol: "v₀", meaning: "Initial speed of projection (20 m/s)" },
      { symbol: "θ", meaning: "Angle with the horizontal ground (30°)" },
      { symbol: "g", meaning: "Downward acceleration due to gravity (9.8 m/s²)" }
    ],
    studentExplanation: "At the highest point, vertical speed becomes zero. The ball converts kinetic energy into potential energy (mgh = ½m v_y²).",
    insight: "The vertical component of velocity decreases linearly to 0 at peak trajectory. Energy conservation dictates kinetic to potential energy conversion."
  },
  {
    id: "calculus",
    stream: "JEE Main",
    title: "Sample 3: Definite Integration (Math - JEE Main)",
    handwrittenText: "Evaluate ∫[0 to π/2] (sin^n x) / (sin^n x + cos^n x) dx using King's Property.",
    params: [
      { label: "Lower Limit (a)", value: "0", verified: true },
      { label: "Upper Limit (b)", value: "π/2", verified: true },
      { label: "Integrand Property", value: "King's Rule f(a+b-x)", verified: true },
      { label: "Symmetry Result", value: "2I = ∫[0 to π/2] 1 dx = π/2", verified: true }
    ],
    displayFormula: {
      left: "I",
      numerator: "∫₀^(π/2) sinⁿ(x) dx",
      denominator: "sinⁿ(x) + cosⁿ(x)"
    },
    variableBreakdown: [
      { symbol: "King's Property", symbolDesc: "∫[a to b] f(x) dx = ∫[a to b] f(a+b-x) dx" },
      { symbol: "sin(π/2 - x)", symbolDesc: "Converts to cos(x)" },
      { symbol: "Symmetry Addition", symbolDesc: "Adding I + I yields 2I = ∫[0 to π/2] 1 dx = π/2 ⟹ I = π/4" }
    ],
    studentExplanation: "King's property flips sin and cos without altering the denominator. Adding original and flipped equations simplifies the integrand to 1.",
    insight: "Applying King's property replaces x with (π/2 - x), swapping sin and cos in the integrand. Adding original and transformed integrals yields a constant 1."
  }
];

export const DEMO_QUESTION = {
  question: "A ball is thrown vertically upward with an initial velocity of 20 m/s. What is its maximum height?",
  subtext: "Neglect air resistance. Take g = 9.8 m/s².",
  options: [
    { id: "A", label: "A. 10.2 m", isCorrect: false },
    { id: "B", label: "B. 20.4 m", isCorrect: true },
    { id: "C", label: "C. 30.6 m", isCorrect: false },
    { id: "D", label: "D. 40.8 m", isCorrect: false }
  ],
  socraticResponses: {
    A: {
      feedback: "Not quite 10.2 m. Let's inspect the vertical motion kinematics equation:",
      hint: "Remember: v² = u² - 2gh. What is the final velocity v at the maximum height point?",
      questionToStudent: "At peak height, does the ball temporarily stop climbing?",
      nextStep: "Try applying u = 20 m/s and v = 0 into v² = u² - 2gh."
    },
    B: {
      feedback: "Spot on! Let me verify why your intuition worked:",
      hint: "At maximum height, vertical velocity v = 0. Using 0 = (20)² - 2(9.8)h ⟹ 19.6h = 400 ⟹ h ≈ 20.41 m.",
      questionToStudent: "Notice how energy conservation (½m u² = mgh) yields the exact same expression h = u² / 2g?",
      nextStep: "You're ready for JEE Advanced multi-concept projectile problems!"
    },
    C: {
      feedback: "30.6 m is higher than the actual peak height. Let's re-check the numbers:",
      hint: "Recall: h_max = u² / (2g). Note that 20² = 400, and 2 × 9.8 = 19.6.",
      questionToStudent: "What is 400 divided by 19.6?",
      nextStep: "Divide 400 by 19.6 and select the closest matching option."
    },
    D: {
      feedback: "40.8 m is double the actual height. Did you forget to divide by 2 in kinetic energy / kinematics?",
      hint: "Recall: h_max = u² / (2g). Check if you omitted the factor of 2 in the denominator: 400 / 9.8 vs 400 / 19.6.",
      questionToStudent: "Can you re-evaluate 400 / (2 × 9.8)?",
      nextStep: "Adjust your calculation and try again!"
    }
  }
};

// Independent Exam Calculations
export const SEPARATE_EXAM_DATA = {
  "JEE Main": {
    examName: "JEE Main Diagnostic Model",
    targetAccuracy: 88,
    recommendedDifficulty: "HARD (Concept Isolation)",
    predictedScore: "245 / 300 (99.4 Percentile)",
    subtopics: [
      { name: "Calculus & Functions", score: 92 },
      { name: "Mechanics & Gravitation", score: 86 },
      { name: "Physical Chemistry", score: 85 },
      { name: "Electromagnetism", score: 89 }
    ]
  },
  "JEE Advanced": {
    examName: "JEE Advanced Diagnostic Model",
    targetAccuracy: 81,
    recommendedDifficulty: "JEE ADVANCED (Multi-Concept Depth)",
    predictedScore: "198 / 360 (AIR < 800 Target)",
    subtopics: [
      { name: "Rotational Dynamics & Fluids", score: 79 },
      { name: "Coordinate Geometry & Conics", score: 83 },
      { name: "Organic Synthesis & Mechanism", score: 82 },
      { name: "Modern Physics & Quantum Optics", score: 80 }
    ]
  },
  "NEET UG": {
    examName: "NEET UG Diagnostic Model",
    targetAccuracy: 94,
    recommendedDifficulty: "NEET SPEED & ACCURACY TARGET",
    predictedScore: "685 / 720 (Target Top GMC)",
    subtopics: [
      { name: "Human Physiology & Genetics", score: 96 },
      { name: "Organic Reaction Mechanisms", score: 92 },
      { name: "Ray & Wave Optics", score: 91 },
      { name: "Plant Diversity & Cell Biology", score: 97 }
    ]
  }
};
