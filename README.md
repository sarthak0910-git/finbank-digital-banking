# Aurevia Bank — Digital Banking Coursework Project

A React/Vite banking dashboard with a Node.js/Express API. This is a coursework demo only: it does not connect to a real bank, move real money, or provide production-grade financial services.

## Project structure

- `src/` — React frontend (Vite), served from the repository root.
- `back-end/` — Express API, authentication, and sql.js database implementation.
- The backend creates its local SQLite database at `back-end/data/aurevia.sqlite` by default. Database files and environment files are excluded from Git.

## Requirements

- Node.js 20 or newer and npm

## Run locally

Use two terminals from the repository root.

### Backend

```powershell
cd back-end
npm ci
Copy-Item .env.example .env
```

Set a private `JWT_SECRET` of at least 24 characters in `back-end/.env`. Do not commit `.env`.

```powershell
npm run seed
npm run dev
```

The API listens on `http://localhost:4000`; health check: `http://localhost:4000/api/health`.

### Frontend

In a second terminal from the repository root:

```powershell
npm ci
npm run dev
```

Open `http://localhost:5173`. The frontend defaults to `http://localhost:4000/api`; set `VITE_API_URL` in a local frontend `.env` only if a different API URL is needed.

## Demo credentials

After seeding, sign in with `user1` / `password123`. The seed script also creates `user2` and `user3` with the same demo password. Change demo credentials before any shared deployment.

## Current integration scope

Registration and login use the backend API. Passwords are bcrypt-hashed, and successful authentication returns a JWT used by protected API requests. The rest of the dashboard is a simulated coursework interface; do not treat its balances, payees, investments, or payment actions as real financial data or services.

The backend exposes account, transaction, card, payment, settings, and investment endpoints. See `back-end/README.md` and `back-end/API_EXAMPLES.http` for API details.

## Validation

```powershell
npm run build
```

Run backend checks from `back-end/` as appropriate. There is currently no dedicated backend test script.
