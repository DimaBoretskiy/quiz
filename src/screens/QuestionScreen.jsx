import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Timer from '../components/Timer';
import ProgressBar from '../components/ProgressBar';
import { bgQuestion } from '../assets';

const QuestionScreen = () => {
  const navigate = useNavigate();

  const handleAnswer = (answer) => {
    // Пока просто переходим к результатам
    navigate('/results');
  };

  return (
    <div className="min-h-screen bg-[#f7fcff] flex flex-col px-6 py-6">
      {/* Верхняя панель */}
      <div className="bg-white rounded-2xl p-4 mb-6 h-[80px] flex items-center">
        <div className="flex justify-between items-center w-full">
          <div className="text-[16px] font-bold text-[#4a90e2]">
            Вопрос 1 из 10
          </div>
          <Timer time="00:30" />
        </div>
      </div>

      {/* Вопрос */}
      <div className="text-center mb-8">
        <h2 className="text-[22px] font-extrabold text-[#1a1a1a] mb-8">
          Какой океан самый глубокий?
        </h2>
      </div>

      {/* Варианты ответов */}
      <div className="space-y-4 flex-1">
        <Button
          variant="secondary"
          fullWidth
          onClick={() => handleAnswer('Тихий океан')}
        >
          Тихий океан
        </Button>

        <Button
          variant="secondary"
          fullWidth
          onClick={() => handleAnswer('Атлантический океан')}
        >
          Атлантический океан
        </Button>

        <Button
          variant="secondary"
          fullWidth
          onClick={() => handleAnswer('Индийский океан')}
        >
          Индийский океан
        </Button>

        <Button
          variant="secondary"
          fullWidth
          onClick={() => handleAnswer('Северный Ледовитый океан')}
        >
          Северный Ледовитый океан
        </Button>
      </div>
    </div>
  );
};

export default QuestionScreen;
