import { BOT_CONFIG } from "../config/bot.js";

class TelegramBotService {
  constructor() {
    this.token = BOT_CONFIG.token;
    this.apiUrl = `https://api.telegram.org/bot${this.token}`;
  }

  async sendMessage(chatId, text, options = {}) {
    try {
      const response = await fetch(`${this.apiUrl}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: text,
          parse_mode: "HTML",
          ...options
        })
      });
      return await response.json();
    } catch (error) {
      console.error("Ошибка отправки сообщения:", error);
      throw error;
    }
  }

  async sendQuizMessage(chatId, text = "🎯 Добро пожаловать в QuizGo!") {
    const keyboard = {
      inline_keyboard: [[{
        text: "🎮 Играть в QuizGo",
        web_app: { url: "https://dimaboretskiy.github.io/quiz/" }
      }]]
    };
    return this.sendMessage(chatId, text, { reply_markup: keyboard });
  }

  async sendLeaderboard(chatId, leaderboard) {
    let text = "🏆 <b>Таблица лидеров QuizGo</b>

";
    if (leaderboard.length === 0) {
      text += "Пока нет результатов. Будьте первым! 🚀";
    } else {
      leaderboard.slice(0, 10).forEach((player, index) => {
        const medal = index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : "🏅";
        text += `${medal} <b>${player.name || `Игрок ${index + 1}`}</b>: ${player.score} баллов
`;
      });
    }
    text += "
🎯 <i>Играйте и улучшайте свой результат!</i>";
    
    const keyboard = {
      inline_keyboard: [[{
        text: "🎮 Играть снова",
        web_app: { url: "https://dimaboretskiy.github.io/quiz/" }
      }]]
    };
    return this.sendMessage(chatId, text, { reply_markup: keyboard });
  }

  async sendHelp(chatId) {
    const text = `🎯 <b>QuizGo - Викторина с таймером</b>

📚 <b>Как играть:</b>
• Отвечайте на 10 вопросов
• У вас 15 секунд на каждый ответ
• Выбирайте один правильный ответ из четырех
• За каждый правильный ответ получаете 1 балл

🏆 <b>Функции:</b>
• Лидерборд с лучшими результатами
• Сохранение прогресса
• Красивый дизайн в стиле Telegram

🎮 <b>Команды:</b>
/start - Начать игру
/quiz - Запустить викторину
/leaderboard - Показать лидерборд
/help - Показать эту справку

<i>Удачи в игре! 🚀</i>`;
    
    const keyboard = {
      inline_keyboard: [[{
        text: "🎮 Начать игру",
        web_app: { url: "https://dimaboretskiy.github.io/quiz/" }
      }]]
    };
    return this.sendMessage(chatId, text, { reply_markup: keyboard });
  }

  async setCommands() {
    try {
      const response = await fetch(`${this.apiUrl}/setMyCommands`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ commands: BOT_CONFIG.commands })
      });
      return await response.json();
    } catch (error) {
      console.error("Ошибка установки команд:", error);
      throw error;
    }
  }

  async getBotInfo() {
    try {
      const response = await fetch(`${this.apiUrl}/getMe`);
      return await response.json();
    } catch (error) {
      console.error("Ошибка получения информации о боте:", error);
      throw error;
    }
  }
}

export default new TelegramBotService();
