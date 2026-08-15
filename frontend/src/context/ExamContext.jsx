import React, { createContext, useContext, useState } from 'react';

const ExamContext = createContext();

export function ExamProvider({ children }) {
  const [targetExam, setTargetExam] = useState('JEE Main'); // 'JEE Main' | 'JEE Advanced' | 'NEET UG'
  const [showOnboardingModal, setShowOnboardingModal] = useState(true);

  const selectExam = (exam) => {
    setTargetExam(exam);
    setShowOnboardingModal(false);
  };

  return (
    <ExamContext.Provider
      value={{
        targetExam,
        setTargetExam,
        selectExam,
        showOnboardingModal,
        setShowOnboardingModal,
      }}
    >
      {children}
    </ExamContext.Provider>
  );
}

export function useExam() {
  const context = useContext(ExamContext);
  if (!context) {
    throw new Error('useExam must be used within an ExamProvider');
  }
  return context;
}
