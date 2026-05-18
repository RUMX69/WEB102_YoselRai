import supabase from '@/lib/supabase';

export async function uploadVideo(file) {
  const path = `${Date.now()}_${file.name}`;
  const { data, error } = await supabase.storage
    .from('videos')
    .upload(path, file);
  if (error) throw error;
  return data;
}