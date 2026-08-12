// ==========================================================================
// JEE & NEET Exclusive Academic Data Store
// ==========================================================================
const ACADEMIC_DATA = {
  "JEE Main": {
    "Physics": [
      "Electrostatics & Gauss Law",
      "Capacitors & Dielectrics",
      "Current Electricity & Circuits",
      "Magnetic Effects of Current & Magnetism",
      "Electromagnetic Induction & AC",
      "Ray Optics & Optical Instruments",
      "Wave Optics & Physical Optics",
      "Kinematics (1D & 2D Motion)",
      "Laws of Motion & Friction",
      "Work, Energy & Power",
      "Center of Mass & Rigid Body Dynamics (Rotation)",
      "Gravitation & Kepler's Laws",
      "Properties of Solids & Fluids",
      "Thermodynamics & Kinetic Theory of Gases",
      "Oscillations (SHM) & Waves",
      "Modern Physics & Nuclear Physics",
      "Semiconductors & Experimental Physics"
    ],
    "Chemistry": [
      "Physical Chemistry: Mole Concept & Redox",
      "Physical Chemistry: Atomic Structure",
      "Physical Chemistry: Chemical & Ionic Equilibrium",
      "Physical Chemistry: Electrochemistry",
      "Physical Chemistry: Chemical Kinetics",
      "Physical Chemistry: Thermodynamics & Energetics",
      "Physical Chemistry: Solutions & Colligative Properties",
      "Organic Chemistry: General Organic Chemistry (GOC)",
      "Organic Chemistry: Reaction Mechanisms & Hydrocarbons",
      "Organic Chemistry: Haloalkanes & Haloarenes",
      "Organic Chemistry: Alcohols, Phenols & Ethers",
      "Organic Chemistry: Aldehydes, Ketones & Carboxylic Acids",
      "Organic Chemistry: Amines & Biomolecules",
      "Inorganic Chemistry: Periodic Table & Bonding",
      "Inorganic Chemistry: Coordination Compounds",
      "Inorganic Chemistry: p-Block Elements",
      "Inorganic Chemistry: d- and f-Block Elements"
    ],
    "Mathematics": [
      "Quadratic Equations & Complex Numbers",
      "Matrices & Determinants",
      "Permutations, Combinations & Probability",
      "Differential Calculus: Limits, Continuity & Differentiability",
      "Differential Calculus: Application of Derivatives (AOD)",
      "Integral Calculus: Indefinite & Definite Integrals",
      "Integral Calculus: Differential Equations & Area Under Curves",
      "Vector Algebra & 3D Geometry",
      "Sequences, Series & Binomial Theorem",
      "Trigonometric Functions & Equations",
      "Inverse Trigonometric Functions",
      "Coordinate Geometry: Straight Lines & Circles",
      "Coordinate Geometry: Conic Sections (Parabola, Ellipse, Hyperbola)"
    ]
  },
  "JEE Advanced": {
    "Physics": [
      "Advanced Mechanics & Rotational Motion",
      "Electrostatics & Potential Theory",
      "Capacitance & Complex Circuit Analysis",
      "Electromagnetism & Charged Particle Motion",
      "Electromagnetic Induction & Mutual Inductance",
      "Geometrical & Wave Optics",
      "Thermal Physics & Heat Transfer",
      "Fluid Dynamics & Viscosity",
      "Wave Motion, Beats & Doppler Effect",
      "Atomic, Nuclear & Modern Physics"
    ],
    "Chemistry": [
      "Advanced GOC & Stereochemistry",
      "Organic Synthesis & Named Reactions",
      "Ionic Equilibrium & Buffer Solutions",
      "Thermodynamics & Electrochemistry Numericals",
      "Coordination Chemistry & Isomerism",
      "Qualitative Inorganic Analysis (Salt Analysis)",
      "Chemical Kinetics & Reaction Rates"
    ],
    "Mathematics": [
      "Advanced Calculus & Definite Integrals",
      "Complex Numbers & Geometry in Argand Plane",
      "Vectors & 3D Lines/Planes",
      "Permutations, Combinations & Advanced Probability",
      "Conic Sections & Tangents/Normals",
      "Matrices, Determinants & System of Linear Equations",
      "Differential Equations & Applications"
    ]
  },
  "NEET Medical": {
    "Physics": [
      "Mechanics: Kinematics & Laws of Motion",
      "Mechanics: Work, Energy, Power & Rotation",
      "Gravitation & Mechanical Properties of Matter",
      "Thermodynamics, Heat Transfer & KTG",
      "Oscillations & Sound Waves",
      "Electrostatics, Capacitors & Current Electricity",
      "Magnetic Effects of Current & Magnetism",
      "EMI & Alternating Current",
      "Ray Optics & Wave Optics",
      "Modern Physics, Atoms & Nuclei",
      "Semiconductor Electronics"
    ],
    "Chemistry": [
      "Physical Chemistry: Mole Concept & Atomic Structure",
      "Physical Chemistry: Equilibrium (Chemical & Ionic)",
      "Physical Chemistry: Thermodynamics & Kinetics",
      "Physical Chemistry: Electrochemistry & Solutions",
      "Organic Chemistry: GOC, Hydrocarbons & Haloalkanes",
      "Organic Chemistry: Oxygen & Nitrogen Containing Compounds",
      "Organic Chemistry: Biomolecules & Polymers",
      "Inorganic Chemistry: Chemical Bonding & Periodic Table",
      "Inorganic Chemistry: Coordination Compounds & Metallurgy",
      "Inorganic Chemistry: p-Block, d- & f-Block Elements"
    ],
    "Biology (Botany & Zoology)": [
      "Botany: Cell Structure, Cell Cycle & Biomolecules",
      "Botany: Plant Physiology (Photosynthesis, Respiration)",
      "Botany: Plant Growth & Development",
      "Botany: Sexual Reproduction in Flowering Plants",
      "Botany: Genetics & Principles of Inheritance",
      "Botany: Molecular Basis of Inheritance",
      "Botany: Biotechnology - Principles & Applications",
      "Botany: Ecology, Ecosystems & Biodiversity",
      "Zoology: Human Physiology (Digestion, Breathing, Circulation)",
      "Zoology: Human Physiology (Excretion, Locomotion, Nervous System)",
      "Zoology: Human Reproduction & Reproductive Health",
      "Zoology: Animal Kingdom & Structural Organisation",
      "Zoology: Human Health & Diseases",
      "Zoology: Evolution & Origin of Life"
    ]
  }
};

