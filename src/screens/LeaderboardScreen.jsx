import React from 'react';
import Button from '../components/Button';

const LeaderboardScreen = ({ leaderboard, onBackToStart }) => {
  // Форматируем данные лидерборда
  const formatLeaderboardData = () => {
    if (!leaderboard || leaderboard.length === 0) {
      return [
        { position: 1, name: 'Нет данных', score: 0, medal: '🥇', bgColor: 'bg-[#ffd700]', textColor: 'text-[#1a1a1a]' }
      ];
    }

    return leaderboard.map((entry, index) => {
      let medal = '';
      let bgColor = 'bg-white';
      let textColor = 'text-[#1a1a1a]';
      let scoreColor = 'text-[#4d4d4d]';

      if (index === 0) {
        medal = '🥇';
        bgColor = 'bg-[#ffd700]';
        textColor = 'text-[#1a1a1a]';
      } else if (index === 1) {
        medal = '🥈';
        bgColor = 'bg-[#bfbfbf]';
        textColor = 'text-[#1a1a1a]';
      } else if (index === 2) {
        medal = '🥉';
        bgColor = 'bg-[#cd7f32]';
        textColor = 'text-white';
      }

      return {
        position: index + 1,
        name: `Игрок ${index + 1}`,
        score: entry.score,
        medal,
        bgColor,
        textColor,
        scoreColor
      };
    });
  };

  const leaderboardData = formatLeaderboardData();

  return (
    <div className="min-h-screen bg-[#f7fcff] flex flex-col px-6 py-6">
      {/* Заголовок */}
      <h1 className="text-[26px] font-extrabold text-[#4a90e2] mb-6 text-center">
        Таблица лидеров 🏆
      </h1>

      {/* Список лидеров */}
      <div className="flex-1 space-y-2 mb-6 bg-white rounded-2xl p-4">
        {leaderboardData.map((player) => (
          <div
            key={player.position}
            className={`${player.bgColor} rounded-lg p-3 flex justify-between items-center h-[48px] ${player.textColor || 'text-gray-900'}`}
          >
            <div className="flex items-center gap-3">
              <span className="text-[16px] font-bold">
                {player.medal} {player.position}
              </span>
              <span className="text-[16px] font-bold">
                {player.name}
              </span>
            </div>
            <span className={`text-[16px] font-bold ${player.scoreColor || player.textColor}`}>
              {player.score}
            </span>
          </div>
        ))}
      </div>

            {/* Кнопка назад */}
      <Button 
        variant="secondary" 
        fullWidth 
        onClick={onBackToStart}
      >
        Назад
      </Button>
    </div>
  );
};

export default LeaderboardScreen;
