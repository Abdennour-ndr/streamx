'use client'

import * as Sentry from "@sentry/nextjs"
import { useEffect } from "react"

interface ErrorBoundaryProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorBoundary({
  error,
  reset,
}: ErrorBoundaryProps) {
  useEffect(() => {
    // Log the error to Sentry
    Sentry.captureException(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full p-6 text-center">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Something went wrong!
        </h2>
        
        <div className="bg-muted p-4 rounded-md mb-4 text-left overflow-auto">
          <p className="text-sm font-mono text-muted-foreground">
            {error.message}
          </p>
          {error.digest && (
            <p className="text-xs font-mono text-muted-foreground mt-2">
              Error ID: {error.digest}
            </p>
          )}
        </div>
        
        <div className="space-y-4">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
          >
            Try again
          </button>
          
          <p className="text-sm text-muted-foreground">
            If the problem persists, please contact support and provide the Error ID.
          </p>
        </div>
      </div>
    </div>
  )
} 