-- =============================================
-- POSTGRESQL SCHEMA: Visitors Table
-- Table for tracking website visitor page views

-- Create visitors table
CREATE TABLE IF NOT EXISTS visits (
    -- Primary key: Auto-incrementing bigint for high volume scaling
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    
    -- Timestamp when visitor arrived: always use TIMESTAMPTZ in PostgreSQL
    visited_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    -- Page path that was visited
    path TEXT NOT NULL,
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
    -- Primary key: Auto-incrementing bigint for high volume scaling
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    
    -- Timestamp when visitor arrived: always use TIMESTAMPTZ in PostgreSQL
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    message json DEFAULT '{}'::json,
    
    CONSTRAINT messages_pkey PRIMARY KEY (id),
    CONSTRAINT messages_id_fkey FOREIGN KEY (id) REFERENCES public.visits(id)
);
-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.


-- Schema for Supabase
CREATE TABLE public.messages (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  message json DEFAULT '{}'::json,
  CONSTRAINT messages_pkey PRIMARY KEY (id),
  CONSTRAINT messages_id_fkey FOREIGN KEY (id) REFERENCES public.visits(id)
);
CREATE TABLE public.visits (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  visited_at timestamp with time zone NOT NULL DEFAULT now(),
  path text,
  CONSTRAINT visits_pkey PRIMARY KEY (id)
);