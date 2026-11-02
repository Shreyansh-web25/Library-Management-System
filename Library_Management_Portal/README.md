# LibraDesk – Library Management Portal

A library management mini project built using Node.js, Express, MongoDB, HTML, CSS and JavaScript.

## Features
- Dashboard showing total, available and issued books
- Add, edit and delete book records
- Search by title, author, ISBN or category
- Track book status (Available / Issued)
- MongoDB database storage
- Responsive dashboard

## Requirements
- Node.js LTS
- MongoDB Community Server running locally, or MongoDB Atlas
- VS Code (recommended)

## Run on Windows
1. Extract the ZIP and open this folder in VS Code.
2. Open Terminal > New Terminal.
3. Run `npm install`.
4. Create a `.env` file in the root folder and add:

   ```env
   PORT=5001
   MONGODB_URI=mongodb://127.0.0.1:27017/library_portal
   ```

5. Start MongoDB.
6. Run `npm start`.
7. Open `http://localhost:5001`.

For MongoDB Atlas, replace the connection string with your own. Do not upload `.env` to GitHub.

## Database
Database: `library_portal`  
Collection: `books`

## API
| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/books` | List/search books |
| POST | `/api/books` | Add a book |
| PUT | `/api/books/:id` | Update a book |
| DELETE | `/api/books/:id` | Delete a book |

## Note
This is an educational project and does not include authentication or production security features. Use sample data for demonstrations.
