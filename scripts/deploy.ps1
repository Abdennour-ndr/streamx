# Stop on error
$ErrorActionPreference = "Stop"

Write-Host "🚀 Starting deployment process..."

# Load environment variables
if (Test-Path .env.local) {
    Get-Content .env.local | ForEach-Object {
        if ($_ -match '^([^#=]+)=(.*)$') {
            $key = $matches[1].Trim()
            $value = $matches[2].Trim()
            [Environment]::SetEnvironmentVariable($key, $value)
        }
    }
}

# Check prerequisites
Write-Host "📋 Checking prerequisites..."
if (-not (Get-Command pnpm -ErrorAction SilentlyContinue)) {
    Write-Error "❌ pnpm is required but not installed. Aborting."
    exit 1
}
if (-not (Get-Command wrangler -ErrorAction SilentlyContinue)) {
    Write-Error "❌ wrangler is required but not installed. Aborting."
    exit 1
}

# Install dependencies
Write-Host "📦 Installing dependencies..."
pnpm install

# Run tests
Write-Host "🧪 Running tests..."
pnpm test

# Run type checking
Write-Host "✅ Running type checking..."
pnpm tsc --noEmit

# Run linting
Write-Host "🔍 Running linting..."
pnpm lint

# Apply database migrations
Write-Host "🗄️ Applying database migrations..."
wrangler d1 migrations apply DB

# Build the application
Write-Host "🏗️ Building application..."
pnpm build

# Build worker
Write-Host "👷 Building worker..."
pnpm run build:worker

# Deploy to Cloudflare
Write-Host "🚀 Deploying to Cloudflare..."
wrangler deploy

Write-Host "✨ Deployment complete!" 