// Canvas State Variables
let currentImage = null;
let rotationAngle = 0;
let isDrawing = false;
let drawings = [];
let currentStroke = [];

// ==========================================================================
// Initializer
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initAcademicCascades();
  initPhotoStudio();
  initFormulaBar();
  initFormHandler();
  initModals();
});

// Theme Toggle
function initTheme() {
  const themeToggle = document.getElementById("theme-toggle");
  const savedTheme = localStorage.getItem("edu_theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);

  themeToggle?.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("edu_theme", newTheme);
  });
}

// Academic Dropdowns Cascading Logic (JEE / NEET Exclusive)
function initAcademicCascades() {
  const classSelect = document.getElementById("class-select");
  const subjectSelect = document.getElementById("subject-select");
  const chapterSelect = document.getElementById("chapter-select");

  classSelect.addEventListener("change", (e) => {
    const selectedExam = e.target.value;
    subjectSelect.innerHTML = '<option value="" disabled selected>-- Select Subject --</option>';
    chapterSelect.innerHTML = '<option value="" disabled selected>-- Select Subject First --</option>';
    chapterSelect.disabled = true;

    if (selectedExam && ACADEMIC_DATA[selectedExam]) {
      const subjects = Object.keys(ACADEMIC_DATA[selectedExam]);
      subjects.forEach((subj) => {
        const option = document.createElement("option");
        option.value = subj;
        option.textContent = subj;
        subjectSelect.appendChild(option);
      });
      subjectSelect.disabled = false;
    } else {
      subjectSelect.disabled = true;
    }
  });

  subjectSelect.addEventListener("change", (e) => {
    const selectedExam = classSelect.value;
    const selectedSubject = e.target.value;
    chapterSelect.innerHTML = '<option value="" disabled selected>-- Select Chapter --</option>';

    if (selectedExam && selectedSubject && ACADEMIC_DATA[selectedExam]?.[selectedSubject]) {
      const chapters = ACADEMIC_DATA[selectedExam][selectedSubject];
      chapters.forEach((chap) => {
        const option = document.createElement("option");
        option.value = chap;
        option.textContent = chap;
        chapterSelect.appendChild(option);
      });
      chapterSelect.disabled = false;
    } else {
      chapterSelect.disabled = true;
    }
  });
}

