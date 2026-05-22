# Avensio Marketplace MVP

Проект содержит backend на Next.js (`apps/web`) и простой набор статических HTML-страниц (`static`) для демонстрации минимальных пользовательских сценариев.

## Что уже есть для минимально-работоспособной версии

### Пользовательские сценарии
1. Зарегистрироваться на сайте: `register.html` (вызов `POST /api/auth/register`, есть fallback в localStorage).
2. Выбрать товар: `catalog.html` (загрузка из `GET /api/products`, при недоступности API используются демо-товары).
3. Добавить товар в корзину: кнопка на карточке товара, корзина хранится в localStorage.
4. Просмотреть корзину: `cart.html` (отрисовка состава и суммы заказа).

### Основные файлы фронта (HTML)
- `index.html` — стартовая страница с переходом по сценариям.
- `register.html` — форма регистрации.
- `catalog.html` — страница выбора товара.
- `cart.html` — страница корзины.
- `app.js` — клиентская логика регистрации/каталога/корзины.
- `styles.css` — базовые стили.

## Backend (apps/web)
Доступны route handlers:
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/products`
- `GET /api/products/:id`

Схема БД (`apps/web/prisma/schema.prisma`) уже содержит модели для пользователей, товаров и корзины.

## Как запустить

### Вариант 1: только статический MVP
Откройте `index.html` в браузере (или поднимите любой static server).

### Вариант 2: полный режим (static + API)
```bash
cd apps/web
npm i
npm run prisma:generate
npm run dev
```
После этого static-страницы смогут получать реальные товары и выполнять регистрацию через API.
