# NourishedWithRuchikaChawla

Production-ready dietician platform with premium digital product delivery, Google auth, and secure Razorpay checkout.

## Tech Stack

- Next.js 16 App Router + TypeScript
- Tailwind CSS 4
- MongoDB (Compass-compatible) for users and purchases
- NextAuth (Google OAuth)
- Razorpay for payments
- Framer Motion for selective motion and section transitions

## Core Features

- High-converting wellness website (home, about, blog, reviews, digital products)
- Google login via NextAuth
- Paid digital product flow with Razorpay
- Purchase persistence in MongoDB
- Protected My Products dashboard
- Protected file delivery from server-only folder
- SEO-ready metadata across key routes

## Folder Structure

```text
src/
	app/
		about/
		blog/
			[slug]/
		reviews/
		products/
			[slug]/
		my-products/
		api/
			auth/[...nextauth]/
			payments/create-order/
			payments/verify/
			products/[productId]/access/
	components/
		auth/
		home/
		layout/
		products/
		ui/
	lib/
		authOptions.ts
		db.ts
		data.ts
		mongodb.ts
		payments/
mongodb/
	indexes.js
protected-products/
	.gitkeep
```

## Environment Setup

Copy `.env.example` to `.env.local` and fill values:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
MONGODB_URI=
MONGODB_DB_NAME=nourished_with_ruchika
DIGITAL_PRODUCTS_DIR=protected-products
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
```

For production on Hostinger, set:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXTAUTH_URL=https://your-domain.com
```

## MongoDB Compass Setup

1. Create or choose a MongoDB cluster and connect it in Compass.
2. Create database `nourished_with_ruchika` (or set your own `MONGODB_DB_NAME`).
3. Run indexes script:
	- `mongosh "<connection-string>/<db-name>" mongodb/indexes.js`
4. Keep protected digital files in `protected-products/` with names matching `storagePath` in `src/lib/data.ts`.

## Google OAuth Setup (NextAuth)

1. Create Google OAuth credentials in Google Cloud Console.
2. Add authorized redirect URI:
	- `https://your-domain.com/api/auth/callback/google`
3. Set `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`.
4. Set a strong `NEXTAUTH_SECRET`.

## Razorpay Setup

1. Create Razorpay account and fetch API keys.
2. Set `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET`.
3. Ensure webhook verification is configured in production (recommended hardening).

## Local Development

```bash
npm install
npm run dev
```

App runs at `http://localhost:3000`.

## Deploy on Hostinger

This project is configured for Hostinger with `output: "standalone"` in `next.config.ts`.

### Option A: Hostinger VPS (recommended)

1. SSH into your server.
2. Install Node.js 20+ and PM2.
3. Clone repository and install dependencies.
4. Add production env variables in `.env`.
5. Build app with `npm run build`.
6. Start with PM2 using `ecosystem.config.cjs`.

Commands:

```bash
git clone <your-repo-url> nourished-ruchika
cd nourished-ruchika
npm install
npm run build
npm install -g pm2
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup
```

After build, ensure these exist:

- `.next/standalone/server.js`
- `.next/static`
- `public`

Configure Nginx reverse proxy to pass traffic from port 80/443 to `127.0.0.1:3000`.

### Option B: Hostinger Node.js App in hPanel

1. Create a Node.js app in hPanel.
2. Set Node version to 20+.
3. Upload project files.
4. Run install command: `npm install`.
5. Run build command: `npm run build`.
6. Start command should run standalone server:

```bash
node .next/standalone/server.js
```

Set `PORT` and `HOSTNAME=0.0.0.0` in hPanel environment variables if required.

## Domain & Auth/Payment Callbacks

When domain is live:

1. Ensure `NEXTAUTH_URL` points to your production domain.
2. In Google OAuth console, add callback URL:
	- `https://your-domain.com/api/auth/callback/google`
3. Configure Razorpay allowed origins/webhooks to your production domain.

## Security Notes

- Digital files are not publicly exposed; access route checks payment ownership.
- Access checks are enforced in API route before streaming files.
- Payment signatures are verified using HMAC SHA-256 in `/api/payments/verify`.
- MongoDB credentials are server-only environment variables.

## Production Hardening Checklist

1. Add Razorpay webhook-based reconciliation for failed client callbacks.
2. Add rate limiting on payment and access routes.
3. Add audit logging for payment verification and signed URL generation.
4. Configure CSP and security headers in deployment layer.
5. Add monitoring and alerts for API 4xx/5xx spikes.
