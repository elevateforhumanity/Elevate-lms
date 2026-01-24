-- Seed forum categories
INSERT INTO forum_categories (id, name, description, order_index) VALUES
  (gen_random_uuid(), 'General Discussion', 'General topics and community conversations', 1),
  (gen_random_uuid(), 'Healthcare Programs', 'Discuss CNA, Medical Assistant, Phlebotomy and other healthcare training', 2),
  (gen_random_uuid(), 'Skilled Trades', 'HVAC, Electrical, Plumbing, Welding discussions', 3),
  (gen_random_uuid(), 'Technology', 'IT Support, Cybersecurity, and tech career discussions', 4),
  (gen_random_uuid(), 'Job Search & Career', 'Resume tips, interview prep, job opportunities', 5),
  (gen_random_uuid(), 'Student Support', 'Get help with coursework, funding, and student services', 6)
ON CONFLICT DO NOTHING;
