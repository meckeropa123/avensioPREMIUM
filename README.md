# Avensio Marketplace MVP

Full-stack MVP маркетплейса на Next.js + TypeScript + Prisma + PostgreSQL, рассчитанный на масштабирование.

## Архитектура
- `apps/web`: SSR frontend + REST API (Next Route Handlers)
- Prisma + PostgreSQL как transactional core
- Redis для cache/очередей (готово к BullMQ)
- MinIO/S3 для изображений
- RBAC: BUYER / SELLER / ADMIN
- API versioning: через префикс `/api` (готово к `/api/v1`)

## MVP функции
- JWT auth + refresh flow
- Каталог товаров, карточка товара, категории
- Корзина/заказы (схема БД готова)
- Интеграции-заглушки: YooKassa, Yandex Maps key, CDEK
- SEO/SSR foundation, middleware security headers
- OpenAPI заготовка `docs/openapi.yaml`

## Запуск
```bash
cp .env.example .env
docker-compose up --build
```

Локально:
```bash
cd apps/web
npm i
npm run prisma:generate
npm run dev
```

## Основные endpoints
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/products`
- `GET /api/products/:id`
- `POST /api/payments/create` (YooKassa)
- `POST /api/webhooks/yookassa`
- `POST /api/delivery/calculate` (CDEK)
- `GET /api/sdek/pvz`

## Масштабирование
- Вынос API в NestJS микросервисы без изменения доменных моделей Prisma
- Подключение очередей уведомлений/email/webhooks через Redis/BullMQ
- Добавление WebSocket gateway для realtime tracking/чатов
- CDN и object storage lifecycle policies
- Подключение observability (OpenTelemetry + Prometheus + Grafana)


## Быстрый запуск HTML/CSS версии
```bash
docker-compose up site
```
Откройте: `http://localhost:8080`

Файлы лендинга:
- `static/index.html`
- `static/styles.css`
