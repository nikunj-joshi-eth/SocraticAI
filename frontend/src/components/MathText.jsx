import React from 'react';

export default function MathText({ text = '' }) {
  if (!text) return null;

  // Clean format math symbols for clear human readability
  const cleanedText = text
    .replace(/\\in/g, '∈')
    .replace(/\\mathbb\{N\}/g, 'ℕ')
    .replace(/\\mathbb\{R\}/g, 'ℝ')
    .replace(/\\mathbb\{Z\}/g, 'ℤ')
    .replace(/\\theta/g, 'θ')
    .replace(/\\alpha/g, 'α')
    .replace(/\\beta/g, 'β')
    .replace(/\\pi/g, 'π')
    .replace(/\\cup/g, '∪')
    .replace(/\\cap/g, '∩')
    .replace(/\\cdot/g, '·')
    .replace(/\$/g, '');

  return <span>{cleanedText}</span>;
}