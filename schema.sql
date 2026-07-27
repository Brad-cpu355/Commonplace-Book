CREATE TABLE IF NOT EXISTS categories (
  key TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  color TEXT NOT NULL,
  prefix TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS entries (
  id TEXT PRIMARY KEY,
  catalog_no TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'other',
  content TEXT NOT NULL,
  source TEXT DEFAULT '',
  tags TEXT DEFAULT '[]',
  notes TEXT DEFAULT '',
  created_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_entries_created_at ON entries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_entries_category ON entries(category);

-- Seed the starting categories. Safe to run once; re-running won't duplicate
-- rows since `key` is the primary key (INSERT OR IGNORE skips existing ones).
INSERT OR IGNORE INTO categories (key, label, color, prefix, sort_order) VALUES
  ('physics', 'Physics', '#3E6591', 'PHY', 1),
  ('biology', 'Biology', '#556270', 'BIO', 2),
  ('technology', 'Technology', '#2E5C6E', 'TEC', 3),
  ('economics', 'Economics', '#4A4E69', 'ECO', 4),
  ('geoeconomics', 'Geoeconomics', '#324A5F', 'GEO', 5),
  ('history', 'History', '#2C3E50', 'HIS', 6),
  ('other', 'Other', '#6B7A8F', 'OTH', 99);
