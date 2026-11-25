# PIYO Kitchen Live Order API (Cloudflare Workers + D1)

Free-tier serverless backend that connects the PIYO Grill & Restaurant website to the live `/#kitchen` tablet dashboard (and optional instant Telegram alerts).

## 5-Minute Deployment Steps

1. **Install dependencies & sign in to Cloudflare:**
   ```bash
   cd kitchen-api
   npm install
   npx wrangler login
   ```

2. **Create the free Cloudflare D1 database:**
   ```bash
   npx wrangler d1 create piyo-kitchen-orders
   ```
   Copy the returned `database_id` into `kitchen-api/wrangler.jsonc`, then generate types and initialize tables:
   ```bash
   npm run types
   npm run db:init:remote
   ```

3. **Set your Staff PIN (and optional Telegram Bot alerts):**
   ```bash
   npx wrangler secret put KITCHEN_PIN
   # Optional instant Telegram alerts to PIYO counter/manager phone:
   npx wrangler secret put TELEGRAM_BOT_TOKEN
   npx wrangler secret put TELEGRAM_CHAT_ID
   ```

4. **Deploy the Worker:**
   ```bash
   npm run deploy
   ```
   Copy your live Worker URL (e.g. `https://piyo-kitchen-api.<your-subdomain>.workers.dev`).

5. **Connect the PIYO Website Frontend:**
   Create `.env.local` (or `.env.production`) in the root `piyo-grill-app` folder:
   ```env
   VITE_ORDER_API_URL=https://piyo-kitchen-api.<your-subdomain>.workers.dev
   ```
   Rebuild/deploy the frontend — orders from any phone in Tagaytay now sync straight into the PIYO `/#kitchen` tablet with audio chime alerts and real-time customer status tracking!
