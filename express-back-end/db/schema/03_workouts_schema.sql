DROP TABLE IF EXISTS workouts CASCADE;

CREATE TABLE workouts (
  id SERIAL PRIMARY KEY NOT NULL,
  program_id INTEGER REFERENCES programs(id) ON DELETE CASCADE, 
  name VARCHAR(255),
  image VARCHAR(255),
  description TEXT,
  duration INTEGER
)