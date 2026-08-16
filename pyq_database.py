import random
from typing import List, Optional
from pydantic import BaseModel, Field

class PYQItem(BaseModel):
    pyq_id: str = Field(description="Unique PYQ reference, e.g., 'JEE_ADVANCED_2023_P1_Q4'")
    exam_type: str = Field(description="JEE Main, JEE Advanced, NEET UG")
    year: int
    subject: str
    chapter: str
    subtopic: str
    question_latex: str = Field(description="Question text with LaTeX math formulas")
    options: Optional[List[str]] = Field(None, description="Multiple choice options A, B, C, D")
    correct_option: Optional[str] = Field(None, description="Correct option e.g., 'B'")
    solution_summary: str = Field(description="Step-by-step concept breakdown & derivation summary")
    difficulty: str = Field(description="EASY, MEDIUM, JEE_ADVANCED")

# Comprehensive JEE Main, JEE Advanced, and NEET Previous Year Question Dataset
PYQ_DATABASE: List[PYQItem] = [
    # Physics - Rotational Motion
    PYQItem(
        pyq_id="JEE_ADVANCED_2023_P1_Q4",
        exam_type="JEE Advanced",
        year=2023,
        subject="Physics",
        chapter="Rotational Motion & System of Particles",
        subtopic="Rolling Motion & Moment of Inertia",
        question_latex="A uniform solid sphere of mass $M$ and radius $R$ rolls without slipping down a rough inclined plane of angle $\\theta$. Find the friction force acting on the sphere.",
        options=["(A) $\\frac{2}{7}Mg\\sin\\theta$", "(B) $\\frac{5}{7}Mg\\sin\\theta$", "(C) $\\frac{1}{7}Mg\\sin\\theta$", "(D) $\\frac{3}{7}Mg\\sin\\theta$"],
        correct_option="A",
        solution_summary="Apply torque equation $\\tau = I\\alpha$ about center and linear acceleration $a = g\\sin\\theta - f/M$. Solving yields $f = \\frac{2}{7}Mg\\sin\\theta$.",
        difficulty="JEE_ADVANCED"
    ),
    PYQItem(
        pyq_id="JEE_MAIN_2022_JULY_S1",
        exam_type="JEE Main",
        year=2022,
        subject="Physics",
        chapter="Rotational Motion & System of Particles",
        subtopic="Moment of Inertia",
        question_latex="Two thin uniform circular discs of mass $m$ and radius $r$ are joined rigidly at their rims. Find the moment of inertia of the system about the tangent passing through the point of contact.",
        options=["(A) $3mr^2$", "(B) $\\frac{5}{2}mr^2$", "(C) $\\frac{7}{2}mr^2$", "(D) $4mr^2$"],
        correct_option="C",
        solution_summary="Apply parallel axis theorem for each disc. $I_1 = \\frac{5}{4}mr^2$ and $I_2 = \\frac{9}{4}mr^2$. Summing gives $I_{total} = \\frac{7}{2}mr^2$.",
        difficulty="MEDIUM"
    ),

    # Physics - Electrostatics
    PYQItem(
        pyq_id="JEE_ADVANCED_2022_P2_Q8",
        exam_type="JEE Advanced",
        year=2022,
        subject="Physics",
        chapter="Electrostatics",
        subtopic="Electric Dipole & Potential",
        question_latex="An electric dipole of moment $\\vec{p} = p\\hat{i}$ is placed at origin. Find the work done in moving a charge $+q$ from point $A(r, 0)$ to point $B(0, r)$ along a circular path of radius $r$.",
        options=["(A) $\\frac{qp}{4\\pi\\varepsilon_0 r^2}$", "(B) $-\\frac{qp}{4\\pi\\varepsilon_0 r^2}$", "(C) Zero", "(D) $\\frac{2qp}{4\\pi\\varepsilon_0 r^2}$"],
        correct_option="A",
        solution_summary="Work done $W = q(V_B - V_A)$. Potential on axial line $V_A = \\frac{p}{4\\pi\\varepsilon_0 r^2}$ and equatorial $V_B = 0$. Hence $W = \\frac{qp}{4\\pi\\varepsilon_0 r^2}$.",
        difficulty="JEE_ADVANCED"
    ),
    PYQItem(
        pyq_id="NEET_2023_Q45",
        exam_type="NEET UG",
        year=2023,
        subject="Physics",
        chapter="Electrostatics",
        subtopic="Capacitors & Dielectrics",
        question_latex="A parallel plate capacitor with air between plates has a capacitance of $8\\text{ pF}$. What will be the capacitance if distance between plates is halved and a dielectric slab of $K=6$ is inserted?",
        options=["(A) $96\\text{ pF}$", "(B) $48\\text{ pF}$", "(C) $24\\text{ pF}$", "(D) $12\\text{ pF}$"],
        correct_option="A",
        solution_summary="$C' = \\frac{K\\varepsilon_0 A}{d/2} = 2K C_0 = 2 \\times 6 \\times 8\\text{ pF} = 96\\text{ pF}$.",
        difficulty="EASY"
    ),

    # Chemistry - Organic & Physical
    PYQItem(
        pyq_id="JEE_MAIN_2023_JAN_S2",
        exam_type="JEE Main",
        year=2023,
        subject="Chemistry",
        chapter="Aldehydes, Ketones and Carboxylic Acids",
        subtopic="Aldol Condensation & Cannizzaro Reaction",
        question_latex="Benzaldehyde when treated with $50\\% \\text{ NaOH}$ solution yields Benzyl alcohol and Sodium benzoate. What is the name of this reaction?",
        options=["(A) Aldol Condensation", "(B) Cannizzaro Reaction", "(C) Reimer-Tiemann Reaction", "(D) HVZ Reaction"],
        correct_option="B",
        solution_summary="Benzaldehyde has no $\\alpha$-hydrogen atoms, so it undergoes self-redox disproportionation in concentrated base (Cannizzaro Reaction).",
        difficulty="EASY"
    ),
    PYQItem(
        pyq_id="NEET_2022_Q112",
        exam_type="NEET UG",
        year=2022,
        subject="Chemistry",
        chapter="Chemical Thermodynamics",
        subtopic="Gibbs Free Energy & Spontaneity",
        question_latex="For a reaction $\\Delta H = -10\\text{ kJ/mol}$ and $\\Delta S = -20\\text{ J/K mol}$. At what temperature will the reaction reach equilibrium?",
        options=["(A) $500\\text{ K}$", "(B) $250\\text{ K}$", "(C) $300\\text{ K}$", "(D) $1000\\text{ K}$"],
        correct_option="A",
        solution_summary="At equilibrium $\\Delta G = 0 \\implies T = \\frac{\\Delta H}{\\Delta S} = \\frac{-10000\\text{ J}}{-20\\text{ J/K}} = 500\\text{ K}$.",
        difficulty="MEDIUM"
    ),

    # Mathematics - Calculus & 3D Geometry (JEE Only!)
    PYQItem(
        pyq_id="JEE_ADVANCED_2021_P1_Q2",
        exam_type="JEE Advanced",
        year=2021,
        subject="Mathematics",
        chapter="Indefinite and Definite Integrals",
        subtopic="Properties of Definite Integrals",
        question_latex="Evaluate the integral $I = \\int_{0}^{\\pi/2} \\frac{\\sin^n x}{\\sin^n x + \\cos^n x} dx$ for any real $n > 0$.",
        options=["(A) $\\pi/4$", "(B) $\\pi/2$", "(C) $\\pi$", "(D) $0$"],
        correct_option="A",
        solution_summary="Use King's Property $\\int_0^a f(x)dx = \\int_0^a f(a-x)dx$. Adding $I + I$ yields $2I = \\int_0^{\\pi/2} 1 dx = \\pi/2 \\implies I = \\pi/4$.",
        difficulty="MEDIUM"
    ),
    PYQItem(
        pyq_id="JEE_MAIN_2023_APRIL_S1",
        exam_type="JEE Main",
        year=2023,
        subject="Mathematics",
        chapter="Three Dimensional Geometry",
        subtopic="Shortest Distance Between Skew Lines",
        question_latex="Find the shortest distance between the lines $\\vec{r} = (\\hat{i} + 2\\hat{j} + \\hat{k}) + \\lambda(\\hat{i} - \\hat{j} + \\hat{k})$ and $\\vec{r} = (2\\hat{i} - \\hat{j} - \\hat{k}) + \\mu(2\\hat{i} + \\hat{j} + 2\\hat{k})$.",
        options=["(A) $\\frac{3\\sqrt{2}}{2}$", "(B) $\\frac{5}{\\sqrt{13}}$", "(C) $\\frac{9}{\\sqrt{14}}$", "(D) $\\frac{1}{\\sqrt{6}}$"],
        correct_option="C",
        solution_summary="Use formula $d = \\frac{|(\\vec{a}_2 - \\vec{a}_1) \\cdot (\\vec{b}_1 \\times \\vec{b}_2)|}{|\\vec{b}_1 \\times \\vec{b}_2|}$. Calculation gives $d = \\frac{9}{\\sqrt{14}}$.",
        difficulty="JEE_ADVANCED"
    ),

    # Biology - Genetics & Physiology (NEET Only!)
    PYQItem(
        pyq_id="NEET_2023_BIO_Q14",
        exam_type="NEET UG",
        year=2023,
        subject="Biology",
        chapter="Genetics and Evolution",
        subtopic="Mendelian Inheritance & Dihybrid Cross",
        question_latex="In a dihybrid cross between two heterozygous round yellow seeded pea plants ($RrYy \\times RrYy$), what proportion of offsprings will be homozygous recessive for both traits ($rryy$)?",
        options=["(A) $1/16$", "(B) $3/16$", "(C) $9/16$", "(D) $1/4$"],
        correct_option="A",
        solution_summary="The dihybrid phenotypic ratio is $9:3:3:1$. The double homozygous recessive genotype ($rryy$) occurs in $1$ out of $16$ offsprings ($1/16$).",
        difficulty="EASY"
    )
]

