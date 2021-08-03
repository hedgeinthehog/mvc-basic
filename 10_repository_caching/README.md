## Setup
1. Copy `example.env` to `.env` and update variables
2. Execute migrations (?) `node runDbMigrations.js` or `npm run migrations`
3. Run application `node server.js` or `npm run start`

## Changes
1. Added caching for `FileStorage`
2. Added `DbStorage` with `mysql2` library
3. Added migration files and script
4. Changed storage from `file` to `db` in `StudentsRepository`
5. Added `dotenv` library to handle secrets inside `process.env`
6. Added `BaseStorage` class which serves as interface for any `Storage` implementation