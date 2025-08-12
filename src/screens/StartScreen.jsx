import React from 'react';
import Button from '../components/Button';
import { logo, logoIcon } from '../assets';

const StartScreen = ({ onStartGame, onViewLeaderboard }) => {
  return (
    <div className="min-h-screen bg-[#f2faff] flex flex-col items-center justify-center px-6">
      {/* Логотип */}
      <div className="w-[120px] h-[120px] bg-[#4a90e2] rounded-[30px] flex items-center justify-center mb-6">
        <span className="text-[48px] text-white font-bold">🎯</span>
      </div>
      
      {/* Название приложения */}
      <h1 className="text-[40px] font-extrabold text-[#4a90e2] mb-4 text-center">
        QuizGo
      </h1>
      
      {/* Слоган */}
      <p className="text-[18px] text-[#333333] text-center mb-12 max-w-[292px]">
        Короткая викторина на скорость
      </p>
      
      {/* Кнопки */}
      <div className="w-full space-y-4 max-w-[327px]">
        <Button 
          variant="primary" 
          fullWidth 
          onClick={onStartGame}
        >
          Играть
        </Button>
        
        <Button 
          variant="secondary" 
          fullWidth 
          onClick={onViewLeaderboard}
        >
          Лидерборд
        </Button>
      </div>
    </div>
  );
};

export default StartScreen;
