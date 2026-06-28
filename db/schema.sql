CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE registrations (
  id            SERIAL PRIMARY KEY,
  status        VARCHAR(20) DEFAULT 'pending',
  photo_consent BOOLEAN NOT NULL,
  signature     VARCHAR(150) NOT NULL,
  created_at    TIMESTAMP DEFAULT NOW(),
  updated_at    TIMESTAMP DEFAULT NOW()
);

CREATE TABLE guardians (
  id              SERIAL PRIMARY KEY,
  registration_id INTEGER NOT NULL REFERENCES registrations(id) ON DELETE CASCADE,
  role            VARCHAR(10) NOT NULL,
  first_name      VARCHAR(100) NOT NULL,
  last_name       VARCHAR(100) NOT NULL,
  email           VARCHAR(150) NOT NULL,
  phone           VARCHAR(30) NOT NULL,
  address         VARCHAR(250) NOT NULL
);

CREATE TABLE emergency_contacts (
  id                 SERIAL PRIMARY KEY,
  registration_id    INTEGER NOT NULL REFERENCES registrations(id) ON DELETE CASCADE,
  contact_name       VARCHAR(150) NOT NULL,
  contact_phone      VARCHAR(30) NOT NULL,
  authorized_pickup  TEXT,
  additional_emails  TEXT,
  additional_phones  TEXT
);

CREATE TABLE children (
  id              SERIAL PRIMARY KEY,
  registration_id INTEGER NOT NULL UNIQUE REFERENCES registrations(id) ON DELETE CASCADE,
  first_name      VARCHAR(100) NOT NULL,
  last_name       VARCHAR(100) NOT NULL,
  date_of_birth   DATE NOT NULL,
  gender          VARCHAR(20) NOT NULL,
  allergies       TEXT NOT NULL,
  medication      TEXT NOT NULL,
  insurance_enc   BYTEA
);

CREATE TABLE programs (
  id   SERIAL PRIMARY KEY,
  code VARCHAR(10) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL
);

INSERT INTO programs (code, name) VALUES
  ('OOSH', 'Out of School Hours'),
  ('PTC',  'Private Tutoring Class'),
  ('SA',   'Seasonal Activity (Camps, PNO)');

CREATE TABLE registration_programs (
  registration_id INTEGER NOT NULL REFERENCES registrations(id) ON DELETE CASCADE,
  program_id      INTEGER NOT NULL REFERENCES programs(id),
  PRIMARY KEY (registration_id, program_id)
);

CREATE INDEX idx_guardians_reg ON guardians(registration_id);
CREATE INDEX idx_emergency_reg ON emergency_contacts(registration_id);
CREATE INDEX idx_children_reg ON children(registration_id);
CREATE INDEX idx_regprog_reg ON registration_programs(registration_id);
CREATE INDEX idx_registrations_status ON registrations(status);
CREATE INDEX idx_registrations_created ON registrations(created_at DESC);
