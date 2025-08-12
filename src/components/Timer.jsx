import React from 'react';

const Timer = ({ time = '00:30', className = '', isRunning = true, isLow = false }) => {
    // Определяем цвет таймера в зависимости от оставшегося времени
    const getTimerColor = () => {
        if (!isRunning) return 'bg-gray-500';
        if (isLow) return 'bg-red-600';
        return 'bg-[#f24d4d]';
    };

    return (
        <div className={`${getTimerColor()} text-white px-3 py-2 rounded-[20px] flex items-center gap-2 h-[40px] w-[100px] justify-center transition-colors duration-300 ${className}`}>
            <span className="text-[18px]">⏰</span>
            <span className="font-bold text-[16px]">{time}</span>
        </div>
    );
};

export default Timer;
