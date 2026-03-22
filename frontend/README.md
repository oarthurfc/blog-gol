This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Strapi Webhook Revalidation

This project includes an endpoint to invalidate ISR cache when Strapi content changes.

### Endpoint

- `POST /api/revalidate`

### Authentication

Set `STRAPI_WEBHOOK_SECRET` in your frontend environment.

Strapi webhook requests must include header:

- `x-strapi-webhook-token: <STRAPI_WEBHOOK_SECRET>`

### Supported Models and Routes

- `api::aposta.aposta` -> `/apostas-esportivas`
- `api::slot.slot` -> `/slots`

### Supported Events

- `entry.create`
- `entry.update`
- `entry.delete`
- `entry.publish`
- `entry.unpublish`

### Strapi Webhook Configuration

1. Go to Strapi Admin -> Settings -> Webhooks.
2. Create a webhook with URL `https://your-domain.com/api/revalidate`.
3. Add header `x-strapi-webhook-token` with the same secret value used in frontend env.
4. Enable events listed above.
5. Restrict to `aposta` and `slot` content-types.

### Quick Test

```bash
curl -X POST http://localhost:3000/api/revalidate \
	-H "Content-Type: application/json" \
	-H "x-strapi-webhook-token: change-me-to-a-random-secret" \
	-d '{"event":"entry.update","model":{"uid":"api::aposta.aposta"}}'
```
