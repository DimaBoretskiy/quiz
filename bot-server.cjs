const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 3000;

const BOT_TOKEN = "7557010853:AAFj5GmKw5V3mKStf_m9w752vg0bPVy1PSw";
const BOT_API_URL = `https://api.telegram.org/bot${BOT_TOKEN}`;

app.use(bodyParser.json());

async function handleStartCommand(chatId, user) {
    const welcomeMessage = `🎯 <b>Добро пожаловать в QuizGo!</b>

👋 Привет, ${user.first_name || "Игрок"}!

🎮 <b>QuizGo</b> - это увлекательная викторина с таймером!

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

app.post("/webhook", async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) return res.status(200).send("OK");
        
        const { chat, text, from } = message;
        const chatId = chat.id;
        
        console.log("Получено сообщение:", { chatId, text, from: from.username });
        
        if (text && text.toLowerCase() === "/start") {
            await handleStartCommand(chatId, from);
        }
        
        res.status(200).send("OK");
    } catch (error) {
        console.error("Ошибка обработки сообщения:", error);
        res.status(500).send("Error");
    }
});

app.get("/test", (req, res) => {
    res.json({ message: "QuizGo Bot Server работает!", botToken: BOT_TOKEN ? "Настроен" : "Не настроен" });
});

app.listen(PORT, async () => {
    console.log(`🚀 QuizGo Bot Server запущен на порту ${PORT}`);
    console.log(`🤖 Токен бота: ${BOT_TOKEN}`);
    console.log(`🌐 Тест: http://localhost:${PORT}/test`);
});
