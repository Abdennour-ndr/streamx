import { getCloudflareContext } from '@opennextjs/cloudflare'
import { expect, jest, describe, it, beforeAll } from '@jest/globals'

describe('Database Migrations', () => {
  let db: D1Database

  beforeAll(async () => {
    const cf = await getCloudflareContext()
    db = cf.env.DB
  })

  it('should have all required tables', async () => {
    const tables = [
      'users',
      'content',
      'episodes',
      'subscriptions',
      'creator_subscriptions',
      'watch_history',
      'ratings',
      'live_streams',
      'tags',
      'content_tags',
      'user_preferences'
    ]

    for (const table of tables) {
      const result = await db.prepare(
        `SELECT name FROM sqlite_master WHERE type='table' AND name=?`
      ).bind(table).all()
      
      expect(result.results.length).toBe(1)
      expect(result.results[0].name).toBe(table)
    }
  })

  it('should have correct schema for users table', async () => {
    const result = await db.prepare(
      `PRAGMA table_info(users)`
    ).all()

    const columns = result.results.map((col: any) => col.name)
    
    expect(columns).toContain('id')
    expect(columns).toContain('username')
    expect(columns).toContain('email')
    expect(columns).toContain('password_hash')
    expect(columns).toContain('full_name')
    expect(columns).toContain('profile_image')
    expect(columns).toContain('bio')
    expect(columns).toContain('created_at')
    expect(columns).toContain('updated_at')
    expect(columns).toContain('is_creator')
    expect(columns).toContain('subscription_tier')
  })

  it('should have correct schema for content table', async () => {
    const result = await db.prepare(
      `PRAGMA table_info(content)`
    ).all()

    const columns = result.results.map((col: any) => col.name)
    
    expect(columns).toContain('id')
    expect(columns).toContain('title')
    expect(columns).toContain('description')
    expect(columns).toContain('thumbnail_url')
    expect(columns).toContain('content_url')
    expect(columns).toContain('content_type')
    expect(columns).toContain('category')
    expect(columns).toContain('duration')
    expect(columns).toContain('release_date')
    expect(columns).toContain('created_at')
    expect(columns).toContain('updated_at')
    expect(columns).toContain('creator_id')
    expect(columns).toContain('is_premium')
    expect(columns).toContain('view_count')
  })

  it('should have foreign key constraints', async () => {
    const tables = [
      'episodes',
      'creator_subscriptions',
      'watch_history',
      'ratings',
      'live_streams',
      'content_tags'
    ]

    for (const table of tables) {
      const result = await db.prepare(
        `SELECT sql FROM sqlite_master WHERE type='table' AND name=?`
      ).bind(table).all()
      
      expect(result.results[0].sql).toContain('FOREIGN KEY')
    }
  })
}) 