// Photo Studio & Canvas
function initPhotoStudio() {
  const photoInput = document.getElementById("photo-input");
  const cameraInput = document.getElementById("camera-input");
  const dropzone = document.getElementById("dropzone");
  const canvasStudio = document.getElementById("canvas-studio");
  const canvas = document.getElementById("photo-canvas");
  const ctx = canvas.getContext("2d");
  const rotateBtn = document.getElementById("rotate-btn");
  const clearDrawBtn = document.getElementById("clear-draw-btn");
  const removePhotoBtn = document.getElementById("remove-photo-btn");

  const handleFileSelect = (file) => {
    if (!file || !file.type.startsWith("image/")) {
      showToast("Please select a valid image file (PNG/JPG).");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      currentImage = new Image();
      currentImage.onload = () => {
        rotationAngle = 0;
        drawings = [];
        dropzone.classList.add("hidden");
        canvasStudio.classList.remove("hidden");
        renderCanvas();
      };
      currentImage.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  photoInput.addEventListener("change", (e) => handleFileSelect(e.target.files[0]));
  cameraInput.addEventListener("change", (e) => handleFileSelect(e.target.files[0]));

  dropzone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropzone.classList.add("drag-over");
  });
  dropzone.addEventListener("dragleave", () => dropzone.classList.remove("drag-over"));
  dropzone.addEventListener("drop", (e) => {
    e.preventDefault();
    dropzone.classList.remove("drag-over");
    if (e.dataTransfer.files?.length) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  });

  rotateBtn.addEventListener("click", () => {
    rotationAngle = (rotationAngle + 90) % 360;
    drawings = [];
    renderCanvas();
  });

  clearDrawBtn.addEventListener("click", () => {
    drawings = [];
    renderCanvas();
  });

  removePhotoBtn.addEventListener("click", () => {
    currentImage = null;
    drawings = [];
    photoInput.value = "";
    cameraInput.value = "";
    canvasStudio.classList.add("hidden");
    dropzone.classList.remove("hidden");
  });

  const getCanvasCoords = (e) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  };

  const startDrawing = (e) => {
    if (!currentImage) return;
    isDrawing = true;
    currentStroke = [getCanvasCoords(e)];
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const pos = getCanvasCoords(e);
    currentStroke.push(pos);
    renderCanvas();

    ctx.strokeStyle = "rgba(255, 235, 59, 0.5)";
    ctx.lineWidth = 18;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(currentStroke[0].x, currentStroke[0].y);
    for (let i = 1; i < currentStroke.length; i++) {
      ctx.lineTo(currentStroke[i].x, currentStroke[i].y);
    }
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing) {
      isDrawing = false;
      if (currentStroke.length > 1) {
        drawings.push([...currentStroke]);
      }
      currentStroke = [];
      renderCanvas();
    }
  };

  canvas.addEventListener("mousedown", startDrawing);
  canvas.addEventListener("mousemove", draw);
  canvas.addEventListener("mouseup", stopDrawing);
  canvas.addEventListener("mouseleave", stopDrawing);

  canvas.addEventListener("touchstart", (e) => { e.preventDefault(); startDrawing(e); });
  canvas.addEventListener("touchmove", (e) => { e.preventDefault(); draw(e); });
  canvas.addEventListener("touchend", stopDrawing);
}

