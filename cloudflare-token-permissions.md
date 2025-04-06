# Cloudflare API Token Permissions

## Token Name
```
StreamX Platform Access
```

## Permissions Required

### Account Level Permissions
- Account Settings
  - Read
- Workers Scripts
  - Edit
- Workers R2 Storage
  - Edit
- D1
  - Edit
- Pages
  - Edit

### Zone Level Permissions
- Zone Settings
  - Read
- DNS
  - Edit
- Page Rules
  - Edit
- Cache Purge
  - Purge

## Token Configuration

### Zone Resources
- Include
  - Specific zone: your-domain.com

### Account Resources
- Include
  - Specific account: Your Account ID

### Client IP Address Filtering (Optional)
- Include specific IPs used for deployment

### TTL (Time to Live)
- Recommended: 90 days

## Usage Areas

This token will be used for:
1. Deploying to Cloudflare Pages
2. Managing R2 Storage
3. Managing D1 Database
4. DNS Management
5. Cache Management

## Environment Variables

Add these to your project:
```env
CLOUDFLARE_API_TOKEN=your_generated_token
CLOUDFLARE_ACCOUNT_ID=your_account_id
CLOUDFLARE_ZONE_ID=your_zone_id
```

## Security Notes

1. Never commit this token to version control
2. Rotate the token every 90 days
3. Use IP filtering when possible
4. Monitor token usage in Cloudflare audit logs 