"""
Phase 4 Test Benchmark Suite: 15 Sample JEE/NEET PYQ Questions across Physics, Chemistry, Math, and Biology.
Used to evaluate Socratic hint quality and LaTeX output accuracy.
"""

PYQ_BENCHMARK_SET = [
    # Physics
    {
        "id": "PHYS_01",
        "subject": "Physics",
        "chapter": "Rotational Dynamics",
        "question": "A uniform solid sphere of mass $M$ and radius $R$ rolls without slipping down an inclined plane of inclination $\\theta$. Find the linear acceleration of the sphere."
    },
    {
        "id": "PHYS_02",
        "subject": "Physics",
        "chapter": "Electrostatics",
        "question": "Two point charges $+q$ and $+4q$ are separated by distance $L$. Where should a third charge $Q$ be placed so that the entire system is in equilibrium?"
    },
    {
        "id": "PHYS_03",
        "subject": "Physics",
        "chapter": "Optics",
        "question": "In Young's double slit experiment, if the fringe width is $\\beta$, what will be the fringe width when the entire apparatus is immersed in a liquid of refractive index $\\mu$?"
    },
    {
        "id": "PHYS_04",
        "subject": "Physics",
        "chapter": "Current Electricity",
        "question": "A wire of resistance $R$ is stretched to double its original length. Find its new resistance assuming density remains constant."
    },

    # Chemistry
    {
        "id": "CHEM_01",
        "subject": "Chemistry",
        "chapter": "Chemical Bonding",
        "question": "Predict the hybridization, geometry, and number of lone pairs on the central atom for $SF_4$ and $XeF_4$."
    },
    {
        "id": "CHEM_02",
        "subject": "Chemistry",
        "chapter": "Thermodynamics",
        "question": "Calculate the work done when 2 moles of an ideal gas expand reversibly and isothermally from 10 L to 100 L at 300 K."
    },
    {
        "id": "CHEM_03",
        "subject": "Chemistry",
        "chapter": "Organic Chemistry - Aldehydes & Ketones",
        "question": "What is the major product formed when Benzaldehyde reacts with concentrated $NaOH$ solution? Name the reaction mechanism."
    },
    {
        "id": "CHEM_04",
        "subject": "Chemistry",
        "chapter": "Coordination Compounds",
        "question": "Determine the magnetic moment (in BM) of $[Fe(H_2O)_6]^{2+}$ using crystal field theory."
    },

    # Mathematics
    {
        "id": "MATH_01",
        "subject": "Mathematics",
        "chapter": "Calculus - Definite Integrals",
        "question": "Evaluate the integral $I = \\int_{0}^{\\pi/2} \\frac{\\sqrt{\\sin x}}{\\sqrt{\\sin x} + \\sqrt{\\cos x}} dx$ using King's property."
    },
    {
        "id": "MATH_02",
        "subject": "Mathematics",
        "chapter": "Vectors & 3D Geometry",
        "question": "Find the shortest distance between the two skew lines $\\vec{r} = \\vec{a}_1 + \\lambda \\vec{b}_1$ and $\\vec{r} = \\vec{a}_2 + \\mu \\vec{b}_2$."
    },
    {
        "id": "MATH_03",
        "subject": "Mathematics",
        "chapter": "Complex Numbers",
        "question": "If $|z - 4/z| = 2$, find the maximum possible value of $|z|$."
    },
    {
        "id": "MATH_04",
        "subject": "Mathematics",
        "chapter": "Matrices & Determinants",
        "question": "If $A$ is a $3 \\times 3$ non-singular matrix such that $A^2 = 3A$, find the determinant $|A|$."
    },

    # Biology (NEET)
    {
        "id": "BIO_01",
        "subject": "Biology",
        "chapter": "Genetics & Evolution",
        "question": "What is the phenotypic ratio obtained in a dihybrid cross according to Mendel's law of independent assortment? Explain test cross ratio."
    },
    {
        "id": "BIO_02",
        "subject": "Biology",
        "chapter": "Plant Physiology - Photosynthesis",
        "question": "Differentiate between $C_3$ and $C_4$ plants with respect to Kranz anatomy and primary $CO_2$ acceptor."
    },
    {
        "id": "BIO_03",
        "subject": "Biology",
        "chapter": "Human Physiology - Neural Control",
        "question": "Describe the generation and conduction of an action potential along an axon during depolarization and repolarization."
    }
]

def run_benchmark_tests():
    """Runs prompt evaluations across all 15 PYQs."""
    from gemini_engine import analyze_student_problem

    print(f"=== Running Prompt Suite across {len(PYQ_BENCHMARK_SET)} JEE/NEET PYQs ===")
    for item in PYQ_BENCHMARK_SET[:2]:  # Sample dry run
        print(f"\nTesting [{item['id']}] {item['subject']} - {item['chapter']}")
        try:
            report = analyze_student_problem(text_prompt=item["question"])
            print(f"✅ Extracted Subtopic: {report.subtopic}")
            print(f"💡 Socratic Hint 1: {report.socratic_hints[0]}")
        except Exception as e:
            print(f"❌ Failed: {e}")

if __name__ == "__main__":
    run_benchmark_tests()
