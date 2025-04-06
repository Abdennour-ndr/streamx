import * as Sentry from "@sentry/nextjs"

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: process.env.NODE_ENV === 'development',

  // Optional: Configure error filtering
  beforeSend(event) {
    // Check if it is an exception, and if so, show it
    if (event.exception) {
      // Filter out specific errors
      if (event.exception.values?.[0]?.type === 'ReferenceError') {
        return null
      }
    }
    return event
  },

  // Optional: Configure sampling
  tracesSampler(samplingContext) {
    // Examine provided context data (including parent and current spans) to decide whether to sample this request
    if (samplingContext.parentSampled) {
      // If the parent was sampled, we'll follow that decision
      return true
    }

    // Sample all error transactions
    if (samplingContext.transactionContext?.name?.includes('error')) {
      return 1.0
    }

    // Default sample rate
    return 0.1
  },
}) 