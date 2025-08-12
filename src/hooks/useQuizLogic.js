import { useState, useEffect, useCallback } from 'react';
import { questions, GAME_TIME_LIMIT, TOTAL_QUESTIONS } from '../data/questions';

export const useQuizLogic = () => {
  // Состояние игры
  const [gameState, setGameState] = useState('start'); // 'start', 'playing', 'results', 'leaderboard'
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_TIME_LIMIT);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [leaderboard, setLeaderboard] = useState([]);

  // Загрузка лидерборда из localStorage
  useEffect(() => {
    const savedLeaderboard = localStorage.getItem('quizgo-leaderboard');
    if (savedLeaderboard) {
      setLeaderboard(JSON.parse(savedLeaderboard));
    }
  }, []);

  // Сохранение лидерборда в localStorage
  const saveLeaderboard = useCallback((newScore) => {
    const newEntry = {
      id: Date.now(),
      score: newScore,
      correctAnswers: newScore,
      totalQuestions: TOTAL_QUESTIONS,
      percentage: Math.round((newScore / TOTAL_QUESTIONS) * 100),
      timestamp: new Date().toISOString()
    };

    const updatedLeaderboard = [...leaderboard, newEntry]
      .sort((a, b) => b.score - a.score)
      .slice(0, 10); // Топ-10

    setLeaderboard(updatedLeaderboard);
    localStorage.setItem('quizgo-leaderboard', JSON.stringify(updatedLeaderboard));
  }, [leaderboard]);

  // Запуск игры
  const startGame = useCallback(() => {
    setGameState('playing');
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setScore(0);
    setTimeLeft(GAME_TIME_LIMIT);
    setIsTimerRunning(true);
  }, []);

  // Остановка игры
  const stopGame = useCallback(() => {
    setIsTimerRunning(false);
    setGameState('results');
    
    // Подсчет результатов
    const correctAnswers = userAnswers.filter(answer => answer.isCorrect).length;
    setScore(correctAnswers);
    saveLeaderboard(correctAnswers);
  }, [userAnswers, saveLeaderboard]);

  // Обработка ответа пользователя
  const handleAnswer = useCallback((selectedIndex) => {
    if (gameState !== 'playing') return;

    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedIndex === currentQuestion.correctIndex;
    
    // Сохраняем ответ
    const newAnswer = {
      questionId: currentQuestion.id,
      questionText: currentQuestion.text,
      selectedIndex,
      correctIndex: currentQuestion.correctIndex,
      isCorrect,
      options: currentQuestion.options
    };

    setUserAnswers(prev => [...prev, newAnswer]);

    // Переходим к следующему вопросу или завершаем игру
    if (currentQuestionIndex < TOTAL_QUESTIONS - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setTimeLeft(GAME_TIME_LIMIT);
    } else {
      // Игра завершена
      stopGame();
    }
  }, [currentQuestionIndex, gameState, stopGame]);

  // Обработка истечения времени
  const handleTimeUp = useCallback(() => {
    if (gameState !== 'playing') return;

    const currentQuestion = questions[currentQuestionIndex];
    
    // Автоматически отмечаем как неправильный ответ
    const newAnswer = {
      questionId: currentQuestion.id,
      questionText: currentQuestion.text,
      selectedIndex: -1, // -1 означает, что время истекло
      correctIndex: currentQuestion.correctIndex,
      isCorrect: false,
      options: currentQuestion.options
    };

    setUserAnswers(prev => [...prev, newAnswer]);

    // Переходим к следующему вопросу или завершаем игру
    if (currentQuestionIndex < TOTAL_QUESTIONS - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setTimeLeft(GAME_TIME_LIMIT);
    } else {
      // Игра завершена
      stopGame();
    }
  }, [currentQuestionIndex, gameState, stopGame]);

  // Таймер
  useEffect(() => {
    let interval;
    
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isTimerRunning, timeLeft, handleTimeUp]);

  // Сброс игры
  const resetGame = useCallback(() => {
    setGameState('start');
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setScore(0);
    setTimeLeft(GAME_TIME_LIMIT);
    setIsTimerRunning(false);
  }, []);

  // Переход к лидерборду
  const goToLeaderboard = useCallback(() => {
    setGameState('leaderboard');
  }, []);

  // Возврат к старту
  const goToStart = useCallback(() => {
    setGameState('start');
  }, []);

  // Получение текущего вопроса
  const getCurrentQuestion = useCallback(() => {
    return questions[currentQuestionIndex];
  }, [currentQuestionIndex]);

  // Форматирование времени для отображения
  const formatTime = useCallback((seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  return {
    // Состояние
    gameState,
    currentQuestionIndex,
    timeLeft,
    isTimerRunning,
    userAnswers,
    score,
    leaderboard,
    totalQuestions: TOTAL_QUESTIONS,
    
    // Действия
    startGame,
    handleAnswer,
    resetGame,
    goToLeaderboard,
    goToStart,
    
    // Утилиты
    getCurrentQuestion,
    formatTime
  };
};
