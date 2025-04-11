-- Database Optimizations and Monitoring

-- Add indexes for frequently accessed columns
CREATE INDEX IF NOT EXISTS idx_content_creator ON content(creator_id);
CREATE INDEX IF NOT EXISTS idx_content_type ON content(content_type, category);
CREATE INDEX IF NOT EXISTS idx_episodes_content ON episodes(content_id, season_number, episode_number);
CREATE INDEX IF NOT EXISTS idx_watch_history_user ON watch_history(user_id, watched_at);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user ON subscriptions(user_id, is_active);
CREATE INDEX IF NOT EXISTS idx_creator_subscriptions_both ON creator_subscriptions(creator_id, subscriber_id);
CREATE INDEX IF NOT EXISTS idx_ratings_content ON ratings(content_id, rating);
CREATE INDEX IF NOT EXISTS idx_ad_performance_date ON ad_performance(date, ad_unit_id);

-- Add foreign key constraints with cascade delete where appropriate
ALTER TABLE episodes 
ADD CONSTRAINT fk_episodes_content 
FOREIGN KEY (content_id) REFERENCES content(id) ON DELETE CASCADE;

ALTER TABLE watch_history 
ADD CONSTRAINT fk_watch_history_content 
FOREIGN KEY (content_id) REFERENCES content(id) ON DELETE CASCADE;

ALTER TABLE ratings 
ADD CONSTRAINT fk_ratings_content 
FOREIGN KEY (content_id) REFERENCES content(id) ON DELETE CASCADE;

-- Add check constraints for data validation
ALTER TABLE users 
ADD CONSTRAINT chk_subscription_tier 
CHECK (subscription_tier IN ('free', 'basic', 'premium'));

ALTER TABLE content 
ADD CONSTRAINT chk_content_type 
CHECK (content_type IN ('movie', 'series', 'live', 'video'));

ALTER TABLE content 
ADD CONSTRAINT chk_category 
CHECK (category IN ('cinema', 'originals', 'play', 'prime', 'studio'));

ALTER TABLE ratings 
ADD CONSTRAINT chk_rating_range 
CHECK (rating BETWEEN 1 AND 5);

-- Add triggers for automatic timestamp updates
CREATE TRIGGER IF NOT EXISTS update_user_timestamp 
AFTER UPDATE ON users 
BEGIN 
    UPDATE users SET updated_at = CURRENT_TIMESTAMP 
    WHERE id = NEW.id; 
END;

CREATE TRIGGER IF NOT EXISTS update_content_timestamp 
AFTER UPDATE ON content 
BEGIN 
    UPDATE content SET updated_at = CURRENT_TIMESTAMP 
    WHERE id = NEW.id; 
END;

-- Add monitoring tables
CREATE TABLE IF NOT EXISTS database_metrics (
    id TEXT PRIMARY KEY,
    metric_name TEXT NOT NULL,
    metric_value INTEGER NOT NULL,
    measured_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS query_performance_logs (
    id TEXT PRIMARY KEY,
    query_text TEXT NOT NULL,
    execution_time INTEGER NOT NULL, -- in milliseconds
    rows_affected INTEGER,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create views for common analytics queries
CREATE VIEW IF NOT EXISTS content_analytics AS 
SELECT 
    c.id,
    c.title,
    c.content_type,
    c.category,
    COUNT(DISTINCT w.user_id) as unique_viewers,
    AVG(r.rating) as avg_rating,
    COUNT(DISTINCT r.id) as rating_count
FROM content c
LEFT JOIN watch_history w ON c.id = w.content_id
LEFT JOIN ratings r ON c.id = r.content_id
GROUP BY c.id, c.title, c.content_type, c.category;

CREATE VIEW IF NOT EXISTS creator_analytics AS 
SELECT 
    u.id as creator_id,
    u.username,
    COUNT(DISTINCT c.id) as content_count,
    COUNT(DISTINCT cs.subscriber_id) as subscriber_count,
    AVG(r.rating) as avg_content_rating
FROM users u
LEFT JOIN content c ON u.id = c.creator_id
LEFT JOIN creator_subscriptions cs ON u.id = cs.creator_id
LEFT JOIN ratings r ON c.id = r.content_id
WHERE u.is_creator = TRUE
GROUP BY u.id, u.username;