import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register(){
  const [form, setForm] = useState({ name:'', email:'', password:'', university:'', course:'' });
  const [err, setErr] = useState('');
  const nav = useNavigate();
  const submit = async e =>{
    e.preventDefault();
    try{
      const r = await axios.post('/api/auth/register', form);
      localStorage.setItem('token', r.data.token);
      const me = await axios.get('/api/auth/me', { headers: { Authorization: 'Bearer '+r.data.token } });
      localStorage.setItem('role', me.data.role);
      nav('/dashboard');
    }catch(e){ setErr(e.response?.data?.msg || 'Register failed'); }
  }
  return (
    <div className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/60 sm:p-9">
      <p className="text-sm font-bold uppercase tracking-wider text-blue-600">Student registration</p>
      <h2 className="mt-2 text-3xl font-bold">Create your mobility profile</h2>
      <p className="mt-2 text-sm text-slate-500">Use your university details so the programme team can verify your application.</p>
      {err && <div className="mt-5 rounded-xl bg-red-50 p-3 text-sm text-red-700">{err}</div>}
      <form onSubmit={submit} className="mt-6 grid gap-4 sm:grid-cols-2">
        <input required value={form.name} onChange={e=>setForm({...form, name:e.target.value})} placeholder="Full name" className="rounded-xl border border-slate-300 p-3 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100" />
        <input required type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} placeholder="Email address" className="rounded-xl border border-slate-300 p-3 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100" />
        <input required type="password" minLength="8" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} placeholder="Password (8+ characters)" className="rounded-xl border border-slate-300 p-3 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100" />
        <input required value={form.university} onChange={e=>setForm({...form, university:e.target.value})} placeholder="University" className="rounded-xl border border-slate-300 p-3 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100" />
        <input required value={form.course} onChange={e=>setForm({...form, course:e.target.value})} placeholder="Course / programme" className="rounded-xl border border-slate-300 p-3 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 sm:col-span-2" />
        <button className="rounded-xl bg-blue-600 px-4 py-3 font-bold text-white shadow hover:bg-blue-700 sm:col-span-2">Create account</button>
      </form>
    </div>
  );
}
