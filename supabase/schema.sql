-- Games and Connect - Supabase Database Schema
-- Run this SQL in your Supabase SQL Editor to create all tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==========================================
-- EVENTS TABLE
-- ==========================================
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ,
  location TEXT,
  price DECIMAL(10,2),
  early_bird_price DECIMAL(10,2),
  image_url TEXT,
  category TEXT CHECK (category IN ('game-day', 'party', 'trivia', 'travel', 'other')) DEFAULT 'other',
  is_featured BOOLEAN DEFAULT false,
  max_capacity INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- REGISTRATIONS TABLE
-- ==========================================
CREATE TABLE registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  team TEXT CHECK (team IN ('red', 'yellow', 'blue', 'green')),
  payment_status TEXT CHECK (payment_status IN ('pending', 'completed', 'failed', 'free')) DEFAULT 'pending',
  payment_reference TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- TRAVEL / TRIPS TABLE
-- ==========================================
CREATE TABLE travel (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  destination TEXT NOT NULL,
  description TEXT,
  departure_date DATE NOT NULL,
  return_date DATE NOT NULL,
  price DECIMAL(10,2),
  itinerary JSONB,
  image_url TEXT,
  max_spots INTEGER,
  spots_left INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- TRIVIA TABLE
-- ==========================================
CREATE TABLE trivia (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  date TIMESTAMPTZ NOT NULL,
  theme TEXT,
  whatsapp_link TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- MESSAGES / CONTACT TABLE
-- ==========================================
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT CHECK (type IN ('contact', 'volunteer', 'newsletter')) DEFAULT 'contact',
  phone TEXT,
  skills TEXT,
  availability TEXT,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- GALLERY IMAGES TABLE
-- ==========================================
CREATE TABLE gallery (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  image_url TEXT NOT NULL,
  caption TEXT,
  category TEXT CHECK (category IN ('game-day', 'travel', 'party', 'trivia')),
  event_id UUID REFERENCES events(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- INDEX CREATION FOR PERFORMANCE
-- ==========================================
CREATE INDEX idx_events_date ON events(date);
CREATE INDEX idx_events_category ON events(category);
CREATE INDEX idx_events_featured ON events(is_featured);
CREATE INDEX idx_registrations_event ON registrations(event_id);
CREATE INDEX idx_registrations_email ON registrations(email);
CREATE INDEX idx_travel_departure ON travel(departure_date);
CREATE INDEX idx_messages_type ON messages(type);
CREATE INDEX idx_messages_read ON messages(is_read);
CREATE INDEX idx_gallery_category ON gallery(category);

-- ==========================================
-- ROW LEVEL SECURITY (RLS)
-- ==========================================
-- Enable RLS on all tables
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE travel ENABLE ROW LEVEL SECURITY;
ALTER TABLE trivia ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

-- Public read access for events, travel, trivia, gallery
CREATE POLICY "Public read access" ON events FOR SELECT USING (true);
CREATE POLICY "Public read access" ON travel FOR SELECT USING (true);
CREATE POLICY "Public read access" ON trivia FOR SELECT USING (true);
CREATE POLICY "Public read access" ON gallery FOR SELECT USING (true);

-- Public insert for registrations and messages (anyone can register/contact)
CREATE POLICY "Public insert access" ON registrations FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert access" ON messages FOR INSERT WITH CHECK (true);

-- Note: For admin write access, you'll need to set up Supabase Auth
-- and create policies based on authenticated users with admin role
