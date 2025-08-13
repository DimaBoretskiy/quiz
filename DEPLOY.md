# 🚀 Развертывание QuizGo Bot в облаке

## Вариант 1: Render.com (Бесплатно)

1. **Зарегистрируйтесь** на [render.com](https://render.com)
2. **Подключите** ваш GitHub репозиторий
3. **Создайте** новый Web Service
4. **Выберите** репозиторий `quiz`
5. **Настройте:**
   - Build Command: `npm install`
   - Start Command: `node bot-server-polling.cjs`
   - Environment: `Node`
6. **Нажмите** Create Service

## Вариант 2: Railway.app (Бесплатно)

1. **Зарегистрируйтесь** на [railway.app](https://railway.app)
2. **Подключите** GitHub репозиторий
3. **Создайте** новый проект
4. **Выберите** репозиторий `quiz`
5. **Автоматически** определит Node.js

## Вариант 3: Heroku (Платно)

1. **Установите** Heroku CLI
2. **Создайте** приложение: `heroku create quizgo-bot`
3. **Добавьте** переменные окружения
4. **Разверните:** `git push heroku main`

## После развертывания:

1. **Получите URL** вашего сервера (например: `https://quizgo-bot.onrender.com`)
2. **Обновите webhook** в Telegram:
   ```bash
   curl -X POST "https://api.telegram.org/bot7557010853:AAFj5GmKw5V3mKStf_m9w752vg0bPVy1PSw/setWebhook" \
   -H "Content-Type: application/json" \
   -d '{"url": "https://quizgo-bot.onrender.com/webhook"}'
   ```

## Результат:

✅ **Бот работает** 24/7 без вашего компьютера  
✅ **Доступен** с любого устройства  
✅ **Автоматически** обновляется при push в GitHub  

## Рекомендация:

Используйте **Render.com** - самый простой и бесплатный вариант!
