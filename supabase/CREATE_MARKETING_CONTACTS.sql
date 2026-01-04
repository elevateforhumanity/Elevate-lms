-- Create marketing_contacts table for lead management
CREATE TABLE IF NOT EXISTS public.marketing_contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  phone TEXT,
  message TEXT,
  source TEXT DEFAULT 'website',
  tags TEXT[] DEFAULT '{}',
  interest TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'enrolled', 'not_interested')),
  unsubscribed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  last_contacted_at TIMESTAMPTZ,
  notes TEXT
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_marketing_contacts_email ON public.marketing_contacts(email);
CREATE INDEX IF NOT EXISTS idx_marketing_contacts_status ON public.marketing_contacts(status);
CREATE INDEX IF NOT EXISTS idx_marketing_contacts_created_at ON public.marketing_contacts(created_at DESC);

-- Enable RLS
ALTER TABLE public.marketing_contacts ENABLE ROW LEVEL SECURITY;

-- Policy: Allow service role full access
CREATE POLICY "Service role has full access to marketing_contacts"
  ON public.marketing_contacts
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Policy: Allow authenticated users to read
CREATE POLICY "Authenticated users can read marketing_contacts"
  ON public.marketing_contacts
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Allow authenticated users to insert
CREATE POLICY "Authenticated users can insert marketing_contacts"
  ON public.marketing_contacts
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy: Allow authenticated users to update
CREATE POLICY "Authenticated users can update marketing_contacts"
  ON public.marketing_contacts
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_marketing_contacts_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at
CREATE TRIGGER update_marketing_contacts_updated_at
  BEFORE UPDATE ON public.marketing_contacts
  FOR EACH ROW
  EXECUTE FUNCTION update_marketing_contacts_updated_at();

-- Insert sample contacts (the ones you provided)
INSERT INTO public.marketing_contacts (email, full_name, message, interest, created_at, status)
VALUES
  ('Info@totalsupporthomecare.org', 'Jakelia Taylor', 'Hello my name is Jakelia Taylor I meet you picking up the chairs from the storage. We spoke about you sending me information on how we could connect I look forward in hearing from you soon! Best Regards', 'General Interest', now() - interval '1 day', 'new'),
  ('mella.holifield@icloud.com', 'Premella Holifield', 'Educator', 'Educator', now() - interval '1 day', 'new'),
  ('a_hurns@yahoo.com', 'Angela Hurns', 'I spoke with Ms. Elizabeth today and wanted to receive more information about the programs offered.', 'General Programs', now() - interval '6 days', 'new'),
  ('harriskimberly738@gmail.com', 'Kimberly Harris', 'I''m interested CDL training', 'CDL Training', now() - interval '7 days', 'new'),
  ('dkalandry@gmail.com', 'Koman djan', 'Good morning , I am interested in taking one of your training program so please i would like to get more information how to get in . Thank you', 'General Training', now() - interval '7 days', 'new'),
  ('eviennejoseph1083@yahoo.com', 'Eve', 'Hey you did my hair on Nov 1 . We did discuss about hvac school, how we can come up with a plan to work together .', 'HVAC Training', now() - interval '19 days', 'new'),
  ('rerobison5@gmail.com', 'robert robison', 'I am interested in starting a business and need help with funding', 'Business Start-Up', now() - interval '27 days', 'new'),
  ('1sarralee@gmail.com', 'Sarra L Foster', 'I would like to start learning about Tax preparation.', 'Tax Preparation', now() - interval '28 days', 'new'),
  ('keiransolace@gmail.com', 'Jordan McClung', 'So i talked to one of your workers and I was asking them if there was a digital design programm and they said they would make it just for me and I was happy they said they would have it done by last Friday but it''s be 6 days now and I keep calling them about it but they really don''t help so can you please reach out to me i already have a account on elevate for humanity program website and a account on indeed job search.', 'Digital Design', now() - interval '29 days', 'new'),
  ('Blaisefilsinger@icloud.com', 'Blaise Filsinger', 'I spoke to the woman at Wednesdays career fair in Indianapolis. I drove a tractor trailer, CDL A driving for 13 years, she told me about being a driver trainer starting my own school. I''m interested in hearing more about that opportunity.', 'CDL Instructor', now() - interval '29 days', 'new'),
  ('maryannelundy@gmail.com', 'Maryanne Lundy', 'TAX CLASS', 'Tax Preparation', now() - interval '29 days', 'new'),
  ('Reshow@yahoo.com', 'Reshown Mcnary', 'I would like to know what type of programs y''all offer and what type of funding do y''all have?', 'General Programs', now() - interval '30 days', 'new'),
  ('winfordsonya@yahoo.com', 'Sonya Winford', 'I''m interested in the HHA training program', 'HHA Training', now() - interval '42 days', 'new'),
  ('mcclujor000@warren.k12.in.us', 'Jordan McClung', 'I was wondering if yall have like a animation program or something similar to that.', 'Animation Program', now() - interval '52 days', 'new'),
  ('Baileeli000@gmail.com', 'Elijah Bailey', 'I was told to contact yall for a dental program funding', 'Dental Program', now() - interval '54 days', 'new'),
  ('Litherland.salena@gmail.com', 'Salena Lithetland', 'I want to start my journey in cosmetology asap I want to be know for my work an maybe work with celebrities some day', 'Cosmetology', now() - interval '56 days', 'new'),
  ('miyahras@gmail.com', 'Miyahra Sanders', 'Hi , I havee a 16yr old and 17yr old interested in the cosmetology and nail program. Cold you please let me know what youth grants/programs you may offer and hot to get them enrolled as soon as possible ? please send me an email as i am a nursing student trying to help my daughters out', 'Youth Cosmetology', now() - interval '109 days', 'new')
ON CONFLICT (email) DO NOTHING;

-- Verify the data
SELECT COUNT(*) as total_contacts FROM public.marketing_contacts;
