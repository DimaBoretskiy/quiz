// Конфигурация Telegram бота QuizGo
export const BOT_CONFIG = {
  token: "7557010853:AAFj5GmKw5V3mKStf_m9w752vg0bPVy1PSw",
  botName: "QuizGo Bot",
  description: "Увлекательная викторина с таймером и лидербордом",
  commands: [
    { command: "/start", description: "Начать игру" },
    { command: "/quiz", description: "Запустить викторину" },
    { command: "/leaderboard", description: "Показать лидерборд" },
    { command: "/help", description: "Показать справку" }
  ],
  gameSettings: {
    questionsPerGame: 10,
    timePerQuestion: 15,
    maxPlayers: 100
  }
};

export const WEBAPP_URL = "https://dimaboretskiy.github.io/quiz/";

export const TELEGRAM_CONFIG = {
  headerColor: "#4a90e2",
  backgroundColor: "#f2faff",
  buttonColor: "#ffd93d",
  textColor: "#1a1a1a"
};
