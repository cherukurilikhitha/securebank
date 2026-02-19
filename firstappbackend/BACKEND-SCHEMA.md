# Backend Database Schema

**Project:** first-app (Homes – Loan Application)  
**Backend:** Spring Boot + PostgreSQL  
**Purpose:** Defines the persistent data model used by the backend.

---

## 1. Database Overview

The backend uses **PostgreSQL**. The connection is configured in `application.properties`:

- **URL:** `jdbc:postgresql://first-app-db.czcwwyuwmmee.us-east-2.rds.amazonaws.com:5432/firstapp`
- **Database name:** `firstapp`
- **ORM:** Jakarta Persistence (JPA) / Hibernate — tables can be created/updated from entity classes.

The schema currently has **one table**, used for **user authentication** (login).

---

## 2. Entity-Relationship (Conceptual)

```
┌─────────────────────┐
│      app_user       │
├─────────────────────┤
│ id (PK)             │
│ username (unique)   │
│ password            │
└─────────────────────┘
```

There are **no foreign keys** or other tables in the current schema. Loan applications are **not** stored in the database; they are sent to the Python service and the result is returned to the client without persistence.

---

## 3. Table Definition: `app_user`

| Column      | Type          | Constraints                    | Description                |
|------------|---------------|--------------------------------|----------------------------|
| **id**     | `BIGSERIAL`   | PRIMARY KEY, NOT NULL, AUTO_INCREMENT | Surrogate key (auto-generated). |
| **username** | `VARCHAR(255)` | NOT NULL, UNIQUE               | Login username.            |
| **password** | `VARCHAR(255)` | NOT NULL                       | User password (plain text in current demo). |

- **Table name:** `app_user` (avoids reserved word `user` in SQL).
- **Primary key:** `id`.
- **Unique constraint:** `username` — no two users can have the same username.

---

## 4. SQL Equivalent (Create Table)

You can use this in PostgreSQL to create the schema manually (e.g. for documentation or initial setup):

```sql
CREATE TABLE app_user (
    id         BIGSERIAL PRIMARY KEY,
    username   VARCHAR(255) NOT NULL UNIQUE,
    password   VARCHAR(255) NOT NULL
);

-- Optional: index for login lookups by username (often created automatically for UNIQUE)
-- CREATE UNIQUE INDEX idx_app_user_username ON app_user (username);
```

---

## 5. Backend API Endpoints (Reference)

These are the HTTP endpoints the backend exposes; they are part of the “backend schema” in a broader sense (API surface):

| Method | Endpoint           | Purpose                    | Uses DB? |
|--------|--------------------|----------------------------|----------|
| POST   | `/api/login`       | Authenticate user          | Yes — reads `app_user` |
| POST   | `/api/loan/analyze`| Loan analysis (proxies to Python) | No  |
| GET    | `/api/health`      | Health check               | No  |

---

## 6. JPA Entity (Source of Schema)

The table is defined in code by this entity:

**Class:** `com.example.demo.entity.AppUser`  
**Table name:** `app_user`

| Java field  | JPA mapping        | DB column |
|------------|--------------------|-----------|
| `id`       | `@Id` `@GeneratedValue(IDENTITY)` | `id` (BIGSERIAL) |
| `username` | `@Column(nullable=false, unique=true)` | `username` |
| `password` | `@Column(nullable=false)` | `password` |

With `spring.jpa.hibernate.ddl-auto` set to `update` or `create`, Hibernate can create or alter this table from the entity. The schema above matches what this entity implies.

---

## 7. Summary for Submission

- **Database:** PostgreSQL, database name `firstapp`.
- **Tables:** One table — `app_user` (id, username, password).
- **Purpose:** Store users for login; no persistence of loan applications in the DB.
- **API:** Login uses `app_user`; loan analyze is a proxy to an external Python service and does not use the DB.

You can submit this document (and optionally the SQL in Section 4) as the **backend schema** for your professor.
