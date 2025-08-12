import React from 'react';
import { useQuizLogic } from '../hooks/useQuizLogic';
import StartScreen from '../screens/StartScreen';
import Question from './Question';
import Results from './Results';
import LeaderboardScreen from '../screens/LeaderboardScreen';

const Game = () => {
  const {
    gameState,
    currentQuestionIndex,
    timeLeft,
    isTimerRunning,
    userAnswers,
    score,
    leaderboard,
    totalQuestions,
    startGame,
    handleAnswer,
    resetGame,
    goToLeaderboard,
    goToStart,
    getCurrentQuestion,
    formatTime
  } = useQuizLogic();

  // Рендерим соответствующий экран в зависимости от состояния игры
  switch (gameState) {
    case 'start':
      return (
        <StartScreen 
          onStartGame={startGame}
          onViewLeaderboard={goToLeaderboard}
        />
      );

    case 'playing':
      const currentQuestion = getCurrentQuestion();
      return (
        <Question
          question={currentQuestion}
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={totalQuestions}
          timeLeft={timeLeft}
          onAnswer={handleAnswer}
        />
      );

    case 'results':
      return (
        <Results
          score={score}
          totalQuestions={totalQuestions}
          userAnswers={userAnswers}
          onPlayAgain={resetGame}
          onViewLeaderboard={goToLeaderboard}
        />
      );

    case 'leaderboard':
      return (
        <LeaderboardScreen
          leaderboard={leaderboard}
          onBackToStart={goToStart}
        />
      );

    default:
      return (
        <StartScreen 
          onStartGame={startGame}
          onViewLeaderboard={goToLeaderboard}
        />
      );
  }
};

export default Game;
