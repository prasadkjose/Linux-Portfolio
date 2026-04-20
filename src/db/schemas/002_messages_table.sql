CREATE TABLE public.messages (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  message json DEFAULT '{}'::json,
  CONSTRAINT messages_pkey PRIMARY KEY (id),
  CONSTRAINT messages_id_fkey FOREIGN KEY (id) REFERENCES public.visits(id)
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