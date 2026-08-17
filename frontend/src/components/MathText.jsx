import React from 'react';
import { InlineMath, BlockMath } from 'react-katex';

export default function MathText({ text = '' }) {
  const parts = text.split(/(\$\$[\s\S]*?\$\$|\$[^$]+\$)/g);

  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith('$$') && part.endsWith('$$')) {
          return (
            <BlockMath
              key={index}
              math={part.slice(2, -2)}
            />
          );
        }

        if (part.startsWith('$') && part.endsWith('$')) {
          return (
            <InlineMath
              key={index}
              math={part.slice(1, -1)}
            />
          );
        }

        return (
          <React.Fragment key={index}>
            {part}
          </React.Fragment>
        );
      })}
    </>
  );
}