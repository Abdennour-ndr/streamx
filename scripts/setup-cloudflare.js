#!/usr/bin/env node

console.log('🚀 Setting up Cloudflare configuration...\n')

console.log(`
Please follow these steps:

1. Go to: https://dash.cloudflare.com/profile/api-tokens

2. Click "Create Token"

3. Select the template "Edit Cloudflare Workers"
   This template includes all necessary permissions for:
   - Workers
   - R2 Storage
   - D1 Database
   - Pages

4. Click "Use template" and configure:
   - Zone Resources: Include - All zones
   - Account Resources: Include - Your account

5. Click "Continue to summary" and then "Create Token"

6. Copy the token and run:
   wrangler login

7. When prompted, paste your token

This will automatically configure:
- Wrangler CLI
- R2 access
- D1 access
- Pages deployment

To verify the setup, run:
node scripts/test-cloudflare-token.js
`) 