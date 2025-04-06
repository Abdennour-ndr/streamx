import { NextResponse } from 'next/server'
import { getCloudflareContext } from '@opennextjs/cloudflare'

export async function GET() {
  try {
    // Get Cloudflare context
    const cf = await getCloudflareContext()
    
    // Check database connection
    const dbResult = await cf.env.DB.prepare('SELECT 1').first()
    const dbStatus = dbResult ? 'healthy' : 'unhealthy'

    // Check assets binding
    const assetsStatus = cf.env.ASSETS ? 'healthy' : 'unhealthy'

    // Get application version from package.json
    const version = process.env.npm_package_version || '0.1.0'

    return NextResponse.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      version,
      services: {
        database: dbStatus,
        assets: assetsStatus
      },
      environment: process.env.NODE_ENV
    })
  } catch (error) {
    console.error('Health check failed:', error)
    
    return NextResponse.json({
      status: 'error',
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 