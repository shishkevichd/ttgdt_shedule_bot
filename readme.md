# TTGDT Shedule Bot

Бот, предназначенный для получения расписания/замен в Томском техникуме железнодорожного транспорта.

## Планы

- [X] Получение расписания по группам
- [ ] Получения замен по группам
- [ ] Настройки бота
- [ ] Парсинг данных в фоне
- [ ] **Inline-режим**

## Развертывание (Docker)

1. Клонируйте репозиторий

```bash
$ git clone https://github.com/shishkevichd/ttgdt_shedule_bot
$ cd ttgdt_shedule_bot
```

2. Соберите образ Docker

```bash
$ docker build -t ttgdtSheduleBot
```

3. Создайте в отдельной директории (например `shedulebot`) файл `compose.yml` со следующим содержанием

```yaml
services:
  bot:
    container_name: ttgdt_shedule_bot
    image: ttgdtSheduleBot
    restart: unless-stopped
    environment:
      - ENV_TG_TOKEN=1111111111:AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
      - ENV_TG_ADMINID=111111111
```

4. Запустите бота

```bash
$ docker compose up -d
```

####

## Развертывание (вручную)

1. Установите необходимые зависимости

⚠️ Требуется NodeJS версии 22.X.X и выше

```sh
$ npm install
```

2. Создайте файл `.env` со следующим содержанием

```text
ENV_TG_TOKEN="1111111111:AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" <- токен бота
ENV_TG_ADMINID=11111111 <- id пользователя telegram
```

3. Запустите бота

```sh
$ npm run start:with-env
```