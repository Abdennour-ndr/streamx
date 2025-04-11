// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'
import { jest } from '@jest/globals'

// Mock next/router
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: {},
      asPath: '',
      push: jest.fn(),
      replace: jest.fn(),
    }
  },
}))

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img {...props} />
  },
}))

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      refresh: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      prefetch: jest.fn(),
    }
  },
  usePathname() {
    return '/'
  },
  useSearchParams() {
    return new URLSearchParams()
  },
}))

// Mock @clerk/nextjs
jest.mock('@clerk/nextjs', () => ({
  useUser: () => ({
    isSignedIn: false,
    user: null,
  }),
  useAuth: () => ({
    isLoaded: true,
    userId: null,
  }),
  ClerkProvider: ({ children }) => children,
  UserButton: () => <div>UserButton</div>,
}))

// Mock @vercel/analytics
jest.mock('@vercel/analytics', () => ({
  Analytics: () => null,
}))

// Mock next-themes
jest.mock('next-themes', () => ({
  useTheme: () => ({
    setTheme: jest.fn(),
    theme: 'light',
  }),
  ThemeProvider: ({ children }) => children,
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