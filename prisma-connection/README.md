# Practical 4 - Prisma Connection

## Project Title
**Connecting TikTok Backend to PostgreSQL with Prisma ORM**

## Folder Name
`prisma-connection`

## Module
**WEB102 - Server Application Fundamentals**

---

## Overview

This folder contains the Prisma connection setup for the TikTok backend practical. The main purpose of this practical was to move from simple in-memory data storage toward a proper PostgreSQL database connection using Prisma ORM.

In the earlier backend practicals, data was stored inside JavaScript arrays or mock data files. In this practical, Prisma was introduced so that the backend can communicate with a real relational database. This is important because a real application needs persistent data storage for users, videos, comments, likes, and followers.

---

## Practical Objectives

The main objectives of this practical were:

- Set up a PostgreSQL database for the TikTok clone application.
- Configure Prisma ORM to connect the backend with the database.
- Prepare the project for database migrations.
- Use environment variables to store the database connection string safely.
- Understand how Prisma schema files are used to define database models.
- Prepare the backend for persistent storage instead of only using in-memory data.

---

## Tools and Technologies Used

| Tool / Technology | Purpose |
|---|---|
| Node.js | Runtime environment for the backend project |
| Express | Backend framework for API development |
| CORS | Allows frontend and backend communication |
| PostgreSQL | Relational database used to store application data |
| Prisma ORM | Connects the Node.js backend to PostgreSQL |
| Prisma Client | Allows database queries using JavaScript/Node.js |
| dotenv / `.env` | Stores sensitive configuration like `DATABASE_URL` |
| GitHub | Version control and practical submission |

---

## Folder Structure

```text
prisma-connection/
├── prisma/
│   └── schema.prisma
├── .gitignore
├── package-lock.json
├── package.json
└── prisma.config.ts
```

### Main Files

| File | Description |
|---|---|
| `package.json` | Stores project details, dependencies, and scripts |
| `package-lock.json` | Locks exact installed package versions |
| `.gitignore` | Prevents `node_modules`, `.env`, and generated Prisma files from being pushed |
| `prisma.config.ts` | Loads the database connection from environment variables |
| `prisma/schema.prisma` | Defines the Prisma generator and PostgreSQL datasource |

---

## Dependencies

The project uses the following main dependencies:

```json
"dependencies": {
  "@prisma/client": "^7.7.0",
  "cors": "^2.8.6",
  "express": "^5.2.1"
},
"devDependencies": {
  "prisma": "^7.7.0"
}
```

If `dotenv` is not already installed and `prisma.config.ts` imports `dotenv/config`, install it using:

```bash
npm install dotenv
```

---

## Setup Instructions

### 1. Open the project folder

