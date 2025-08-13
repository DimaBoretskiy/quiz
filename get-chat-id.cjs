const https = require("https");

const BOT_TOKEN = "7557010853:AAFj5GmKw5V3mKStf_m9w752vg0bPVy1PSw";
const BOT_API_URL = `https://api.telegram.org/bot${BOT_TOKEN}`;

function makeRequest(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = "";
            res.on("data", (chunk) => {
                data += chunk;
            });
            res.on("end", () => {
                try {
                    resolve(JSON.parse(data));
                } catch (error) {
                    reject(error);
                }
            });
        }).on("error", reject);
    });
}

async function getUpdates() {
    try {
        console.log("🔍 Получаем обновления от бота...");
        console.log("📱 Отправьте ЛЮБОЕ сообщение в чат с ботом @quiztest12_bot");
        
        const result = await makeRequest(`${BOT_API_URL}/getUpdates`);
        
        if (result.ok && result.result.length > 0) {
            console.log("\n📨 Найдены сообщения:");
            result.result.forEach((update, index) => {
                if (update.message) {
                    const { chat, from, text } = update.message;
                    console.log(`\n${index + 1}. Сообщение от: ${from.first_name} (@${from.username || "без username"})`);
                    console.log(`   Chat ID: ${chat.id}`);
                    console.log(`   Текст: ${text || "без текста"}`);
                }
            });
            
            console.log("\n🎯 Ваш Chat ID для тестирования:");
            const lastMessage = result.result[result.result.length - 1];
            if (lastMessage.message) {
                console.log(`   ${lastMessage.message.chat.id}`);
            }
        } else {
            console.log("❌ Сообщений не найдено");
            console.log("💡 Отправьте сообщение в чат с ботом и запустите скрипт снова");
        }
    } catch (error) {
        console.error("❌ Ошибка получения обновлений:", error);
    }
}

getUpdates();
