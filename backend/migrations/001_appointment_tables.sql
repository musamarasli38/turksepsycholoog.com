-- Migration: Create appointment system tables
-- Date: 2026-03-26
-- Description: Creates tables for appointment booking system with Google Calendar integration

-- 1. OAuth Credentials Table (for storing Google Calendar tokens)
CREATE TABLE public.oauth_credentials (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  provider VARCHAR NOT NULL, -- 'google_calendar'
  access_token TEXT NOT NULL,
  refresh_token TEXT NOT NULL,
  token_expires_at TIMESTAMP WITH TIME ZONE,
  google_calendar_id VARCHAR, -- The Google Calendar ID for syncing
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Availability Slots Table (psychologist's recurring weekly schedule)
CREATE TABLE public.availability_slots (
  id BIGSERIAL PRIMARY KEY,
  day_of_week INT NOT NULL CHECK (day_of_week BETWEEN 0 AND 6), -- 0=Sunday, 1=Monday, ..., 6=Saturday
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  slot_duration_minutes INT DEFAULT 60,
  created_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Appointments Table (booked appointments)
CREATE TABLE public.appointments (
  id BIGSERIAL PRIMARY KEY,
  client_name VARCHAR NOT NULL,
  client_email VARCHAR NOT NULL,
  client_phone VARCHAR NOT NULL,
  client_notes TEXT,
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  status VARCHAR DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  confirmation_code VARCHAR(8) NOT NULL UNIQUE, -- Code for client email verification
  google_event_id VARCHAR, -- To track synced Google Calendar event
  reminder_sent BOOLEAN DEFAULT FALSE,
  created_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Appointment Reminders Table (track sent SMS reminders)
CREATE TABLE public.appointment_reminders (
  id BIGSERIAL PRIMARY KEY,
  appointment_id BIGINT NOT NULL REFERENCES appointments(id) ON DELETE CASCADE,
  reminder_sent_at TIMESTAMP WITH TIME ZONE,
  sms_tools_response JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ====== ROW LEVEL SECURITY POLICIES ======

-- OAuth Credentials: Users can only see their own credentials
ALTER TABLE public.oauth_credentials ENABLE ROW LEVEL SECURITY;

CREATE POLICY oauth_credentials_users_can_read_own ON public.oauth_credentials
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY oauth_credentials_users_can_insert_own ON public.oauth_credentials
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY oauth_credentials_users_can_update_own ON public.oauth_credentials
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY oauth_credentials_users_can_delete_own ON public.oauth_credentials
  FOR DELETE USING (auth.uid() = user_id);

-- Availability Slots: Psychologists can only see/manage their own
ALTER TABLE public.availability_slots ENABLE ROW LEVEL SECURITY;

CREATE POLICY availability_slots_users_can_read_own ON public.availability_slots
  FOR SELECT USING (auth.uid() = created_by);

CREATE POLICY availability_slots_users_can_insert ON public.availability_slots
  FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY availability_slots_users_can_update_own ON public.availability_slots
  FOR UPDATE USING (auth.uid() = created_by);

CREATE POLICY availability_slots_users_can_delete_own ON public.availability_slots
  FOR DELETE USING (auth.uid() = created_by);

-- Appointments: Psychologists can only see/manage their own appointments
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

CREATE POLICY appointments_users_can_read_own ON public.appointments
  FOR SELECT USING (auth.uid() = created_by);

CREATE POLICY appointments_users_can_insert ON public.appointments
  FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY appointments_users_can_update_own ON public.appointments
  FOR UPDATE USING (auth.uid() = created_by);

CREATE POLICY appointments_users_can_delete_own ON public.appointments
  FOR DELETE USING (auth.uid() = created_by);

-- Appointment Reminders: Psychologists can see reminders for their appointments
ALTER TABLE public.appointment_reminders ENABLE ROW LEVEL SECURITY;

CREATE POLICY appointment_reminders_users_can_read_own ON public.appointment_reminders
  FOR SELECT USING (
    appointment_id IN (
      SELECT id FROM appointments WHERE auth.uid() = created_by
    )
  );

CREATE POLICY appointment_reminders_users_can_insert ON public.appointment_reminders
  FOR INSERT WITH CHECK (
    appointment_id IN (
      SELECT id FROM appointments WHERE auth.uid() = created_by
    )
  );
