import { useEffect, useState, useCallback } from "react";
import WebApp from "@twa-dev/sdk";
import telegramBotService from "../services/telegramBot.js";

export const useTelegram = () => {
  const [user, setUser] = useState(null);
  const [isWebApp, setIsWebApp] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (WebApp.initData) {
      setIsWebApp(true);
      setUser(WebApp.initDataUnsafe?.user || null);
      WebApp.setHeaderColor("#4a90e2");
      WebApp.setBackgroundColor("#f2faff");
      WebApp.enableClosingConfirmation();
      WebApp.ready();
      setIsReady(true);
      console.log("Telegram WebApp инициализирован:", WebApp.initDataUnsafe?.user);
    } else {
      console.log("Telegram WebApp не доступен, запуск в обычном режиме");
      setIsReady(true);
    }
  }, []);

  const shareResult = useCallback(async (score, totalQuestions) => {
    if (!isWebApp || !user) return;
    try {
      const percentage = Math.round((score / totalQuestions) * 100);
      const message = `🎯 <b>QuizGo - Результат игры</b>

👤 <b>Игрок:</b> ${user.first_name}${user.last_name ? ` ${user.last_name}` : ""}
🏆 <b>Результат:</b> ${score}/${totalQuestions} (${percentage}%)
⭐ <b>Оценка:</b> ${getScoreEmoji(percentage)}

🎮 <i>Играйте в QuizGo и улучшайте свой результат!</i>`;
      
      await telegramBotService.sendMessage(user.id, message, {
        reply_markup: {
          inline_keyboard: [
            [{ text: "🎮 Играть снова", web_app: { url: "https://dimaboretskiy.github.io/quiz/" } }],
            [{ text: "�� Лидерборд", callback_data: "leaderboard" }]
          ]
        }
      });
      
      WebApp.showAlert("Результат отправлен в чат! 🎉");
    } catch (error) {
      console.error("Ошибка отправки результата:", error);
      WebApp.showAlert("Ошибка отправки результата. Попробуйте еще раз.");
    }
  }, [isWebApp, user]);

  const shareLeaderboard = useCallback(async (leaderboard) => {
    if (!isWebApp || !user) return;
    try {
      await telegramBotService.sendLeaderboard(user.id, leaderboard);
      WebApp.showAlert("Лидерборд отправлен в чат! 🏆");
    } catch (error) {
      console.error("Ошибка отправки лидерборда:", error);
      WebApp.showAlert("Ошибка отправки лидерборда. Попробуйте еще раз.");
    }
  }, [isWebApp, user]);

  const shareGame = useCallback(() => {
    if (!isWebApp) return;
    WebApp.showPopup({
      title: "Поделиться QuizGo",
      message: "Отправьте ссылку на игру своим друзьям! 🎮",
      buttons: [
        { id: "share", type: "default", text: "📤 Поделиться" },
        { id: "cancel", type: "cancel", text: "Отмена" }
      ]
    }, (buttonId) => {
      if (buttonId === "share") {
        WebApp.switchInlineQuery("🎯 QuizGo - увлекательная викторина!", ["users", "groups", "channels"]);
      }
    });
  }, [isWebApp]);

  const getScoreEmoji = (percentage) => {
    if (percentage >= 90) return "🌟 Отлично!";
    if (percentage >= 70) return "👍 Хорошо!";
    if (percentage >= 50) return "😊 Неплохо!";
    return "💪 Попробуйте еще раз!";
  };

  const closeApp = useCallback(() => {
    if (isWebApp) WebApp.close();
  }, [isWebApp]);

  const showMainMenu = useCallback(() => {
    if (!isWebApp) return;
    WebApp.showPopup({
      title: "QuizGo - Главное меню",
      message: "Выберите действие:",
      buttons: [
        { id: "play", type: "default", text: "🎮 Играть" },
        { id: "leaderboard", type: "default", text: "🏆 Лидерборд" },
        { id: "share", type: "default", text: "📤 Поделиться" },
        { id: "cancel", type: "cancel", text: "Отмена" }
      ]
    }, (buttonId) => {
      switch (buttonId) {
        case "play": window.location.reload(); break;
        case "share": shareGame(); break;
      }
    });
  }, [isWebApp, shareGame]);

  return {
    user, isWebApp, isReady, shareResult, shareLeaderboard, shareGame,
    closeApp, showMainMenu, getScoreEmoji
  };
};
