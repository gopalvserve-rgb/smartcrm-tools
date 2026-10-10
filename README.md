# SmartCRM Micro-Tools Hub

A platform of small, sellable web tools (WhatsApp Direct, QR Generator, Visiting Card Maker, Social Follow Hub) that capture leads into SmartCRM, with a backend admin panel. Built freemium-first.

## Stack
- **Frontend:** React + Vite + TailwindCSS
- **Backend:** Node + Express + MongoDB (Mongoose)
- **Auth:** JWT (bcrypt-hashed). Admin + end-user roles.
- **One service:** Express serves the API *and* the built React app.

## Structure
```
server/     Express API (auth, tools, generate, leads, admin) + Mongo models + seed
client/     React app (hub, tool builders, public pages, dashboard, admin)
```

## Local dev
```bash
npm install
npm run build          # builds the client
# start MongoDB locally, then:
MONGO_URL=mongodb://127.0.0.1:27017/smartcrm_tools npm start
# open http://localhost:3000
```
For hot-reload frontend: `cd client && npm install && npm run dev` (proxies /api to :3000).

## Deploy (Railway)
1. Attach a **MongoDB** plugin → it sets `MONGO_URL`.
2. Set `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`.
3. Deploy — `npm run build` then `npm start`.

## Admin
Visit `/admin/login`. Seeded on first boot from `ADMIN_EMAIL` / `ADMIN_PASSWORD`.

## Security
HTTPS, JWT auth, bcrypt, rate limiting on `/api`, Helmet headers, CORS, secrets in env.
Roadmap: Razorpay billing, OTP on lead capture, CAPTCHA, audit log, per-tool CSP.