function renderCanvas() {
  const canvas = document.getElementById("photo-canvas");
  const ctx = canvas.getContext("2d");
  if (!currentImage) return;

  const isRotated = rotationAngle === 90 || rotationAngle === 270;
  const imgW = isRotated ? currentImage.height : currentImage.width;
  const imgH = isRotated ? currentImage.width : currentImage.height;

  const maxDim = 800;
  let scale = 1;
  if (Math.max(imgW, imgH) > maxDim) {
    scale = maxDim / Math.max(imgW, imgH);
  }

  canvas.width = imgW * scale;
  canvas.height = imgH * scale;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();

  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate((rotationAngle * Math.PI) / 180);
  ctx.drawImage(
    currentImage,
    (-currentImage.width * scale) / 2,
    (-currentImage.height * scale) / 2,
    currentImage.width * scale,
    currentImage.height * scale
  );
  ctx.restore();

  drawings.forEach((stroke) => {
    if (stroke.length < 2) return;
    ctx.strokeStyle = "rgba(255, 235, 59, 0.5)";
    ctx.lineWidth = 18;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(stroke[0].x, stroke[0].y);
    for (let i = 1; i < stroke.length; i++) {
      ctx.lineTo(stroke[i].x, stroke[i].y);
    }
    ctx.stroke();
  });
}

function getAnnotatedImageBase64() {
  const canvas = document.getElementById("photo-canvas");
  return currentImage ? canvas.toDataURL("image/png") : null;
}

// Math Formula Bar Helpers
function initFormulaBar() {
  const textarea = document.getElementById("question-text");
  const buttons = document.querySelectorAll(".symbol-btn");
  const toggleBtn = document.getElementById("toggle-math-btn");
  const formulaKeyboard = document.getElementById("formula-keyboard");

  if (toggleBtn && formulaKeyboard) {
    toggleBtn.addEventListener("click", () => {
      formulaKeyboard.classList.toggle("hidden");
    });
  }

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const symbol = btn.getAttribute("data-symbol");
      const startPos = textarea.selectionStart;
      const endPos = textarea.selectionEnd;
      const text = textarea.value;

      textarea.value = text.substring(0, startPos) + symbol + text.substring(endPos);
      textarea.focus();
      textarea.selectionStart = textarea.selectionEnd = startPos + symbol.length;
    });
  });
}

// Form Submission & Data Export Payload Generator
function initFormHandler() {
  const form = document.getElementById("doubt-form");
  const resetBtn = document.getElementById("reset-btn");
  const directExportBtn = document.getElementById("export-json-direct-btn");

  const buildPayload = () => {
    const targetExam = document.getElementById("class-select").value;
    const subjectVal = document.getElementById("subject-select").value;
    const chapterVal = document.getElementById("chapter-select").value;
    const topicVal = document.getElementById("topic-input").value.trim();
    const questionText = document.getElementById("question-text").value.trim();
    
    // Diagnostic mistake classification is handled by backend. Only capture Socratic preference.
    const guidanceStyle = document.querySelector('input[name="guidanceStyle"]:checked')?.value || "Socratic Step-by-Step Hints";

    const photoBase64 = getAnnotatedImageBase64();
    const ticketId = `DBT-${targetExam ? targetExam.replace(/\s+/g, '') : 'EXAM'}-${Math.floor(1000 + Math.random() * 9000)}`;

    return {
      ticketId: ticketId,
      submittedAt: new Date().toISOString(),
      examContext: {
        targetExam: targetExam || "Not Selected",
        subject: subjectVal || "Not Selected",
        chapter: chapterVal || "Not Selected",
        specificTopic: topicVal || null
      },
      diagnosticAnalysis: {
        guidanceResolutionMode: guidanceStyle // e.g. Socratic Step-by-Step Hints vs Full Solution
      },
      doubtDetails: {
        questionText: questionText,
        attachments: {
          hasPhoto: !!photoBase64,
          photoBase64: photoBase64 ? `${photoBase64.substring(0, 45)}... [TRUNCATED FOR VIEW]` : null,
          fullPhotoDataUrl: photoBase64
        }
      }
    };
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const payload = buildPayload();
    openExportModal(payload);
  });

  directExportBtn.addEventListener("click", () => {
    const payload = buildPayload();
    openExportModal(payload);
  });

  resetBtn.addEventListener("click", () => {
    form.reset();
    document.getElementById("subject-select").disabled = true;
    document.getElementById("chapter-select").disabled = true;
    document.getElementById("remove-photo-btn").click();
    showToast("Form has been reset.");
  });
}

