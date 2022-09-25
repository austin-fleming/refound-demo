-- BASE USER
CREATE TABLE IF NOT EXISTS base_user (
  base_user_id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  email_account text UNIQUE NOT NULL,
  is_email_verified boolean NOT NULL DEFAULT FALSE,
  password_hash text NOT NULL,
  is_admin boolean NOT NULL DEFAULT FALSE,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
);
CREATE EXTENSION IF NOT EXISTS moddatetime SCHEMA extensions;
CREATE TRIGGER handle_base_user_updated_at
  BEFORE UPDATE ON base_user
  FOR EACH ROW
  EXECUTE PROCEDURE moddatetime (updated_at);


-- AUTHOR
CREATE TABLE IF NOT EXISTS author (
  author_id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  author_base_id uuid FOREIGN KEY REFERENCES base_user(base_user_id) PRIMARY KEY ON DELETE CASCADE ON UPDATE CASCADE,
  name text NOT NULL,
  blurb text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
);
CREATE EXTENSION IF NOT EXISTS moddatetime SCHEMA extensions;
CREATE TRIGGER handle_author_updated_at
  BEFORE UPDATE ON author
  FOR EACH ROW
  EXECUTE PROCEDURE moddatetime (updated_at);