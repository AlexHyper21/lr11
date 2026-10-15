# ЛР 11 — базовые меры безопасности (XSS, Helmet, CSP)

Full-stack приложение «пиксельмаркет» (вариант 3): `server` — Express + MongoDB, `client` — React (Vite). Вектор атаки — поле «Отзыв о товаре».

## Меры защиты

- **Sanitization** на бэкенде: `express-validator` (валидация) + `sanitize-html` (очистка). В тексте отзыва разрешены только `<b> <i> <em> <strong> <br>` без атрибутов, имя автора очищается от любых тегов (`server/src/routes/reviewRoutes.js`, `server/src/middleware/security.js`).
- **HTTP-заголовки** через Helmet.js: `X-Frame-Options`, `Strict-Transport-Security`, `X-Content-Type-Options`, `Referrer-Policy`, `Cross-Origin-*` и др.
- **Content Security Policy**: `script-src 'self'`, `object-src 'none'`, `frame-ancestors 'none'` и др.

Переменная `SECURITY_ENABLED` в `server/.env` включает (`true`) или выключает (`false`) защиту — для демонстрации атаки «до» и «после».

## Запуск

1. MongoDB должен быть запущен (см. ЛР 8), строка подключения — в `server/.env`.
2. Сборка клиента:

```bash
cd client
npm install
npm run build
```

3. Сервер (отдаёт API и собранный клиент):

```bash
cd ../server
npm install
npm run seed
npm start
```

Открыть http://localhost:5000 → карточка товара → раздел «Отзывы о товаре».

Режим разработки клиента (`npm run dev` в `client`, http://localhost:5173) проксирует `/api` на сервер, но заголовки CSP применяются только при открытии через сервер (порт 5000).

## Демонстрация

1. `SECURITY_ENABLED=false`, перезапустить сервер, отправить отзыв:

```
Отличный набор! <img src=x onerror="alert('XSS PoC')">
```

Скрипт выполнится — уязвимость есть.

2. `SECURITY_ENABLED=true`, перезапустить сервер, отправить тот же отзыв — сохранится только «Отличный набор!», атрибут `onerror` удалён. Ранее сохранённый вредоносный отзыв не выполнится благодаря CSP (в консоли — сообщение о блокировке inline-обработчика).

3. DevTools → Network → запрос к `localhost` → Response Headers: `Content-Security-Policy`, `X-Frame-Options`, `Strict-Transport-Security` и др.
