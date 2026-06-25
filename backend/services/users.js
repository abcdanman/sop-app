const supabase = require('../config/supabase');

async function findByEmail(email){
  const { data, error } = await supabase.from('users').select('*').eq('email', email).limit(1).maybeSingle();
  if(error) throw error;
  return data;
}

async function findById(id){
  const { data, error } = await supabase.from('users').select('id,name,email,university,course,role').eq('id', id).limit(1).maybeSingle();
  if(error) throw error;
  return data;
}

async function createUser(user){
  const { data, error } = await supabase.from('users').insert([user]).select().single();
  if(error) throw error;
  return data;
}

async function listStudents(){
  const { data, error } = await supabase.from('users').select('id,name,email,university,course').eq('role','student');
  if(error) throw error;
  return data;
}

module.exports = { findByEmail, findById, createUser, listStudents };
