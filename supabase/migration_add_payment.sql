-- ==========================================
-- MIGRATION: Add Payment Columns to Registrations
-- Run this in your Supabase SQL Editor
-- ==========================================

-- Add payment columns to registrations table
ALTER TABLE registrations 
ADD COLUMN IF NOT EXISTS payment_status TEXT CHECK (payment_status IN ('pending', 'completed', 'failed', 'free')) DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS payment_reference TEXT;

-- Create index on payment_reference for faster lookups
CREATE INDEX IF NOT EXISTS idx_registrations_payment_ref ON registrations(payment_reference);

-- Ensure RLS policy allows insert with new columns (drop and recreate)
DROP POLICY IF EXISTS "Public insert access" ON registrations;
CREATE POLICY "Public insert access" ON registrations FOR INSERT WITH CHECK (true);

-- Also add update policy for payment status updates
DROP POLICY IF EXISTS "Public update payment" ON registrations;
CREATE POLICY "Public update payment" ON registrations FOR UPDATE USING (true) WITH CHECK (true);

-- Grant read access for registrations (for checkout verification)
DROP POLICY IF EXISTS "Public read registrations" ON registrations;
CREATE POLICY "Public read registrations" ON registrations FOR SELECT USING (true);
