#!/usr/bin/env node

const https = require('https')

// Load environment variables
const token = process.env.CLOUDFLARE_API_TOKEN
const accountId = process.env.CLOUDFLARE_ACCOUNT_ID
const zoneId = process.env.CLOUDFLARE_ZONE_ID

if (!token || !accountId || !zoneId) {
  console.error('❌ Missing required environment variables')
  process.exit(1)
}

// Test functions
async function makeRequest(path, options = {}) {
  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: 'api.cloudflare.com',
      path,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      ...options
    }, (res) => {
      let data = ''
      res.on('data', (chunk) => data += chunk)
      res.on('end', () => {
        try {
          resolve({ 
            status: res.statusCode,
            data: JSON.parse(data)
          })
        } catch (e) {
          reject(e)
        }
      })
    })

    req.on('error', reject)
    req.end()
  })
}

async function testPermissions() {
  console.log('🔍 Testing Cloudflare API Token permissions...\n')

  try {
    // Test Account access
    console.log('Testing Account access...')
    const accountResult = await makeRequest(`/client/v4/accounts/${accountId}`)
    console.log(accountResult.status === 200 ? '✅ Account access: OK' : '❌ Account access: Failed')

    // Test Zone access
    console.log('\nTesting Zone access...')
    const zoneResult = await makeRequest(`/client/v4/zones/${zoneId}`)
    console.log(zoneResult.status === 200 ? '✅ Zone access: OK' : '❌ Zone access: Failed')

    // Test Workers access
    console.log('\nTesting Workers access...')
    const workersResult = await makeRequest(`/client/v4/accounts/${accountId}/workers/scripts`)
    console.log(workersResult.status === 200 ? '✅ Workers access: OK' : '❌ Workers access: Failed')

    // Test R2 access
    console.log('\nTesting R2 access...')
    const r2Result = await makeRequest(`/client/v4/accounts/${accountId}/r2/buckets`)
    console.log(r2Result.status === 200 ? '✅ R2 access: OK' : '❌ R2 access: Failed')

    // Test D1 access
    console.log('\nTesting D1 access...')
    const d1Result = await makeRequest(`/client/v4/accounts/${accountId}/d1/database`)
    console.log(d1Result.status === 200 ? '✅ D1 access: OK' : '❌ D1 access: Failed')

    // Test Pages access
    console.log('\nTesting Pages access...')
    const pagesResult = await makeRequest(`/client/v4/accounts/${accountId}/pages/projects`)
    console.log(pagesResult.status === 200 ? '✅ Pages access: OK' : '❌ Pages access: Failed')

    console.log('\n✨ All tests completed!')
  } catch (error) {
    console.error('\n❌ Error testing permissions:', error.message)
    process.exit(1)
  }
}

testPermissions() 