/*
  # Initial Schema Setup for User Profiles and Data

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key, references auth.users)
      - `email` (text, unique)
      - `full_name` (text, nullable)
      - `avatar_url` (text, nullable)
      - `preferences` (jsonb, nullable)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `user_data`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `mood_entries` (jsonb array)
      - `habits` (jsonb array)
      - `goals` (jsonb array)
      - `gratitude_entries` (jsonb array)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users to manage their own data
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text,
  avatar_url text,
  preferences jsonb DEFAULT '{"theme": "light", "language": "en", "notifications": true}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create user_data table
CREATE TABLE IF NOT EXISTS user_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  mood_entries jsonb[] DEFAULT ARRAY[]::jsonb[],
  habits jsonb[] DEFAULT ARRAY[]::jsonb[],
  goals jsonb[] DEFAULT ARRAY[]::jsonb[],
  gratitude_entries jsonb[] DEFAULT ARRAY[]::jsonb[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_data ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- User data policies
CREATE POLICY "Users can view own data"
  ON user_data FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own data"
  ON user_data FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own data"
  ON user_data FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Function to handle profile updates
CREATE OR REPLACE FUNCTION handle_profile_updated()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to handle user data updates
CREATE OR REPLACE FUNCTION handle_user_data_updated()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers
CREATE TRIGGER on_profile_updated
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION handle_profile_updated();

CREATE TRIGGER on_user_data_updated
  BEFORE UPDATE ON user_data
  FOR EACH ROW
  EXECUTE FUNCTION handle_user_data_updated();

-- Function to create initial user data
CREATE OR REPLACE FUNCTION create_initial_user_data()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_data (user_id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for initial user data
CREATE TRIGGER on_profile_created
  AFTER INSERT ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION create_initial_user_data();