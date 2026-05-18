-- ═══════════════════════════════════════════
-- PsychStar — User Subscriptions Migration
-- Run this in Supabase SQL Editor
-- ═══════════════════════════════════════════

-- Create subscriptions table
CREATE TABLE IF NOT EXISTS user_subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  paper paper_type NOT NULL,  -- 'A' or 'B'
  tier TEXT NOT NULL DEFAULT 'free',  -- 'free', 'monthly', 'cycle', 'bundle'
  status TEXT NOT NULL DEFAULT 'active',  -- 'active', 'expired', 'cancelled'
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at TIMESTAMPTZ,
  stripe_subscription_id TEXT,
  stripe_customer_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  -- One subscription per user per paper
  UNIQUE(user_id, paper)
);

-- Enable RLS
ALTER TABLE user_subscriptions ENABLE ROW LEVEL SECURITY;

-- Users can read their own subscriptions
CREATE POLICY "Users can read own subscriptions"
  ON user_subscriptions FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own subscriptions (signup flow)
CREATE POLICY "Users can insert own subscriptions"
  ON user_subscriptions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own subscriptions
CREATE POLICY "Users can update own subscriptions"
  ON user_subscriptions FOR UPDATE
  USING (auth.uid() = user_id);

-- Admins can read all subscriptions
CREATE POLICY "Admins can read all subscriptions"
  ON user_subscriptions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM admins WHERE admins.user_id = auth.uid()
    )
  );

-- Index for fast lookups
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_user_id ON user_subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_paper ON user_subscriptions(paper);
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_status ON user_subscriptions(status);

-- Function to check if user has active subscription for a paper
CREATE OR REPLACE FUNCTION has_active_subscription(p_user_id UUID, p_paper paper_type)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM user_subscriptions
    WHERE user_id = p_user_id
      AND paper = p_paper
      AND status = 'active'
      AND (expires_at IS NULL OR expires_at > now())
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get user's subscription tier for a paper
CREATE OR REPLACE FUNCTION get_subscription_tier(p_user_id UUID, p_paper paper_type)
RETURNS TEXT AS $$
DECLARE
  v_tier TEXT;
BEGIN
  SELECT tier INTO v_tier
  FROM user_subscriptions
  WHERE user_id = p_user_id
    AND paper = p_paper
    AND status = 'active'
    AND (expires_at IS NULL OR expires_at > now())
  LIMIT 1;

  RETURN COALESCE(v_tier, 'free');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Auto-create free subscriptions for new users (both papers)
CREATE OR REPLACE FUNCTION handle_new_user_subscription()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_subscriptions (user_id, paper, tier, status)
  VALUES
    (NEW.id, 'A', 'free', 'active'),
    (NEW.id, 'B', 'free', 'active');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger on user signup
DROP TRIGGER IF EXISTS on_auth_user_created_subscriptions ON auth.users;
CREATE TRIGGER on_auth_user_created_subscriptions
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user_subscription();

-- Backfill: create free subscriptions for existing users who don't have them
INSERT INTO user_subscriptions (user_id, paper, tier, status)
SELECT u.id, p.paper, 'free', 'active'
FROM auth.users u
CROSS JOIN (VALUES ('A'::paper_type), ('B'::paper_type)) AS p(paper)
LEFT JOIN user_subscriptions us ON us.user_id = u.id AND us.paper = p.paper
WHERE us.id IS NULL;
