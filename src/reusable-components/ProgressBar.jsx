import React from 'react';

const ProgressBar = () => {
  return (
    <div className="progress w-full" style={progressStyles}>
    </div>
  );
};

const progressStyles = {
  height: '5.8px',
  background: 'linear-gradient(#cf7650 0 0), linear-gradient(#cf7650 0 0), #004643',
  backgroundSize: '60% 100%',
  backgroundRepeat: 'no-repeat',
  animation: 'progress-7x9cg2 3s infinite',
};

// Add keyframes as a separate style element
const keyframes = `
  @keyframes progress-7x9cg2 {
    0% {
      background-position: -150% 0, -150% 0;
    }
    66% {
      background-position: 250% 0, -150% 0;
    }
    100% {
      background-position: 250% 0, 250% 0;
    }
  }
`;

// Create a style element and append the keyframes
const styleElement = document.createElement('style');
styleElement.appendChild(document.createTextNode(keyframes));
document.head.appendChild(styleElement);

export default ProgressBar;
