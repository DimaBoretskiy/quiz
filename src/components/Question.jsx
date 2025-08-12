import React from 'react';
import Button from './Button';

const Question = ({ 
  question, 
  currentQuestionIndex, 
  totalQuestions, 
  timeLeft, 
  onAnswer, 
  isAnswered = false 
}) => {
  if (!question) return null;

  const handleAnswerClick = (selectedIndex) => {
    if (!isAnswered) {
      onAnswer(selectedIndex);
    }
  };

  const getAnswerButtonVariant = (index) => {
    if (!isAnswered) return 'secondary';
    
    if (index === question.correctIndex) {
      return 'correct'; // Будем добавлять этот вариант в Button
    }
    
    if (index === question.selectedIndex && !question.isCorrect) {
      return 'incorrect'; // Будем добавлять этот вариант в Button
    }
    
    return 'secondary';
  };

  return (
    <div className="min-h-screen bg-[#f7fcff] flex flex-col px-6 py-6">
      {/* Верхняя панель */}
      <div className="bg-white rounded-2xl p-4 mb-6 h-[80px] flex items-center">
        <div className="flex justify-between items-center w-full">
          <div className="text-[16px] font-bold text-[#4a90e2]">
            Вопрос {currentQuestionIndex + 1} из {totalQuestions}
          </div>
          <div className={`text-[16px] font-bold ${timeLeft <= 5 ? 'text-red-600' : 'text-[#4a90e2]'}`}>
            {Math.floor(timeLeft / 60).toString().padStart(2, '0')}:{(timeLeft % 60).toString().padStart(2, '0')}
          </div>
        </div>
      </div>
      
      {/* Вопрос */}
      <div className="text-center mb-8">
        <h2 className="text-[22px] font-extrabold text-[#1a1a1a] mb-8 leading-tight">
          {question.text}
        </h2>
      </div>
      
      {/* Варианты ответов */}
      <div className="space-y-4 flex-1">
        {question.options.map((option, index) => (
          <Button 
            key={index}
            variant={getAnswerButtonVariant(index)}
            fullWidth 
            onClick={() => handleAnswerClick(index)}
            disabled={isAnswered}
            className={`transition-all duration-200 ${
              isAnswered 
                ? index === question.correctIndex 
                  ? 'bg-green-100 border-green-500 text-green-700' 
                  : index === question.selectedIndex && !question.isCorrect
                    ? 'bg-red-100 border-red-500 text-red-700'
                    : ''
                : ''
            }`}
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Question;