```bash
cd prisma-connection
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create PostgreSQL database

Open PostgreSQL or pgAdmin and create a database:

```sql
CREATE DATABASE tiktok_db;
```

If a separate database user is used, make sure that user has permission to access the database and schema.

### 4. Create `.env` file

Create a `.env` file inside the `prisma-connection` folder:

```env
DATABASE_URL="postgresql://tiktok_user:your_password@localhost:5432/tiktok_db?schema=public"
```

> Do not push the `.env` file to GitHub because it contains private database credentials.

### 5. Check Prisma configuration

In Prisma 7, the database URL is loaded from `prisma.config.ts` instead of being written directly inside `schema.prisma`.

Example from `prisma.config.ts`:

```ts
datasource: {
  url: process.env["DATABASE_URL"],
}
```

The Prisma schema uses PostgreSQL as the datasource provider:

```prisma
datasource db {
  provider = "postgresql"
}
```

### 6. Validate Prisma schema

```bash
npx prisma validate
```

This command checks whether the Prisma schema and configuration are valid.

### 7. Add database models

The current schema is the base Prisma setup. For the full TikTok backend, models should be added for resources such as:

- User
- Video
- Comment
- VideoLike
- CommentLike
- Follow

These models are needed before creating actual database tables.

### 8. Run migration after adding models

```bash
npx prisma migrate dev --name init
```

This command creates migration files, applies the migration to PostgreSQL, and prepares Prisma Client.

### 9. Generate Prisma Client

```bash
npx prisma generate
```

This prepares Prisma Client so the backend can query the database from JavaScript code.

---

## Implementation Summary

The implementation completed in this folder includes:

- Created a Node.js project for Prisma database connection.
- Installed Prisma and Prisma Client.
- Created the `prisma` folder and `schema.prisma` file.
- Configured PostgreSQL as the database provider.
- Added `prisma.config.ts` to read `DATABASE_URL` from environment variables.
- Added `.gitignore` to protect `.env`, `node_modules`, and generated Prisma files.
- Prepared the project for migration and future database models.

---

## Functional Requirements Covered

| Requirement | Status |
|---|---|
| PostgreSQL database connection setup | Prepared |
| Prisma ORM installed | Completed |
| Prisma schema created | Completed |
| Environment variable connection setup | Prepared |
| Migration workflow prepared | Completed |
| Full TikTok schema models | To be added before full migration |
| Backend controllers using Prisma | To be integrated with main server folder |

---

## Testing and Verification

The following checks can be used to verify the Prisma connection setup:

```bash
npm install
npx prisma validate
npx prisma migrate dev --name init
npx prisma generate
```

Expected results:

- Dependencies install without errors.
- Prisma schema validates successfully.
- Database migration runs after models are added.
- Prisma Client is generated successfully.
- PostgreSQL database receives the generated tables after migration.

---

## Screenshot Checklist

The following screenshots can be added to the practical report or GitHub folder:

| Screenshot | What to Capture |
|---|---|
| `01-folder-structure.png` | `prisma-connection` folder showing Prisma files |
| `02-package-json.png` | Installed Prisma dependencies in `package.json` |
| `03-env-example.png` | `.env` structure without exposing real password |
| `04-schema-prisma.png` | `schema.prisma` file showing PostgreSQL datasource |
| `05-prisma-config.png` | `prisma.config.ts` loading `DATABASE_URL` |
| `06-prisma-validate.png` | Terminal output after `npx prisma validate` |
| `07-prisma-migrate.png` | Terminal output after successful migration |
| `08-postgres-database.png` | PostgreSQL or pgAdmin showing the database/tables |

---

## Challenges Faced

### 1. Understanding Prisma configuration

The main challenge was understanding how Prisma connects to PostgreSQL using the schema file and environment variables.

**Solution:** The database URL was kept inside `.env`, while `prisma.config.ts` was used to load it safely.

### 2. Prisma version difference

Prisma 7 uses a slightly different configuration style compared to older versions. Instead of placing the database URL directly inside `schema.prisma`, it is loaded through the Prisma configuration file.

**Solution:** The project uses `prisma.config.ts` to read `process.env["DATABASE_URL"]`.

### 3. Database permissions

A PostgreSQL user must have permission to access the database and schema. Without permission, migration commands can fail.

**Solution:** The correct database user and database permissions should be checked before running migrations.

---

## Learning Outcomes

After completing this practical, I learned:

- How Prisma ORM helps connect a Node.js backend to PostgreSQL.
- Why real databases are better than in-memory arrays for persistent storage.
- How `.env` files protect sensitive connection details.
- How Prisma schema files are used to define database structure.
- How migrations help track and apply database changes.
- How Prisma Client can later be used inside controllers to query users, videos, comments, likes, and followers.

---

## Conclusion

This practical introduced the database layer of the TikTok backend application. The `prisma-connection` folder sets up the foundation for connecting the backend to PostgreSQL using Prisma ORM. Even though the full TikTok models still need to be added before complete migration, this folder prepares the required configuration, Prisma schema, and database connection workflow needed for persistent backend data storage.

---

## References

- Prisma Documentation: https://www.prisma.io/docs
- PostgreSQL Documentation: https://www.postgresql.org/docs
- Express Documentation: https://expressjs.com
- Practical 4 PDF: Connecting TikTok to PostgreSQL with Prisma ORM
