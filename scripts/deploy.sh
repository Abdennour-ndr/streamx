#!/bin/bash

# Exit on error
set -e

# Load environment variables
if [ -f .env.local ]; then
  export $(cat .env.local | grep -v '^#' | xargs)
fi

echo "🚀 Starting deployment process..."

# Check prerequisites
echo "📋 Checking prerequisites..."
command -v pnpm >/dev/null 2>&1 || { echo "❌ pnpm is required but not installed. Aborting." >&2; exit 1; }
command -v wrangler >/dev/null 2>&1 || { echo "❌ wrangler is required but not installed. Aborting." >&2; exit 1; }

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install

# Run tests
echo "🧪 Running tests..."
pnpm test

# Run type checking
echo "✅ Running type checking..."
pnpm tsc --noEmit

# Run linting
echo "🔍 Running linting..."
pnpm lint

# Apply database migrations
echo "🗄️ Applying database migrations..."
wrangler d1 migrations apply DB

# Build the application
echo "🏗️ Building application..."
pnpm build

# Build worker
echo "👷 Building worker..."
pnpm run build:worker

# Deploy to Cloudflare
echo "🚀 Deploying to Cloudflare..."
wrangler deploy

echo "✨ Deployment complete!" 