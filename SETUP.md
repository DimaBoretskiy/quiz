# 🚀 Быстрый старт QuizGo TMA

## 📋 Что уже готово

✅ **Структура проекта** - все папки и файлы созданы  
✅ **Компоненты** - Button, Timer, ProgressBar  
✅ **Экраны** - Start, Question, Results, Leaderboard  
✅ **Роутинг** - React Router настроен  
✅ **Tailwind CSS** - стили и конфигурация  
✅ **Telegram SDK** - интеграция с @twa-dev/sdk  

## 🎯 Что реализовано

### **Экраны:**
- **StartScreen** (`/`) - логотип, название, кнопки "Играть" и "Правила"
- **QuestionScreen** (`/question`) - вопрос, таймер, 4 варианта ответа
- **ResultsScreen** (`/results`) - результат, счёт, кнопки "Играть ещё раз" и "Лидерборд"
- **LeaderboardScreen** (`/leaderboard`) - топ-8 игроков с цветовым выделением

### **Компоненты:**
- **Button** - primary (жёлтая) и secondary (синий контур)
- **Timer** - красный таймер с иконкой ⏰
- **ProgressBar** - прогресс "Вопрос X из 10"

### **Дизайн:**
- Размер: 375×812 px (мобильный)
- Цвета: синий #1976D2 + жёлтый #FFD600
- Шрифт: Inter (Google Fonts)
- Стиль: минимализм + закругления

## 🛠 Запуск проекта

1. **Перейти в папку проекта:**
   ```bash
   cd quizgo-tma
   ```

2. **Установить зависимости:**
   ```bash
   npm install
   ```

3. **Запустить в режиме разработки:**
   ```bash
   npm run dev
   ```

4. **Открыть в браузере:**
   ```
   http://localhost:5173
   ```

## 📱 Тестирование

### **Навигация:**
- `/` → StartScreen
- `/question` → QuestionScreen  
- `/results` → ResultsScreen
- `/leaderboard` → LeaderboardScreen

### **Telegram интеграция:**
- В консоли браузера будут данные пользователя (если запущено в TMA)
- Автоматическая настройка темы и цветов

## 🔧 Следующие шаги

### **Игровая логика:**
- [ ] API для вопросов
- [ ] Система подсчёта очков
- [ ] Таймер обратного отсчёта
- [ ] Валидация ответов

### **Улучшения UI:**
- [ ] Анимации переходов
- [ ] Состояния загрузки
- [ ] Обработка ошибок
- [ ] Адаптивность

### **Telegram функции:**
- [ ] Отправка результатов в чат
- [ ] Интеграция с Bot API
- [ ] Платежи (если нужно)
- [ ] Push-уведомления

## 🐛 Возможные проблемы

### **Tailwind не работает:**
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### **Telegram SDK ошибки:**
- Проверить версию @twa-dev/sdk
- Убедиться, что запущено в Telegram

### **Стили не применяются:**
- Проверить импорт index.css в main.jsx
- Перезапустить dev сервер

## 📚 Полезные ссылки

- [Telegram Mini Apps](https://core.telegram.org/bots/webapps)
- [@twa-dev/sdk](https://github.com/twa-dev/twa-dev-sdk)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)

---

**🎉 Проект готов к разработке!**