// Modals & Export Actions
let activePayload = null;

function openExportModal(payload) {
  activePayload = payload;
  const modal = document.getElementById("export-modal");
  
  document.getElementById("summary-ticket-id").textContent = payload.ticketId;
  document.getElementById("summary-class-sub").textContent = `${payload.examContext.targetExam} • ${payload.examContext.subject}`;
  document.getElementById("summary-chapter").textContent = payload.examContext.chapter;
  document.getElementById("summary-attachments").textContent = `Photo Attached: ${payload.doubtDetails.attachments.hasPhoto ? 'Yes' : 'No'}`;

  const cleanDisplayPayload = JSON.parse(JSON.stringify(payload));
  if (cleanDisplayPayload.doubtDetails.attachments.fullPhotoDataUrl) {
    delete cleanDisplayPayload.doubtDetails.attachments.fullPhotoDataUrl;
  }

  document.getElementById("json-output-code").textContent = JSON.stringify(cleanDisplayPayload, null, 2);
  modal.classList.remove("hidden");
}

function initModals() {
  const exportModal = document.getElementById("export-modal");
  const closeModalBtn = document.getElementById("close-modal-btn");
  const guideModal = document.getElementById("guide-modal");
  const guideBtn = document.getElementById("guide-btn");
  const closeGuideBtn = document.getElementById("close-guide-btn");
  const closeGuideBtn2 = document.getElementById("close-guide-btn-2");

  closeModalBtn.addEventListener("click", () => exportModal.classList.add("hidden"));
  guideBtn.addEventListener("click", () => guideModal.classList.remove("hidden"));
  closeGuideBtn.addEventListener("click", () => guideModal.classList.add("hidden"));
  closeGuideBtn2.addEventListener("click", () => guideModal.classList.add("hidden"));

  const tabBtns = document.querySelectorAll(".tab-btn");
  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabBtns.forEach((b) => b.classList.remove("active"));
      document.querySelectorAll(".tab-pane").forEach((p) => p.classList.remove("active"));

      btn.classList.add("active");
      const targetTab = btn.getAttribute("data-tab");
      document.getElementById(targetTab).classList.add("active");
    });
  });

  document.getElementById("copy-json-btn").addEventListener("click", () => {
    if (!activePayload) return;
    navigator.clipboard.writeText(JSON.stringify(activePayload, null, 2));
    showToast("Payload JSON copied to clipboard!");
  });

  document.getElementById("download-json-file-btn").addEventListener("click", () => {
    if (!activePayload) return;
    const blob = new Blob([JSON.stringify(activePayload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `doubt-submission-${activePayload.ticketId}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("JSON payload downloaded successfully!");
  });
}

function showToast(message) {
  const toast = document.getElementById("toast");
  const toastMessage = document.getElementById("toast-message");
  toastMessage.textContent = message;
  toast.classList.remove("hidden");
  setTimeout(() => toast.classList.add("hidden"), 3000);
}
