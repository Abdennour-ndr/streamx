-- Ads System Tables

-- Ad Networks Table
CREATE TABLE IF NOT EXISTS ad_networks (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    api_key TEXT NOT NULL,
    api_secret TEXT,
    status TEXT DEFAULT 'active',
    revenue_share DECIMAL(5,2) DEFAULT 70.00, -- Percentage of revenue shared with platform
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Ad Units Table
CREATE TABLE IF NOT EXISTS ad_units (
    id TEXT PRIMARY KEY,
    network_id TEXT NOT NULL,
    name TEXT NOT NULL,
    type TEXT NOT NULL, -- banner, video, native, interstitial
    size TEXT NOT NULL, -- 300x250, 728x90, etc.
    placement TEXT NOT NULL, -- header, sidebar, content, etc.
    status TEXT DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (network_id) REFERENCES ad_networks(id)
);

-- Ad Campaigns Table
CREATE TABLE IF NOT EXISTS ad_campaigns (
    id TEXT PRIMARY KEY,
    network_id TEXT NOT NULL,
    name TEXT NOT NULL,
    advertiser TEXT NOT NULL,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP,
    budget DECIMAL(10,2) NOT NULL,
    status TEXT DEFAULT 'active',
    targeting JSONB, -- Targeting criteria
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (network_id) REFERENCES ad_networks(id)
);

-- Ad Performance Table
CREATE TABLE IF NOT EXISTS ad_performance (
    id TEXT PRIMARY KEY,
    ad_unit_id TEXT NOT NULL,
    campaign_id TEXT NOT NULL,
    date DATE NOT NULL,
    impressions INTEGER DEFAULT 0,
    clicks INTEGER DEFAULT 0,
    revenue DECIMAL(10,2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ad_unit_id) REFERENCES ad_units(id),
    FOREIGN KEY (campaign_id) REFERENCES ad_campaigns(id)
);

-- Ad Network Settings
CREATE TABLE IF NOT EXISTS ad_network_settings (
    id TEXT PRIMARY KEY,
    network_id TEXT NOT NULL,
    setting_key TEXT NOT NULL,
    setting_value TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (network_id) REFERENCES ad_networks(id)
);

-- Insert sample ad networks
INSERT INTO ad_networks (id, name, api_key, revenue_share) VALUES
('net_001', 'Media.net', 'sample_api_key_1', 70.00),
('net_002', 'PropellerAds', 'sample_api_key_2', 75.00),
('net_003', 'Adsterra', 'sample_api_key_3', 80.00);

-- Insert sample ad units
INSERT INTO ad_units (id, network_id, name, type, size, placement) VALUES
('unit_001', 'net_001', 'Header Banner', 'banner', '728x90', 'header'),
('unit_002', 'net_001', 'Sidebar Ad', 'banner', '300x250', 'sidebar'),
('unit_003', 'net_002', 'Video Pre-roll', 'video', '640x360', 'pre-roll'),
('unit_004', 'net_003', 'Content Native', 'native', '300x250', 'content'); 