import React from 'react';

const ProgressBar = ({ current = 1, total = 10, className = '' }) => {
  const progress = (current / total) * 100;
  
  return (
    <div className={`w-full ${className}`}>
      <div className="text-primary-blue font-bold text-base mb-2">
        Вопрос {current} из {total}
      </div>
      <div className="w-full h-2 bg-blue-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary-blue rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
