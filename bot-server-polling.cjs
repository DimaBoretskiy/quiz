const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 3000;

const BOT_TOKEN = "7557010853:AAFj5GmKw5V3mKStf_m9w752vg0bPVy1PSw";
const BOT_API_URL = `https://api.telegram.org/bot${BOT_TOKEN}`;

app.use(bodyParser.json());

let lastUpdateId = 0;

async function handleStartCommand(chatId, user) {
    const welcomeMessage = `🎯 <b>Добро пожаловать в QuizGo!</b>

👋 Привет, ${user.first_name || "Игрок"}!

🎮 <b>QuizGo</b> - это увлекательная викторина с таймером, где вы можете:
• Отвечать на 10 интересных вопросов
• Соревноваться с друзьями
• Попасть в лидерборд
• Играть прямо в Telegram!

🚀 Нажмите кнопку ниже, чтобы начать игру!`;
    
    const keyboard = {
        inline_keyboard: [[{
            text: "🎮 Играть в QuizGo",
            web_app: { url: "https://dimaboretskiy.github.io/quiz/" }
        }]]
    };
    
    await sendMessage(chatId, welcomeMessage, { reply_markup: keyboard });
}

async function sendMessage(chatId, text, options = {}) {
    try {
        const response = await fetch(`${BOT_API_URL}/sendMessage`, {
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

async function getUpdates() {
    try {
        const response = await fetch(`${BOT_API_URL}/getUpdates?offset=${lastUpdateId + 1}&timeout=30`);
        const data = await response.json();
        
        if (data.ok && data.result.length > 0) {
            for (const update of data.result) {
                lastUpdateId = update.update_id;
                
                if (update.message && update.message.text) {
                    const { chat, text, from } = update.message;
                    const chatId = chat.id;
                    
                    console.log("Получено сообщение:", { chatId, text, from: from.username });
                    
                    if (text && text.toLowerCase() === "/start") {
                        await handleStartCommand(chatId, from);
                    } else if (text && text.toLowerCase() === "/quiz") {
                        await handleStartCommand(chatId, from);
                    } else if (text && text.toLowerCase() === "/leaderboard") {
                        await sendMessage(chatId, "🏆 Лидерборд пока в разработке!");
                    } else if (text && text.toLowerCase() === "/help") {
                        await sendMessage(chatId, "❓ Используйте /start для начала игры!");
                    }
                }
            }
        }
    } catch (error) {
        console.error("Ошибка получения обновлений:", error);
    }
}

// Запускаем Long Polling
async function startPolling() {
    console.log("🔄 Запуск Long Polling...");
    while (true) {
        await getUpdates();
        await new Promise(resolve => setTimeout(resolve, 1000)); // Пауза 1 секунда
    }
}

app.get("/test", (req, res) => {
    res.json({ 
        message: "QuizGo Bot Server работает!", 
        botToken: BOT_TOKEN ? "Настроен" : "Не настроен",
        mode: "Long Polling"
    });
});

app.listen(PORT, async () => {
    console.log(`🚀 QuizGo Bot Server запущен на порту ${PORT}`);
    console.log(`🤖 Токен бота: ${BOT_TOKEN}`);
    console.log(`🌐 Тест: http://localhost:${PORT}/test`);
    console.log(`🔄 Режим: Long Polling (без webhook)`);
    
    // Запускаем Long Polling
    startPolling();
});
