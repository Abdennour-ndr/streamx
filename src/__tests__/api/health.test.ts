import { GET } from '@/app/api/health/route'
import { getCloudflareContext } from '@opennextjs/cloudflare'
import { expect, jest, describe, it, beforeEach } from '@jest/globals'

// Mock getCloudflareContext
jest.mock('@opennextjs/cloudflare', () => ({
  getCloudflareContext: jest.fn()
}))

describe('Health Check API', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks()
  })

  it('returns healthy status when all services are up', async () => {
    // Mock successful database query
    const mockDB = {
      prepare: jest.fn().mockReturnThis(),
      first: jest.fn().mockResolvedValue({ value: 1 })
    }

    // Mock Cloudflare context
    ;(getCloudflareContext as jest.Mock).mockResolvedValue({
      env: {
        DB: mockDB,
        ASSETS: {}
      }
    })

    const response = await GET()
    const data = await response.json() as {
      status: string
      services: {
        database: string
        assets: string
      }
      timestamp: string
      version: string
      environment: string
    }

    expect(response.status).toBe(200)
    expect(data).toEqual(expect.objectContaining({
      status: 'ok',
      services: {
        database: 'healthy',
        assets: 'healthy'
      }
    }))
    expect(data.timestamp).toBeDefined()
    expect(data.version).toBeDefined()
    expect(data.environment).toBeDefined()
  })

  it('returns unhealthy status when database is down', async () => {
    // Mock failed database query
    const mockDB = {
      prepare: jest.fn().mockReturnThis(),
      first: jest.fn().mockResolvedValue(null)
    }

    // Mock Cloudflare context
    ;(getCloudflareContext as jest.Mock).mockResolvedValue({
      env: {
        DB: mockDB,
        ASSETS: {}
      }
    })

    const response = await GET()
    const data = await response.json() as {
      status: string
      services: {
        database: string
        assets: string
      }
    }

    expect(response.status).toBe(200)
    expect(data).toEqual(expect.objectContaining({
      status: 'ok',
      services: {
        database: 'unhealthy',
        assets: 'healthy'
      }
    }))
  })

  it('returns error status when database query fails', async () => {
    // Mock database query error
    const mockDB = {
      prepare: jest.fn().mockReturnThis(),
      first: jest.fn().mockRejectedValue(new Error('Database connection failed'))
    }

    // Mock Cloudflare context
    ;(getCloudflareContext as jest.Mock).mockResolvedValue({
      env: {
        DB: mockDB,
        ASSETS: {}
      }
    })

    const response = await GET()
    const data = await response.json() as {
      status: string
      error: string
    }

    expect(response.status).toBe(500)
    expect(data).toEqual(expect.objectContaining({
      status: 'error',
      error: 'Database connection failed'
    }))
  })

  it('returns unhealthy status when assets binding is missing', async () => {
    // Mock successful database query but missing assets
    const mockDB = {
      prepare: jest.fn().mockReturnThis(),
      first: jest.fn().mockResolvedValue({ value: 1 })
    }

    // Mock Cloudflare context without assets
    ;(getCloudflareContext as jest.Mock).mockResolvedValue({
      env: {
        DB: mockDB,
        ASSETS: null
      }
    })

    const response = await GET()
    const data = await response.json() as {
      status: string
      services: {
        database: string
        assets: string
      }
    }

    expect(response.status).toBe(200)
    expect(data).toEqual(expect.objectContaining({
      status: 'ok',
      services: {
        database: 'healthy',
        assets: 'unhealthy'
      }
    }))
  })
}) 