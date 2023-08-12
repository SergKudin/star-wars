# Документація SWAPI API

## Опис Проекту
Проект SWAPI - це RESTful API, яке надає доступ до даних про фільми "Зоряних воєн". Основна мета проекту - навчитися реалізовувати подібний функціонал з використанням таких інструментів, як Nest, Swagger, TypeORM та інших для створення бекенду для інформаційного сайту про всесвіт "Зоряних воєн". Інтерфейс сайту відображає бачення автора про реалізацію подібного функціоналу.

## Swagger Документація
Детальна документація API знаходиться на сторінці Swagger (Доступна після запуску проекту): [http://localhost:3000/api#/](http://localhost:3000/api#/)

## Огляд Ендпоінтів

### People
- `GET /people/page/{page}` - Повертає сторінку з об'єктами People з розміром сторінки PAGE_LIMIT. За замовчуванням PAGE_LIMIT = 10. {page} в даному випадку це номер сторінки.
- `GET /people/{id}` - Повертає об'єкт People з вказаним ID. Тут, і надалі {id} - це значення відповідного поля об'єкту (в даному випадку даних про конкретного персонажа), що нас цікавить.
- `GET /people/list-removed` - Повертає список видалених об'єктів, що доступні до відновлення. Для редакторів та адміністраторів.
- `POST /people` - Створює об'єкт People. Посилання на інші об'єкти формується на базі інформації з поля url. Для редакторів та адміністраторів.
- `POST /people/restore/{id}` - Відновлює об'єкт People з вказаним ID. Для редакторів та адміністраторів.
- `PATCH /people/{id}` - Оновлює об'єкт People з вказаним ID. Для редакторів та адміністраторів.
- `DELETE /people/remove/{id}` - Видаляє (софтово) об'єкт People з вказаним ID (soft-delete). Для редакторів та адміністраторів.

Ендпоінти для Films, Starships, Vehicles, Species, Planets мають аналогічну структуру.

### Migration
(Доступно лише адміністратору)
- `GET /migration` - Повертає всі доступні записи з серверу SWAPI (Star Wars API) про персонажів (People), планети (Planets), фільми (Films), види (Species), транспортні засоби (Vehicles) та зіркові кораблі (Starships).
- `GET /migration/people` - Повертає всі доступні записи з серверу SWAPI про персонажів (People).
- `GET /migration/planets` - Повертає всі доступні записи з серверу SWAPI про планети (Planets).
- `GET /migration/films` - Повертає всі доступні записи з серверу SWAPI про фільми (Films).
- `GET /migration/species` - Повертає всі доступні записи з серверу SWAPI про види (Species).
- `GET /migration/vehicles` - Повертає всі доступні записи з серверу SWAPI про транспортні засоби (Vehicles).
- `GET /migration/starships` - Повертає всі доступні записи з серверу SWAPI про зоряні кораблі (Starships).
- `POST /migration/createAll` - Видаляє усі існуючі записи з поточної БД для People, Films, Starships, Vehicles, Species, Planets, Photo, видаляє усі збережені файли зображень, після чого створює об'єкти People, Films, Starships, Vehicles, Species, Planets в базі даних шляхом отримання даних з серверу SWAPI. Міграції початкових даних для об'єкту Photo не передбачені.
  (В env можна увімкнути режим емуляції отримання даних з серверу SWAPI)

### Photo
- `GET /photo/page/{page}` - Повертає сторінку з інформацією про фото з розміром сторінки PAGE_LIMIT. За замовчуванням PAGE_LIMIT = 10.
- `GET /photo/{id}` - Повертає інформацію про фото за вказаним ID.
- `GET /photo/{id}/file` - Повертає файл зображення (фото) за вказаним ID.
- `GET /photo/list-removed` - Повертає список видалених елементів, що доступні для відновлення.
- `POST /photo/upload-file` - Завантажує зображення (фото).
- `POST /photo/restore/{id}` - Відновлює фото з вказаним ID.
- `PATCH /photo/{id}` - Оновлює інформацію про фото з вказаним ID.
- `DELETE /photo/{id}` - Видаляє (софтово) зображення (фото) з вказаним ID.
- `DELETE /photo/removeAll` - Видаляє всі файли та записи про зображення (фото).

## Формати Відповіді

```typescript
interface myResponse<T extends People | Planet | Films | Species | Vehicles | Starships | Photo | SwapiResponse<People> | SwapiResponse<Planet> | SwapiResponse<Films> | SwapiResponse<Species> | SwapiResponse<Vehicles> | SwapiResponse<Starships> | SwapiResponse<Photo>> {
  data?: T,
  error?: string,
  message?: string[],
}

interface SwapiResponse<T extends People | Planet | Films | Species | Vehicles | Starships | Photo> {
  count: number,
  next: string,
  previous: string,
  results: T[]
}
```

## Аутентифікація та Безпека
Наразі аутентифікація та безпека в проекті не реалізовані.

## Приклади Запитів та Відповідей

### Коректний Запит:
```bash
curl -X 'GET' \
  'http://localhost:3000/people/1' \
  -H 'accept: */*'
```

Відповідь:
```json
{
  "data": {
    "_id": 1,
    "name": "Luke Skywalker",
    "birth_year": "19BBY",
    ...
  }
}
```

### Запит з Помилкою (Наприклад, неіснуючий id):
```bash
curl -X 'GET' \
  'http://localhost:3000/people/110' \
  -H 'accept: */*'
```

Від

повідь:
```json
{
  "error": "NotFoundException: Bad request! Check You data: id 110 not find"
}
```

### Запит за яким ми отримуємо Відповідь з Полем Message:
```bash
curl -X 'POST' \
  'http://localhost:3000/migration/createAll' \
  -H 'accept: */*' \
  -d ''
```

Відповідь:
```json
{
  "message": [
    "Removing all data from the database: true",
    ...
  ]
}
```

## Рекомендації Дій для Початку Роботи

На початку роботи рекомендується виконати наступні кроки:

1. Запустити БД, забезпечити можливість доступу до неї за налаштуваннями, вказаними в константах:
   - DATABASE_HOST
   - DATABASE_PORT
   - DATABASE_USER
   - DATABASE_PASS
   - DATABASE_NAME

2. Оскільки БД порожня, для створення таблиць з терміналу виконайте команду:
   ```bash
   npm run migration:run
   ```

3. Скомпілюйте та запустіть проект:
   - За допомогою Docker Compose:
     ```bash
     docker-compose up --build
     ```
   - На хостовій машині:
     ```bash
     npm run start:dev
     ```
   **Зверніть увагу:** Перед запуском переконайтеся, що відповідні порти вільні!

4. Перейти за посиланням [http://localhost:3000/api#/](http://localhost:3000/api#/) для доступу до сторінки з документацією, згенерованою Swagger.

5. Виконати запит для наповнення БД інформацією:
   ```bash
   curl -X 'POST' \
     'http://localhost:3000/migration/createAll' \
     -H 'accept: */*' \
     -d ''
   ```

6. Продовжити ознайомлення з функціоналом API на сторінці документації.