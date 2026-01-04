import { supa } from './supa';

export type Program = {
  id: string;
  slug: string;
  title: string;
  track: string;
  blurb: string | null;
  hours: string | null;
  cover_url: string | null;
  created_at: string;
};

export async function listPrograms() {
  const { data, error } = await supa
    .from('programs')
    .select('id, slug, title, track, blurb, hours, cover_url')
    .order('title');
  if (error) throw error;
  return data as Program[];
}

export async function getProgramBySlug(slug: string) {
  const { data, error } = await supa
    .from('programs')
    .select('id, slug, title, track, blurb, hours, cover_url')
    .eq('slug', slug)
    .single();
  if (error) throw error;
  return data as Program;
}
