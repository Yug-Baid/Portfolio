import React from 'react';

const MaskedDiv = ({ 
  children, 
  maskType = 'type-1', 
  size = 1, 
  className = '' 
}) => {
  const maskStyles = {
    'type-1': {
      maskImage: 'radial-gradient(circle at center, black 40%, transparent 70%)',
      WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 70%)',
    },
    'type-2': {
      maskImage: 'linear-gradient(135deg, black 0%, transparent 100%)',
      WebkitMaskImage: 'linear-gradient(135deg, black 0%, transparent 100%)',
    },
    'type-3': {
      maskImage: 'radial-gradient(ellipse at center, black 50%, transparent 80%)',
      WebkitMaskImage: 'radial-gradient(ellipse at center, black 50%, transparent 80%)',
    },
    'type-4': {
      maskImage: 'conic-gradient(from 0deg, black 0%, transparent 50%, black 100%)',
      WebkitMaskImage: 'conic-gradient(from 0deg, black 0%, transparent 50%, black 100%)',
    },
  };

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        ...maskStyles[maskType],
        maskSize: `${size * 100}%`,
        WebkitMaskSize: `${size * 100}%`,
        maskPosition: 'center',
        WebkitMaskPosition: 'center',
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat',
      }}
    >
      {children}
    </div>
  );
};

export default MaskedDiv;
