# Strapi Webhook Revalidation Setup Guide

This document walks through validating and configuring the webhook revalidation system that invalidates Next.js cache when you publish/update content in Strapi.

## What Was Implemented

1. **New API Route**: `/api/revalidate` — secured webhook endpoint on your Next.js backend
2. **Cache Strategy**: Explicit `next: { revalidate: 5 }` in Strapi fetch for consistency across routes
3. **Environment Config**: `STRAPI_WEBHOOK_SECRET` for webhook authentication

## Step 1: Set Environment Variable

In `frontend/.env.local` (development) or `frontend/.env.production` (production):

```
STRAPI_WEBHOOK_SECRET=your-random-secret-here-change-this
```

Use a strong random value (e.g., `openssl rand -base64 32`).

## Step 2: Test the Endpoint Locally

Start your Next.js server:

```bash
cd /Users/oarthurfc/freelas/blog-gol/frontend
npm run dev
```

In another terminal, send a test webhook for the apostas page:

```bash
curl -X POST http://localhost:3000/api/revalidate \
  -H "Content-Type: application/json" \
  -H "x-strapi-webhook-token: your-random-secret-here-change-this" \
  -d '{"event":"entry.update","model":{"uid":"api::aposta.aposta"}}'
```

Expected response (HTTP 200):

```json
{
  "revalidated": true,
  "event": "entry.update",
  "modelUid": "api::aposta.aposta",
  "paths": ["/apostas-esportivas"],
  "timestamp": "2026-03-21T..."
}
```

Test invalid token (should get HTTP 401):

```bash
curl -X POST http://localhost:3000/api/revalidate \
  -H "Content-Type: application/json" \
  -H "x-strapi-webhook-token: wrong-secret" \
  -d '{"event":"entry.update","model":{"uid":"api::aposta.aposta"}}'
```

Expected: `{ "error": "Unauthorized" }` with status 401.

Test invalid model (should get HTTP 400):

```bash
curl -X POST http://localhost:3000/api/revalidate \
  -H "Content-Type: application/json" \
  -H "x-strapi-webhook-token: your-random-secret-here-change-this" \
  -d '{"event":"entry.update","model":{"uid":"api::unknown.unknown"}}'
```

Expected: `{ "error": "Model not handled: api::unknown.unknown" }` with status 400.

## Step 3: Configure Webhook in Strapi Admin

1. Go to **Settings > Webhooks** in Strapi Admin.
2. Click **Create new webhook**.
3. Fill in:
   - **Name**: `frontend-revalidate`
   - **URL**: `https://your-frontend-domain.com/api/revalidate` (use `http://localhost:3000/api/revalidate` for local testing)
   - **Headers**: Add header `x-strapi-webhook-token` with your secret value
4. **Events**: Enable these checkboxes:
   - ✓ Entry create
   - ✓ Entry update
   - ✓ Entry delete
   - ✓ Entry publish
   - ✓ Entry unpublish
5. **Content-types**: Check only:
   - ✓ aposta
   - ✓ slot
6. Click **Save**.

## Step 4: Test End-to-End in Strapi

1. Go to **Content Manager > aposta** (or **slot**).
2. Edited an entry and click **Publish** (or **Update** if already published).
3. Watch your Next.js server logs for the revalidation webhook hit.
4. Visit `https://your-domain.com/apostas-esportivas` (or `/slots`) in a browser.
5. Verify your edits appear without redeploy.

## How It Works

1. You edit content in Strapi and publish.
2. Strapi triggers webhook POST to `/api/revalidate` with payload:
   ```json
   {
     "event": "entry.publish",
     "model": { "uid": "api::aposta.aposta" }
   }
   ```
3. Your revalidate endpoint validates the secret, maps model UID to route path (`/apostas-esportivas`), and calls `revalidatePath()`.
4. Next.js invalidates the on-demand ISR cache for that route.
5. Next visitor to that page triggers a rebuild from fresh Strapi data.

## Fallback: Route-level ISR

If the webhook is delayed or fails, both pages still have `export const revalidate = 5` (5-second ISR), so stale content will auto-refresh every 5 seconds of requests. Webhook invalidation is **faster** but ISR is your safety net.

## Related Files

- [src/app/api/revalidate/route.ts](../src/app/api/revalidate/route.ts) — webhook endpoint
- [src/lib/strapi/fetchContentType.ts](../src/lib/strapi/fetchContentType.ts) — Strapi fetch with cache headers
- [src/app/(site)/apostas-esportivas/page.tsx](<../src/app/(site)/apostas-esportivas/page.tsx>) — apostas page (ISR export)
- [src/app/(site)/slots/page.tsx](<../src/app/(site)/slots/page.tsx>) — slots page (ISR export)

## Troubleshooting

**Webhook not triggering?**

- Confirm `STRAPI_WEBHOOK_SECRET` is set in frontend env and matches the header value in Strapi webhook.
- Check Strapi admin webhook logs (Settings > Webhooks) for delivery errors.
- Ensure frontend domain/URL is correct in webhook config.

**Edits not appearing?**

- Check that content is **Published** in Strapi (not just drafted).
- Check Next.js server logs for revalidation errors.
- Hard refresh browser (Cmd+Shift+R or Ctrl+Shift+R) to clear browser cache.
- If both fail after 5 seconds, ISR fallback should refresh it automatically.

**401 Unauthorized in webhook logs?**

- Verify secret matches between `.env` and Strapi webhook header config.

**HTTP 400 "Model not handled"?**

- Webhook may be catching events for other content-types. Restrict Strapi webhook to `aposta` and `slot` only.
