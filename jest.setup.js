// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'
import { jest } from '@jest/globals'

// Mock next/router
jest.mock('next/router', () => require('next-router-mock'))

// Mock next/navigation
const useRouter = jest.fn()
jest.mock('next/navigation', () => ({
  useRouter,
  usePathname: jest.fn(),
  useSearchParams: jest.fn(() => new URLSearchParams()),
}))

// Mock Cloudflare environment
global.DB = {
  prepare: jest.fn(),
  batch: jest.fn(),
  exec: jest.fn(),
}

global.ASSETS = {
  fetch: jest.fn(),
}

// Mock environment variables
process.env = {
  ...process.env,
  NEXT_PUBLIC_APP_URL: 'http://localhost:3000',
  NEXT_PUBLIC_APP_NAME: 'StreamX',
}

// Extend Jest matchers
expect.extend({
  toBeInTheDocument(received) {
    const pass = received !== null
    if (pass) {
      return {
        message: () => `expected ${received} not to be in the document`,
        pass: true,
      }
    } else {
      return {
        message: () => `expected ${received} to be in the document`,
        pass: false,
      }
    }
  },
})

// Suppress console errors during tests
console.error = jest.fn()

// Clean up after each test
afterEach(() => {
  jest.clearAllMocks()
}) 