-- NOTE: cache is loose with very limited constraints.
-- Invariants should be checked when writing to chain, not here.
--
-- ===============================
-- PROFILE
-- ===============================
DROP TABLE IF EXISTS profile CASCADE;

CREATE TABLE IF NOT EXISTS profile (
    id bigint PRIMARY KEY,
    username text NOT NULL UNIQUE, -- if these constraints break, the program is broken.
    wallet_address text NOT NULL UNIQUE, -- if these constraints break, the program is broken.
    joined_on timestamp NOT NULL,
    bio text,
    avatar_url text
);

ALTER TABLE profile ENABLE ROW LEVEL SECURITY;

-- ===============================
-- PROFILE VERIFICATION LEVEL
-- ===============================
DROP TABLE IF EXISTS profile_verification_level CASCADE;

CREATE TABLE IF NOT EXISTS profile_verification_level (
    id bigint REFERENCES profile (id) PRIMARY KEY,
    level integer DEFAULT 0 NOT NULL
);

ALTER TABLE profile_verification_level ENABLE ROW LEVEL SECURITY;

-- ===============================
-- HOLDING ACCOUNT
-- ===============================
DROP TABLE IF EXISTS holding_account CASCADE;

CREATE TABLE IF NOT EXISTS holding_account (
    owner_address text PRIMARY KEY,
    profile_id bigint REFERENCES profile (id) UNIQUE NOT NULL,
    balance bigint,
    is_locked boolean
);

ALTER TABLE holding_account ENABLE ROW LEVEL SECURITY;

-- ===============================
-- HOLDING ACCOUNT BENEFICIARY
-- ===============================
DROP TABLE IF EXISTS holding_account_beneficiary CASCADE;

CREATE TABLE IF NOT EXISTS holding_account_beneficiary (
    beneficiary text, -- walletAddress
    account text REFERENCES holding_account (owner_address), -- walletAddress
    PRIMARY KEY (beneficiary, account),
    is_deleted boolean DEFAULT FALSE NOT NULL,
    claim_placed boolean,
    release_date timestamp
);

ALTER TABLE holding_account_beneficiary ENABLE ROW LEVEL SECURITY;

-- ===============================
-- HOLDING ACCOUNT ACTION
-- ===============================
DROP TABLE IF EXISTS holding_account_action CASCADE;

CREATE TABLE IF NOT EXISTS holding_account_action (
    id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
    account text REFERENCES holding_account (owner_address) NOT NULL,
    account_action text NOT NULL,
    amount bigint NOT NULL,
    performed_by text NOT NULL,
    completion_date timestamp
);

ALTER TABLE holding_account_action
    ADD CONSTRAINT valid_action CHECK (account_action IN ('WITHDRAW', 'DEPOSIT', 'BENEFICIARY_CLAIM', 'BENEFICIARY_CANCEL', 'BENEFICIARY_WITHDRAW'));

ALTER TABLE holding_account_action ENABLE ROW LEVEL SECURITY;

-- ===============================
-- SUBSCRIPTION PLAN
-- ===============================
DROP TABLE IF EXISTS subscription_plan CASCADE;

CREATE TABLE IF NOT EXISTS subscription_plan (
    id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
    account text REFERENCES holding_account (owner_address) NOT NULL,
    start_time timestamp NOT NULL
);

ALTER TABLE subscription_plan ENABLE ROW LEVEL SECURITY;

-- ===============================
-- SUBSCRIPTION
-- ===============================
DROP TABLE IF EXISTS subscription CASCADE;

CREATE TABLE IF NOT EXISTS subscription (
    plan_id uuid REFERENCES subscription_plan (id),
    subscriber bigint REFERENCES profile (id),
    PRIMARY KEY (plan_id, subscriber),
    amount bigint
);

ALTER TABLE subscription ENABLE ROW LEVEL SECURITY;

-- ===============================
-- POST
-- ===============================
DROP TABLE IF EXISTS post CASCADE;

