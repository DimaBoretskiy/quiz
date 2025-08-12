import React from 'react';
import Button from './Button';

const Results = ({ 
  score, 
  totalQuestions, 
  userAnswers, 
  onPlayAgain, 
  onViewLeaderboard 
}) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  const getScoreMessage = () => {
    if (percentage >= 90) return "Отлично! 🌟";
    if (percentage >= 70) return "Хорошо! 👍";
    if (percentage >= 50) return "Неплохо! 😊";
    return "Попробуйте еще раз! 💪";
  };

  const getScoreColor = () => {
    if (percentage >= 90) return "text-green-600";
    if (percentage >= 70) return "text-blue-600";
    if (percentage >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="min-h-screen bg-[#f2faff] flex flex-col items-center justify-center px-6">
      {/* Заголовок */}
      <h1 className="text-[26px] font-extrabold text-[#4a90e2] mb-6 text-center">
        Поздравляем! 🎉
      </h1>
      
      {/* Счёт */}
      <div className={`text-[52px] font-black mb-4 text-center ${getScoreColor()}`}>
        {score}/{totalQuestions}
      </div>
      
      {/* Процент */}
      <div className="text-[24px] font-bold text-[#4a90e2] mb-4 text-center">
        {percentage}%
      </div>
      
      {/* Комментарий */}
      <p className="text-[18px] text-[#333333] mb-8 text-center">
        {getScoreMessage()}
      </p>
      
      {/* Детали ответов */}
      <div className="w-full max-w-[327px] mb-8">
        <h3 className="text-[18px] font-bold text-[#4a90e2] mb-4 text-center">
          Детали ответов:
        </h3>
        <div className="space-y-2 max-h-[200px] overflow-y-auto">
          {userAnswers.map((answer, index) => (
            <div 
              key={answer.questionId}
              className={`p-3 rounded-lg text-sm ${
                answer.isCorrect 
                  ? 'bg-green-100 border border-green-300' 
                  : 'bg-red-100 border border-red-300'
              }`}
            >
              <div className="font-semibold mb-1">
                Вопрос {index + 1}: {answer.questionText}
              </div>
              <div className="text-xs space-y-1">
                <div className={`${answer.isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                  {answer.isCorrect ? '✅ Правильно' : '❌ Неправильно'}
                </div>
                {!answer.isCorrect && (
                  <>
                    <div className="text-gray-600">
                      Ваш ответ: {answer.selectedIndex >= 0 ? answer.options[answer.selectedIndex] : 'Время истекло'}
                    </div>
                    <div className="text-green-700">
                      Правильный ответ: {answer.options[answer.correctIndex]}
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Кнопки */}
      <div className="w-full space-y-4 max-w-[327px]">
        <Button 
          variant="primary" 
          fullWidth 
          onClick={onPlayAgain}
        >
          Играть ещё раз
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

export default Results;
