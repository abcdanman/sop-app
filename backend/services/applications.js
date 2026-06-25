const supabase = require('../config/supabase');

async function createApplication(app){
  const { data, error } = await supabase.from('applications').insert([app]).select().single();
  if(error) throw error;
  return data;
}

async function listByStudent(studentId){
  const { data, error } = await supabase.from('applications').select('*, users(name,email)').eq('student', studentId);
  if(error) throw error;
  return data;
}

async function listAll(filter = {}){
  let query = supabase.from('applications').select('*, users(name,email,university,course)');
  if(filter.status) query = query.eq('status', filter.status);
  if(filter.q) query = query.ilike('programTitle', `%${filter.q}%`);
  const { data, error } = await query;
  if(error) throw error;
  return data;
}

async function updateStatus(id, status){
  const { data, error } = await supabase.from('applications').update({ status }).eq('id', id).select().single();
  if(error) throw error;
  return data;
}

async function stats(){
  const totalRes = await supabase.from('applications').select('*', { count: 'exact' });
  const approvedRes = await supabase.from('applications').select('*', { count: 'exact' }).eq('status','approved');
  const rejectedRes = await supabase.from('applications').select('*', { count: 'exact' }).eq('status','rejected');
  const pendingRes = await supabase.from('applications').select('*', { count: 'exact' }).eq('status','pending');
  return {
    total: totalRes.count || 0,
    approved: approvedRes.count || 0,
    rejected: rejectedRes.count || 0,
    pending: pendingRes.count || 0
  };
}

module.exports = { createApplication, listByStudent, listAll, updateStatus, stats };
