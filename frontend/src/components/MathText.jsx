import React from 'react';

export default function MathText({ text = '' }) {
  if (!text) return null;

  // Clean format raw LaTeX markup into beautiful, human-readable Unicode text
  const cleanedText = text
    .replace(/\\text\{([^}]+)\}/g, '$1')           # \text{m/s} -> m/s
    .replace(/\\vec\{([^}]+)\}/g, '$1⃗')            # \vec{p} -> p⃗
    .replace(/\\hat\{i\}/g, 'î')                    # \hat{i} -> î
    .replace(/\\hat\{j\}/g, 'ĵ')                    # \hat{j} -> ĵ
    .replace(/\\hat\{k\}/g, 'k̂')                    # \hat{k} -> k̂
    .replace(/\\mathbf\{([^}]+)\}/g, '$1')         # \mathbf{x} -> x
    .replace(/_\{([^}]+)\}/g, '_$1')               # v_{sg} -> v_sg
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
    .replace(/\\times/g, '×')
    .replace(/\\sum/g, '∑')
    .replace(/\\sqrt\{([^}]+)\}/g, '√($1)')
    .replace(/\$/g, '')
    .replace(/\\\\/g, '\n');

  return <span>{cleanedText}</span>;
}