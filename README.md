# EDR Microfrontends

Учебный проект для демонстрации **Webpack Module Federation** на примере интерфейса EDR
(Endpoint Detection and Response). Четыре независимых приложения объединены в одном интерфейсе.

**Стек:** React, TypeScript, Webpack, React Router, SCSS.

## Приложения

| Приложение | Назначение | Локальный адрес |
| --- | --- | --- |
| `shell` | Каркас, маршрутизация и загрузка микрофронтендов | http://localhost:3010 |
| `sidebar` | Навигация | http://localhost:3011 |
| `agents` | Раздел «Агенты» | http://localhost:3012 |
| `incidents` | Раздел «Инциденты» | http://localhost:3013 |

Каждое приложение устанавливается и собирается отдельно. Shell загружает микрофронтенды
во время работы через Module Federation. При ошибке кнопка «Обновить» перезагружает
страницу и повторяет подключение микрофронтендов.

## Запуск

Нужны Node.js и npm. Проект проверен на Node.js 24.
Команды выполняются из корня репозитория.

Установить зависимости:

```sh
npm --prefix shell ci
npm --prefix sidebar ci
npm --prefix agents ci
npm --prefix incidents ci
```

Запустить каждую команду в **отдельном терминале**:

```sh
npm --prefix shell run dev
npm --prefix sidebar run dev
npm --prefix agents run dev
npm --prefix incidents run dev
```

Открыть http://localhost:3010. Страницы: `/`, `/agents`, `/incidents`.

## Проверка и сборка

В папке каждого приложения доступны команды:

```sh
npm run typecheck
npm run build
```

Сборка сохраняется в `dist` соответствующего приложения.
Адреса микрофронтендов задаются в `remotes` в `shell/webpack.config.js`.
