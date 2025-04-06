import { z } from 'zod'

const envSchema = z.object({
  // App
  NEXT_PUBLIC_APP_URL: z.string().url(),
  NEXT_PUBLIC_APP_NAME: z.string(),
  NODE_ENV: z.enum(['development', 'test', 'production']),

  // Database
  DATABASE_URL: z.string(),
  DATABASE_AUTH_TOKEN: z.string(),

  // Authentication
  JWT_SECRET: z.string().min(32),
  NEXTAUTH_SECRET: z.string(),
  NEXTAUTH_URL: z.string().url(),

  // Cloudflare
  CLOUDFLARE_ACCOUNT_ID: z.string(),
  CLOUDFLARE_API_TOKEN: z.string(),
  CLOUDFLARE_ZONE_ID: z.string(),

  // Storage
  R2_ACCESS_KEY_ID: z.string(),
  R2_SECRET_ACCESS_KEY: z.string(),
  R2_BUCKET_NAME: z.string(),

  // Stripe
  STRIPE_SECRET_KEY: z.string().startsWith('sk_'),
  STRIPE_WEBHOOK_SECRET: z.string().startsWith('whsec_'),
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().startsWith('pk_'),

  // Sentry
  NEXT_PUBLIC_SENTRY_DSN: z.string().url(),
  SENTRY_AUTH_TOKEN: z.string(),
  SENTRY_PROJECT: z.string(),
  SENTRY_ORG: z.string(),

  // Analytics
  NEXT_PUBLIC_ANALYTICS_ID: z.string().optional(),

  // Email
  SMTP_HOST: z.string(),
  SMTP_PORT: z.string().transform(Number),
  SMTP_USER: z.string(),
  SMTP_PASSWORD: z.string(),
  EMAIL_FROM: z.string().email(),
})

export function validateEnv() {
  try {
    const parsed = envSchema.parse(process.env)
    return { success: true, data: parsed }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const issues = error.issues.map((issue) => ({
        path: issue.path.join('.'),
        message: issue.message,
      }))
      console.error('❌ Invalid environment variables:', issues)
      return { success: false, error: issues }
    }
    console.error('❌ Failed to validate environment variables:', error)
    return { success: false, error }
  }
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envSchema> {}
  }
} 