CREATE TABLE IF NOT EXISTS post (
    id bigint PRIMARY KEY,
    creator bigint REFERENCES profile (id) NOT NULL,
    title text NOT NULL,
    created_at timestamp NOT NULL,
    tags text[] DEFAULT '{}' NOT NULL,
    location text,
    post_type text NOT NULL,
    description text,
    -- image fields
    width integer,
    height integer,
    image_link text, --url
    taken_on timestamp,
    -- article fields
    body text, -- pulled from url
    cover_image bigint REFERENCES post (id) -- url
);

ALTER TABLE post
    ADD CONSTRAINT valid_post_type CHECK (post_type IN ('IMAGE', 'ARTICLE'));

ALTER TABLE post
    ADD CONSTRAINT valid_image_post_fields CHECK (post_type != 'IMAGE' OR (image_link IS NOT NULL AND description IS NOT NULL));

ALTER TABLE post
    ADD CONSTRAINT valid_article_post_fields CHECK (post_type != 'ARTICLE' OR (body IS NOT NULL));

ALTER TABLE post ENABLE ROW LEVEL SECURITY;

-- ===============================
-- POST INTERACTION
-- ===============================
DROP TABLE IF EXISTS post_interaction CASCADE;

CREATE TABLE IF NOT EXISTS post_interaction (
    post_id bigint REFERENCES post (id),
    interactor bigint REFERENCES profile (id),
    PRIMARY KEY (post_id, interactor),
    interaction_type integer NOT NULL
);

ALTER TABLE post_interaction ENABLE ROW LEVEL SECURITY;

-- ===============================
-- LICENSE
-- ===============================
DROP TABLE IF EXISTS license CASCADE;

CREATE TABLE IF NOT EXISTS license (
    id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
    post_id bigint REFERENCES post (id) NOT NULL,
    license_type integer NOT NULL,
    owner_address text NOT NULL, -- wallet address
    purchase_price bigint NOT NULL,
    purchase_date timestamp
);

ALTER TABLE license ENABLE ROW LEVEL SECURITY;

-- ===============================
-- POOL
-- ===============================
DROP TABLE IF EXISTS pool CASCADE;

CREATE TABLE IF NOT EXISTS pool (
    id bigint PRIMARY KEY,
    creator bigint REFERENCES profile (id) NOT NULL,
    goal bigint NOT NULL,
    total_pledged bigint NOT NULL,
    title text NOT NULL,
    summary text NOT NULL,
    cover_image bigint REFERENCES post (id),
    start_at timestamp NOT NULL,
    end_at timestamp NOT NULL,
    claimed boolean NOT NULL,
    cancelled boolean NOT NULL
);

ALTER TABLE pool ENABLE ROW LEVEL SECURITY;

-- ===============================
-- POOL PLEDGER
-- ===============================
DROP TABLE IF EXISTS pool_pledger CASCADE;

CREATE TABLE IF NOT EXISTS pool_pledger (
    pledger_id bigint REFERENCES profile (id),
    pool_id bigint REFERENCES pool (id),
    PRIMARY KEY (pledger_id, pool_id),
    total_pledge bigint DEFAULT 0 NOT NULL,
    inserted_at timestamp DEFAULT now() NOT NULL
);

ALTER TABLE pool_pledger ENABLE ROW LEVEL SECURITY;

-- ===============================
-- POOL PLEDGER EVENT
-- ===============================
DROP TABLE IF EXISTS pool_pledge_event CASCADE;

CREATE TABLE IF NOT EXISTS pool_pledge_event (
    id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
    pledger_id bigint REFERENCES profile (id),
    pool_id bigint REFERENCES pool (id),
    event_type text NOT NULL,
    amount bigint NOT NULL,
    transaction_date timestamp NOT NULL
);

ALTER TABLE pool_pledge_event
    ADD CONSTRAINT valid_pool_pledge_type CHECK (event_type IN ('PLEDGE', 'UNPLEDGE', 'REFUND'));

ALTER TABLE pool_pledge_event ENABLE ROW LEVEL SECURITY;