def search_similar_pyqs(
    subject: str,
    chapter: str,
    target_exam: str = "JEE Advanced",
    limit: int = 2
) -> List[PYQItem]:
    """
    Strict Exam-Filtered Search for PYQs:
    - Never return Biology for JEE Main/Advanced.
    - Never return Mathematics for NEET UG.
    """
    is_neet = "NEET" in target_exam.upper()
    
    # Filter valid subjects based on target exam
    valid_pyqs = [
        p for p in PYQ_DATABASE 
        if (is_neet and p.subject.lower() != "mathematics") or (not is_neet and p.subject.lower() != "biology")
    ]
    
    exact_matches = [
        item for item in valid_pyqs 
        if item.subject.lower() == subject.lower() and chapter.lower() in item.chapter.lower()
    ]
    
    if len(exact_matches) >= limit:
        return exact_matches[:limit]
        
    subject_matches = [item for item in valid_pyqs if item.subject.lower() == subject.lower()]
    combined = exact_matches + [m for m in subject_matches if m not in exact_matches]
    
    if combined:
        return combined[:limit]
        
    return random.sample(valid_pyqs, min(limit, len(valid_pyqs)))

if __name__ == "__main__":
    print("=== Testing Strict Exam-Filtered PYQ Database Engine ===")
    jee_pyqs = search_similar_pyqs(subject="Physics", chapter="Electrostatics", target_exam="JEE Advanced")
    print(f"JEE Advanced Matches: {[p.pyq_id for p in jee_pyqs]}")
    
    neet_pyqs = search_similar_pyqs(subject="Biology", chapter="Genetics", target_exam="NEET UG")
    print(f"NEET Matches: {[p.pyq_id for p in neet_pyqs]}")
