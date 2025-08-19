-- Insert sample data for development and testing
INSERT INTO users (email, username, full_name) VALUES
  ('demo@oranu.com', 'demo_user', 'Demo User'),
  ('student@example.com', 'studious_sam', 'Sam Student'),
  ('learner@example.com', 'learning_lucy', 'Lucy Learner')
ON CONFLICT (email) DO NOTHING;

-- Insert sample tasks
INSERT INTO tasks (user_id, title, description, due_date, priority, estimated_duration) 
SELECT 
  u.id,
  'Complete Math Assignment',
  'Finish calculus homework chapter 5',
  NOW() + INTERVAL '2 days',
  'high',
  90
FROM users u WHERE u.username = 'demo_user'
ON CONFLICT DO NOTHING;

INSERT INTO tasks (user_id, title, description, due_date, priority, estimated_duration)
SELECT 
  u.id,
  'Read History Chapter',
  'Read and take notes on World War II chapter',
  NOW() + INTERVAL '1 day',
  'medium',
  60
FROM users u WHERE u.username = 'demo_user'
ON CONFLICT DO NOTHING;

-- Initialize streaks for users
INSERT INTO streaks (user_id, current_streak, longest_streak, last_study_date)
SELECT 
  u.id,
  3,
  7,
  CURRENT_DATE - INTERVAL '1 day'
FROM users u
ON CONFLICT DO NOTHING;
