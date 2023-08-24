# SWAPI API Documentation

## Project Description
SWAPI Project is a RESTful API that provides access to "Star Wars" movie data. The main goal of the project is to learn how to implement similar functionality using tools like Nest, Swagger, TypeORM, and others to create a backend for an informational website about the "Star Wars" universe. The website's interface reflects the author's vision of implementing such functionality.

## Swagger Documentation
Detailed API documentation can be found on the Swagger page (available after project launch): [http://localhost:4000/api#/](http://localhost:4000/api#/)

## Endpoint Overview

### People
- `GET /people/page/{page}` - Returns a page of People objects with a page size of PAGE_LIMIT. Default PAGE_LIMIT = 10. Here, `{page}` refers to the page number.
- `GET /people/{id}` - Returns a People object with the specified ID. Here, `{id}` refers to the relevant object's ID.
- `GET /people/list-removed` - Returns a list of removed objects available for restoration. For editors and administrators.
- `POST /people` - Creates a People object. Links to other objects are formed based on information from the URL field. For editors and administrators.
- `POST /people/restore/{id}` - Restores a People object with the specified ID. For editors and administrators.
- `PATCH /people/{id}` - Updates a People object with the specified ID. For editors and administrators.
- `DELETE /people/remove/{id}` - Soft-deletes a People object with the specified ID. For editors and administrators.

Endpoints for Films, Starships, Vehicles, Species, Planets have the same structure.

### Migration
(Available to administrators only)
- `GET /migration` - Returns all available records from the SWAPI (Star Wars API) server about characters (People), planets (Planets), films (Films), species (Species), vehicles (Vehicles), and starships (Starships).
- `GET /migration/people` - Returns all available records from the SWAPI server about characters (People).
- `GET /migration/planets` - Returns all available records from the SWAPI server about planets (Planets).
- `GET /migration/films` - Returns all available records from the SWAPI server about films (Films).
- `GET /migration/species` - Returns all available records from the SWAPI server about species (Species).
- `GET /migration/vehicles` - Returns all available records from the SWAPI server about vehicles (Vehicles).
- `GET /migration/starships` - Returns all available records from the SWAPI server about starships (Starships).
- `POST /migration/createAll` - Deletes all existing records for People, Films, Starships, Vehicles, Species, Planets, Photo, deletes all saved image files, and then creates People, Films, Starships, Vehicles, Species, Planets objects in the database by retrieving data from the SWAPI server. Initial data migrations for the Photo object are not provided.
(Emulation mode for SWAPI data retrieval can be enabled in env)

### Photo
- `GET /photo/page/{page}` - Returns a page of photo information with a page size of PAGE_LIMIT. Default PAGE_LIMIT = 10.
- `GET /photo/{id}` - Returns information about a photo with the specified ID.
- `GET /photo/{id}/file` - Returns the image (photo) file with the specified ID.
- `GET /photo/list-removed` - Returns a list of removed items available for restoration.
- `POST /photo/upload-file` - Uploads an image (photo).
- `POST /photo/restore/{id}` - Restores a photo with the specified ID.
- `PATCH /photo/{id}` - Updates information about a photo with the specified ID.
- `DELETE /photo/{id}` - Soft-deletes an image (photo) with the specified ID.
- `DELETE /photo/removeAll` - Deletes all files and records of images (photos).

## Response Formats

```typescript
interface MyResponse<T extends People | Planet | Films | Species | Vehicles | Starships | Photo | SwapiResponse<People> | SwapiResponse<Planet> | SwapiResponse<Films> | SwapiResponse<Species> | SwapiResponse<Vehicles> | SwapiResponse<Starships> | SwapiResponse<Photo>> {
  data?: T,
  error?: string,
  message?: string[],
}

interface SwapiResponse<T extends People | Planet | Films | Species | Vehicles | Starships | Photo>  {
  count: number,
  next: string,
  previous: string,
  results: T[]
}
```

More detailed descriptions of these and other formats are provided on the Swagger page (available after project launch): [http://localhost:4000/api#/](http://localhost:4000/api#/)

## Authentication and Security
The system provides authentication and role-based access.

### Authorization via JWT Tokens
After authorization, please add the received JWT token to the authorization header in Swagger to gain access to protected resources.

### Roles and Permissions
The system utilizes two roles: 'admin' and 'user'.
  The 'user' role has access solely for viewing general information.
  The 'admin' role has full access to all application functionalities.
### User Accounts
Each user can create their own user account. However, only the 'admin' can modify roles of other users.

### Initial Setup
During the first application launch, an account with the 'admin' role is automatically created:
  Email: 'master@admin.ua'
  Password: '123456'

### Changing Password
After the first launch, we recommend changing the password for the 'master@admin.ua' account to enhance access security.

## Examples of Requests and Responses

Here are a few examples of working with the API:

Valid Request:
```bash
curl -X 'GET' \
  'http://localhost:4000/people/1' \
  -H 'accept: */*'
```
Response:
```json
{
  "data": {
    "_id": 1,
    "name": "Luke Skywalker",
    ...
  }
}
```

### Request with Error (e.g., non-existent id):
```bash
curl -X 'GET' \
  'http://localhost:4000/people/110' \
  -H 'accept: */*'
```
Response:
```json
{
  "error": "NotFoundException: Bad request! Check Your data: id 110 not found"
}
```

### Request with Message Response:
```bash
curl -X 'POST' \
  'http://localhost:4000/migration/createAll' \
  -H 'accept: */*' \
  -d ''
```
Response:
```json
{
  "message": [
    "Removing all data from the database: true",
    ...
  ]
}
```

## Getting Started Recommendations

To begin working with the project, follow these steps:

1. Start the database and ensure access with the settings provided in the constants:
   - DATABASE_HOST
   - DATABASE_PORT
   - DATABASE_USER
   - DATABASE_PASS
   - DATABASE_NAME

2. Since the database is empty, use the following command to create tables from the terminal:
   ```bash
   npm run migration:run
   ```

3. Compile and start the project, for example:
   - Using Docker:
     ```bash
     docker-compose up --build
     ```
   - On the host machine:
     ```bash
     npm run start:dev
     ```
   **Note:** Make sure that the ports used by the project are available at the time of launch.

4. Access the Swagger documentation page at [http://localhost:4000/api#/](http://localhost:4000/api#/).

5. Execute the following request to populate the database with information:
   ```bash
   curl -X 'POST' \
     'http://localhost:4000/migration/createAll' \
     -H 'accept: */*' \
     -d ''
   ```

6. Continue exploring the API's functionality on the documentation page.
