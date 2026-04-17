-- =============================================
-- POSTGRESQL SCHEMA: Visitors Table
-- Table for tracking website visitor page views

-- Create visitors table
CREATE TABLE IF NOT EXISTS visitors (
    -- Primary key: Auto-incrementing bigint for high volume scaling
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    
    -- Timestamp when visitor arrived: always use TIMESTAMPTZ in PostgreSQL
    visited_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    -- Page path that was visited
    path TEXT NOT NULL,
);