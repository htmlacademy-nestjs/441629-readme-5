# Личный проект «Readme»

* Студент: [Дамир Масалимов](https://up.htmlacademy.ru/nodejs-2/5/user/441629).
* Наставник: [Андрей Осипук](https://up.htmlacademy.ru/nodejs-2/5/user/616431).

---

_Не удаляйте и не изменяйте папки и файлы:_
_`.editorconfig`, `.gitattributes`, `.gitignore`._

---

## Памятка

### 1. Установите все пакеты, находясь в директории project

```
cd project
npm i
```

### 2. Создайте .env файлы (скопируйте из .env-example) для каждого из приложений: users, blog, file-vault, notify, api

### 3. Создайте docker контейнеры для каждого из приложений

```
docker-compose \
--file ./apps/[users|blog|file-vault|notify]/docker-compose.dev.yml \
--env-file ./apps/[users|blog|file-vault|notify]/.env \
--project-name "readme-[users|blog|file-vault|notify]" \
up -d
```

### 4. Смигрируйте модель для prisma ORM

```
npx prisma migrate dev \                                                 
--name "Migrate models for project" \
--schema ./libs/shared/blog/models/prisma/schema.prisma \
--skip-generate
```

### 5. Произведите генерацию и сидирование базы (при необходимости)

```
nx run blog:db:generate
nx run blog:db:seed
```

### 6. Произведите форматирование prisma-cli

```
npx prisma format --schema ./libs/shared/blog/models/prisma/schema.prisma
```

### 7. Запустите все приложения

```
nx serve notify
nx serve users
nx serve file-vault
nx serve blog
nx serve api
```

## 7.1 API будет доступно по адресу:

```
http://localhost:4000/api
```

## 7.2 Отдельные приложения:

# Users
```
http://localhost:3000/api
```

# Notify
```
http://localhost:3010/api
```

# File-vault
```
http://localhost:3020/api
```

# Blog
```
http://localhost:3030/api
```
