import React, { useEffect } from 'react';
import WebApp from '@twa-dev/sdk';
import Game from './components/Game';

function App() {
  useEffect(() => {
    // Инициализация Telegram Mini App
    WebApp.ready();

    // Вывод данных пользователя в консоль
    const userData = WebApp.initDataUnsafe?.user;
    if (userData) {
      console.log('Telegram User Data:', userData);
      console.log('User ID:', userData.id);
      console.log('Username:', userData.username);
      console.log('First Name:', userData.first_name);
      console.log('Last Name:', userData.last_name);
    } else {
      console.log('Telegram WebApp not available or no user data');
    }

    // Настройка темы в соответствии с дизайном Figma
    WebApp.setHeaderColor('#4a90e2');
    WebApp.setBackgroundColor('#f2faff');

    // Включение кнопки "Назад"
    WebApp.enableClosingConfirmation();

  }, []);

  return (
    <div className="App min-h-screen">
      <Game />
    </div>
  );
}

export default App;
