import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const ResultsScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f2faff] flex flex-col items-center justify-center px-6">
      {/* Заголовок */}
      <h1 className="text-[26px] font-extrabold text-[#4a90e2] mb-6 text-center">
        Поздравляем! 🎉
      </h1>

      {/* Счёт */}
      <div className="text-[52px] font-black text-[#4a90e2] mb-4 text-center">
        7/10
      </div>

      {/* Комментарий */}
      <p className="text-[18px] text-[#333333] mb-12 text-center">
        Отлично! 🌟
      </p>

      {/* Кнопки */}
      <div className="w-full space-y-4 max-w-[327px]">
        <Button
          variant="primary"
          fullWidth
          onClick={() => navigate('/question')}
        >
          Играть ещё раз
        </Button>

        <Button
          variant="secondary"
          fullWidth
          onClick={() => navigate('/leaderboard')}
        >
          Лидерборд
        </Button>
      </div>
    </div>
  );
};

export default ResultsScreen;
