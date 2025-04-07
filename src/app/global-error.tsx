'use client';

import React from 'react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Something went wrong!</h1>
          <p className="text-gray-600 mb-8">{error.message}</p>
          <div className="flex gap-4">
            <button
              onClick={reset}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Try again
            </button>
            <Link href="/" className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
              Return Home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
} 