-- StreamX Platform Database Schema

-- Users Table
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  full_name TEXT,
  profile_image TEXT,
  bio TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_creator BOOLEAN DEFAULT FALSE,
  subscription_tier TEXT DEFAULT 'free'
);

-- Content Table
CREATE TABLE IF NOT EXISTS content (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  thumbnail_url TEXT,
  content_url TEXT NOT NULL,
  content_type TEXT NOT NULL, -- movie, series, live, video
  category TEXT NOT NULL, -- cinema, originals, play, prime, studio
  duration INTEGER,
  release_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  creator_id TEXT,
  is_premium BOOLEAN DEFAULT FALSE,
  view_count INTEGER DEFAULT 0,
  FOREIGN KEY (creator_id) REFERENCES users(id)
);

-- Series Episodes Table
CREATE TABLE IF NOT EXISTS episodes (
  id TEXT PRIMARY KEY,
  content_id TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  episode_number INTEGER NOT NULL,
  season_number INTEGER NOT NULL,
  thumbnail_url TEXT,
  video_url TEXT NOT NULL,
  duration INTEGER,
  release_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (content_id) REFERENCES content(id)
);

-- User Subscriptions
CREATE TABLE IF NOT EXISTS subscriptions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  plan_type TEXT NOT NULL, -- free, basic, premium
  start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  end_date TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE,
  payment_method TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Creator Subscriptions (for creator monetization)
CREATE TABLE IF NOT EXISTS creator_subscriptions (
  id TEXT PRIMARY KEY,
  creator_id TEXT NOT NULL,
  subscriber_id TEXT NOT NULL,
  tier TEXT NOT NULL, -- basic, premium, etc.
  start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  end_date TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE,
  FOREIGN KEY (creator_id) REFERENCES users(id),
  FOREIGN KEY (subscriber_id) REFERENCES users(id)
);

-- Watch History
CREATE TABLE IF NOT EXISTS watch_history (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  content_id TEXT NOT NULL,
  watched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  watch_duration INTEGER,
  completed BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (content_id) REFERENCES content(id)
);

-- User Ratings
CREATE TABLE IF NOT EXISTS ratings (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  content_id TEXT NOT NULL,
  rating INTEGER NOT NULL, -- 1-5
  review TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (content_id) REFERENCES content(id)
);

-- Live Streams
CREATE TABLE IF NOT EXISTS live_streams (
  id TEXT PRIMARY KEY,
  creator_id TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  thumbnail_url TEXT,
  stream_key TEXT NOT NULL,
  status TEXT DEFAULT 'offline', -- offline, live, ended
  scheduled_start TIMESTAMP,
  actual_start TIMESTAMP,
  actual_end TIMESTAMP,
  viewer_count INTEGER DEFAULT 0,
  is_premium BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (creator_id) REFERENCES users(id)
);

-- Categories/Tags
CREATE TABLE IF NOT EXISTS tags (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL UNIQUE
);

-- Content Tags (Many-to-Many)
CREATE TABLE IF NOT EXISTS content_tags (
  content_id TEXT NOT NULL,
  tag_id TEXT NOT NULL,
  PRIMARY KEY (content_id, tag_id),
  FOREIGN KEY (content_id) REFERENCES content(id),
  FOREIGN KEY (tag_id) REFERENCES tags(id)
);

-- User Preferences (for AI recommendations)
CREATE TABLE IF NOT EXISTS user_preferences (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL UNIQUE,
  preferred_genres TEXT, -- JSON array
  preferred_creators TEXT, -- JSON array
  watch_time_preference TEXT, -- morning, afternoon, evening, night
  content_length_preference TEXT, -- short, medium, long
  last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Insert sample data for testing
INSERT INTO users (id, username, email, password_hash, full_name, is_creator, subscription_tier)
VALUES 
('usr_001', 'admin', 'admin@streamx.com', 'hashed_password', 'Admin User', FALSE, 'premium'),
('usr_002', 'creator1', 'creator1@streamx.com', 'hashed_password', 'Creator One', TRUE, 'premium'),
('usr_003', 'viewer1', 'viewer1@streamx.com', 'hashed_password', 'Viewer One', FALSE, 'basic');

-- Insert sample content
INSERT INTO content (id, title, description, thumbnail_url, content_url, content_type, category, duration, is_premium)
VALUES
('cnt_001', 'Sample Movie', 'A sample movie for testing', '/thumbnails/sample-movie.jpg', '/videos/sample-movie.mp4', 'movie', 'cinema', 7200, FALSE),
('cnt_002', 'Premium Series', 'A premium series for subscribers', '/thumbnails/premium-series.jpg', '/videos/premium-series.mp4', 'series', 'prime', 3600, TRUE),
('cnt_003', 'Creator Video', 'A video by a creator', '/thumbnails/creator-video.jpg', '/videos/creator-video.mp4', 'video', 'creators', 1800, FALSE);
