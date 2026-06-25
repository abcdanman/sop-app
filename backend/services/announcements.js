const supabase = require('../config/supabase');

async function listAnnouncements(){
  const { data, error } = await supabase.from('announcements').select('*').order('date', { ascending: false }).limit(50);
  if(error) throw error;
  return data;
}

async function createAnnouncement(a){
  const { data, error } = await supabase.from('announcements').insert([a]).select().single();
  if(error) throw error;
  return data;
}

async function updateAnnouncement(id, changes){
  const { data, error } = await supabase.from('announcements').update(changes).eq('id', id).select().single();
  if(error) throw error;
  return data;
}

async function deleteAnnouncement(id){
  const { error } = await supabase.from('announcements').delete().eq('id', id);
  if(error) throw error;
  return true;
}

module.exports = { listAnnouncements, createAnnouncement, updateAnnouncement, deleteAnnouncement };
