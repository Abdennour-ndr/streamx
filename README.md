# StreamX

StreamX is a modern streaming service built with Next.js, TypeScript, and Tailwind CSS.

## Features

- Responsive navigation bar
- Features section
- Pricing plans section
- Modern design
- Database integration with Prisma
- Authentication with NextAuth.js
- Payment processing with Stripe

## Getting Started

### Prerequisites

- Node.js 18.x or later
- PostgreSQL
- Stripe account

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/streamx.git
cd streamx
```

2. Install dependencies
```bash
pnpm install
```

3. Set up environment variables
```bash
cp .env.example .env
```
Edit `.env` with your configuration.

4. Set up the database
```bash
pnpm prisma migrate dev
```

5. Run the development server
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

The project is configured to deploy to Cloudflare Pages. To deploy:

```bash
npx wrangler pages deploy out --project-name streamx
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
