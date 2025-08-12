import React from 'react';

const Button = ({
    children,
    variant = 'primary',
    onClick,
    className = '',
    disabled = false,
    fullWidth = false
}) => {
    const baseClasses = 'font-semibold py-4 px-6 rounded-[16px] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed h-[56px]';

    const variantClasses = {
        primary: 'bg-[#ffd93d] text-[#4a90e2] text-[18px] font-bold hover:bg-yellow-400',
        secondary: 'bg-white text-[#4a90e2] text-[16px] font-semibold border-2 border-[#4a90e2] hover:bg-blue-50',
        correct: 'bg-green-100 text-green-700 text-[16px] font-semibold border-2 border-green-500',
        incorrect: 'bg-red-100 text-red-700 text-[16px] font-semibold border-2 border-red-500'
    };

    const widthClasses = fullWidth ? 'w-full' : '';

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`${baseClasses} ${variantClasses[variant]} ${widthClasses} ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;
