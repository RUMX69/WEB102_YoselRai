# Reflection - Practical 4 Prisma Connection

## Practical Title
**Connecting TikTok Backend to PostgreSQL with Prisma ORM**

## Folder Name
`prisma-connection`

---

## 1. Documentation

This practical focused on setting up a Prisma connection between a Node.js backend project and a PostgreSQL database. The main idea was to prepare the backend so that it can store data permanently instead of keeping everything inside temporary JavaScript arrays.

The practical introduced Prisma ORM, which works as a bridge between the backend code and the database. Instead of writing long SQL queries manually for every operation, Prisma allows the backend to interact with database tables using JavaScript code after the schema and client are generated.

The main files used in this folder are:

- `package.json` for project dependencies.
- `prisma/schema.prisma` for Prisma schema setup.
- `prisma.config.ts` for loading the database connection string.
- `.gitignore` for keeping private and generated files out of GitHub.

---

## 2. Concepts Applied

### PostgreSQL Database

PostgreSQL was used as the relational database for storing TikTok application data. A relational database is useful because data such as users, videos, comments, likes, and followers are connected to each other.

### Prisma ORM

Prisma ORM was used to connect the backend with PostgreSQL. It helps developers define database models in `schema.prisma` and then generate Prisma Client for database operations.

### Prisma Schema

The `schema.prisma` file is the main file where the database provider and models are defined. In this folder, PostgreSQL was set as the datasource provider. Later, TikTok models such as `User`, `Video`, `Comment`, `VideoLike`, and `Follow` can be added.

### Environment Variables

The database connection string was planned to be stored inside a `.env` file. This is important because database usernames and passwords should not be pushed to GitHub.

Example:

```env
DATABASE_URL="postgresql://tiktok_user:your_password@localhost:5432/tiktok_db?schema=public"
```

### Migration

Migration is used to convert Prisma models into actual database tables. After models are added, the command below can be used:

```bash
npx prisma migrate dev --name init
```

This helps keep track of database structure changes as the project grows.

---

## 3. What I Learned

From this practical, I learned that backend applications need a proper database when the data must be saved permanently. In-memory data is easy for testing, but it disappears when the server restarts. PostgreSQL solves this problem by storing data permanently.

I also learned that Prisma makes database work easier because it reduces the need to write raw SQL for every operation. By using Prisma schema and Prisma Client, the backend can perform database queries in a cleaner and more organized way.

Another important thing I learned is the role of `.env` files. Sensitive details like database passwords should not be written directly in the code or uploaded to GitHub. Keeping them in `.env` makes the project safer.

---

## 4. Challenges Faced and Solutions

### Challenge 1: Understanding where to put the database URL

At first, it was confusing to understand whether the `DATABASE_URL` should be placed in `schema.prisma` or another file.

**Solution:** Since this project uses Prisma 7 style configuration, the database URL is loaded in `prisma.config.ts` using:

```ts
process.env["DATABASE_URL"]
```

The actual value is stored inside the `.env` file.

### Challenge 2: Understanding Prisma schema

The schema file was new to me because it is not normal JavaScript code. It uses Prisma syntax to describe the database structure.

**Solution:** I understood that the schema file is where database models will be written, and Prisma will use those models to create database tables during migration.

### Challenge 3: PostgreSQL permissions

Database connection and migration can fail if the PostgreSQL user does not have proper permission.

**Solution:** The database name, username, password, port, and schema must be checked carefully before running migration commands.

### Challenge 4: Keeping private files safe

The `.env` file contains the database connection string, so pushing it to GitHub would expose private credentials.

**Solution:** `.env` was included in `.gitignore` so that it is not committed to the repository.

---

## 5. Screenshots to Include

For the practical report, the following screenshots should be captured:

1. Folder structure of `prisma-connection`.
2. `package.json` showing Prisma dependencies.
3. `schema.prisma` showing PostgreSQL datasource.
4. `prisma.config.ts` showing environment variable configuration.
5. Terminal output after running `npx prisma validate`.
6. Terminal output after running `npx prisma migrate dev --name init` after models are added.
7. PostgreSQL or pgAdmin showing the created database.

---

## 6. Learning Outcomes

By completing this practical, I was able to:

- Understand the purpose of Prisma ORM in backend development.
- Connect a backend project to PostgreSQL using environment variables.
- Understand the basic role of `schema.prisma` and `prisma.config.ts`.
- Learn why migrations are needed in database-based applications.
- Understand why sensitive configuration must be kept outside GitHub.
- Prepare the backend project for future database models and controller integration.

---

## 7. Personal Reflection

This practical was useful because it showed how a backend application changes when it moves from mock data to a real database. Before this, the data in the backend felt temporary because it was stored in arrays. After learning Prisma and PostgreSQL, I understood how real applications keep data permanently and organize relationships between different resources.

The most difficult part was understanding Prisma configuration, especially because newer Prisma versions use `prisma.config.ts` for the database URL. After checking the configuration, I understood that `.env` stores the real connection string and Prisma reads it during commands like validation, migration, and generation.

Overall, this practical helped me understand the database foundation needed for the TikTok backend. It also gave me a clearer idea of how future controllers can use Prisma Client to create, read, update, and delete data from PostgreSQL.

---

## 8. Conclusion

In conclusion, this practical prepared the TikTok backend project for PostgreSQL database integration using Prisma ORM. The folder currently contains the base Prisma setup, including the schema file, Prisma configuration, dependencies, and ignore rules. The next step would be to add the full TikTok database models and run migrations so that the backend can store users, videos, comments, likes, and follow relationships in PostgreSQL.
