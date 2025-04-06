# StreamX Platform

StreamX is an all-in-one streaming platform that combines licensed movies, original productions, live streaming, and a content creator hub.

## Features

- User authentication and authorization
- Content streaming with adaptive bitrate
- Creator tools and monetization
- Subscription management
- Live streaming capabilities
- Analytics and reporting
- Content recommendation system

## Prerequisites

Before you begin, ensure you have installed:

- Node.js 20.x or later
- pnpm 8.x or later
- Git
- A Cloudflare account with Workers and D1 enabled

## Environment Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/streamx.git
cd streamx
```

2. Install dependencies:
```bash
pnpm install
```

3. Create a `.env.local` file with the following variables:
```env
# Application Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=StreamX
NEXT_PUBLIC_APP_DESCRIPTION="All-in-One Streaming Platform"

# Cloudflare Configuration
CLOUDFLARE_ACCOUNT_ID=your_account_id
CLOUDFLARE_API_TOKEN=your_api_token
CLOUDFLARE_D1_DATABASE_ID=your_database_id

# Authentication
JWT_SECRET=your_jwt_secret
JWT_EXPIRY=7d
COOKIE_NAME=streamx_session

# Payment Processing
STRIPE_PUBLIC_KEY=your_stripe_public_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Content Delivery
CDN_URL=your_cdn_url
MEDIA_STORAGE_URL=your_media_storage_url

# Monitoring
SENTRY_DSN=your_sentry_dsn
ANALYTICS_ID=your_analytics_id
```

## Development

To start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Testing

Run the test suite:

```bash
# Unit and integration tests
pnpm test

# E2E tests
pnpm test:e2e

# Development mode E2E tests
pnpm test:e2e:dev
```

## Database Management

Initialize the database:

```bash
# Create D1 database
wrangler d1 create streamx

# Run migrations
wrangler d1 migrations apply DB
```

## Deployment

### Beta Deployment Checklist

1. Environment Configuration:
   - Verify all environment variables are set
   - Configure Cloudflare Workers settings
   - Set up database connections

2. Database Setup:
   - Run all migrations
   - Verify data integrity
   - Create necessary indexes

3. Content Delivery:
   - Configure CDN settings
   - Set up media storage
   - Test streaming capabilities

4. Security:
   - Enable CORS
   - Configure CSP
   - Set up rate limiting
   - Enable SSL/TLS

5. Monitoring:
   - Set up error tracking
   - Configure analytics
   - Enable performance monitoring

### Deploy to Production

1. Build the application:
```bash
pnpm build
```

2. Deploy to Cloudflare:
```bash
pnpm run build:worker
wrangler deploy
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@streamx.com or join our Discord channel.
