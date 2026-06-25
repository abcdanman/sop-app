const dotenv = require('dotenv');
const supabase = require('./config/supabase');
const bcrypt = require('bcrypt');
dotenv.config();

async function seed(){
  console.log('Seeding via Supabase');
  // Note: This assumes the required tables (users, announcements, applications) already exist in your Supabase project.
  // Delete existing sample users/announcements by email/title to avoid duplicates
  await supabase.from('announcements').delete().neq('id', '');
  await supabase.from('users').delete().neq('id', '');

  const adminPass = await bcrypt.hash('AdminPass123', 10);
  const studentPass = await bcrypt.hash('student123', 10);

  await supabase.from('users').insert([
    { name: 'Admin User', email: 'admin@example.com', password: adminPass, role: 'admin' },
    { name: 'Sample Student', email: 'student@example.com', password: studentPass, role: 'student', university: 'UM', course: 'Computer Science' }
  ]);

  await supabase.from('announcements').insert([
    { title: 'Welcome to SOP', content: 'Applications are open for Semester 2.' },
    { title: 'Documents required', content: 'Please upload transcripts and CV as PDF.' }
  ]);

  console.log('Seed data created in Supabase');
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });
