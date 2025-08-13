const fetch = require("node-fetch");

const BOT_TOKEN = "7557010853:AAFj5GmKw5V3mKStf_m9w752vg0bPVy1PSw";
const BOT_API_URL = `https://api.telegram.org/bot${BOT_TOKEN}`;

let lastUpdateId = 0;

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
        const result = await response.json();
        if (result.ok) {
            console.log(`✅ Сообщение отправлено в чат ${chatId}`);
        } else {
            console.error(`❌ Ошибка отправки:`, result);
        }
        return result;
    } catch (error) {
        console.error("❌ Ошибка отправки сообщения:", error);
        throw error;
    }
}

async function getUpdates() {
    try {
        const response = await fetch(`${BOT_API_URL}/getUpdates?offset=${lastUpdateId + 1}&timeout=30`);
        const result = await response.json();
        
        if (result.ok && result.result.length > 0) {
            for (const update of result.result) {
                await processUpdate(update);
                lastUpdateId = update.update_id;
            }
        }
    } catch (error) {
        console.error("❌ Ошибка получения обновлений:", error);
    }
}

async function processUpdate(update) {
    if (!update.message) return;
    
    const { message } = update;
    const { chat, text, from } = message;
    const chatId = chat.id;
    
    console.log(`📨 Получено сообщение от ${from.username || from.first_name}: ${text}`);
    
    if (text && text.toLowerCase() === "/start") {
        await handleStartCommand(chatId, from);
    }
}

async function main() {
    console.log("🤖 QuizGo Bot запущен в режиме polling...");
    console.log("📱 Отправьте /start в чат с ботом для тестирования");
    console.log("⏹️  Нажмите Ctrl+C для остановки");
    
    setInterval(getUpdates, 1000);
}

main().catch(console.error);
