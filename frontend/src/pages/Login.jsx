import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const nav = useNavigate();
  const submit = async e =>{
    e.preventDefault();
    try{
      const r = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('token', r.data.token);
      // decode role later via API call
      const me = await axios.get('/api/auth/me', { headers: { Authorization: 'Bearer '+r.data.token } });
      localStorage.setItem('role', me.data.role);
      nav('/');
    }catch(e){ setErr(e.response?.data?.msg || 'Login failed'); }
  }
  return (
    <div className="mx-auto max-w-md rounded-3xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/60 sm:p-9">
      <p className="text-sm font-bold uppercase tracking-wider text-blue-600">Welcome back</p>
      <h2 className="mt-2 text-3xl font-bold">Sign in to your portal</h2>
      <p className="mt-2 text-sm text-slate-500">Check applications and programme updates.</p>
      {err && <div className="mt-5 rounded-xl bg-red-50 p-3 text-sm text-red-700">{err}</div>}
      <form onSubmit={submit} className="mt-6 space-y-4">
        <label className="block text-sm font-semibold text-slate-700">Email<input type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" className="mt-2 w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100" /></label>
        <label className="block text-sm font-semibold text-slate-700">Password<input required type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Your password" className="mt-2 w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100" /></label>
        <button className="w-full rounded-xl bg-blue-600 px-4 py-3 font-bold text-white shadow hover:bg-blue-700">Sign in</button>
      </form>
    </div>
  );
}
