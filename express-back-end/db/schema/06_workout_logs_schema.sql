DROP TABLE IF EXISTS workout_logs CASCADE;

CREATE TABLE workout_logs (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  value INTEGER,
  day VARCHAR(255)
)