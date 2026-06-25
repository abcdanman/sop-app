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
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-lg font-bold mb-4">Register</h2>
      {err && <div className="text-red-600 mb-2">{err}</div>}
      <form onSubmit={submit} className="space-y-2">
        <input value={form.name} onChange={e=>setForm({...form, name:e.target.value})} placeholder="Name" className="w-full p-2 border" />
        <input value={form.email} onChange={e=>setForm({...form, email:e.target.value})} placeholder="Email" className="w-full p-2 border" />
        <input type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} placeholder="Password" className="w-full p-2 border" />
        <input value={form.university} onChange={e=>setForm({...form, university:e.target.value})} placeholder="University" className="w-full p-2 border" />
        <input value={form.course} onChange={e=>setForm({...form, course:e.target.value})} placeholder="Course" className="w-full p-2 border" />
        <button className="bg-green-600 text-white px-4 py-2 rounded">Register</button>
      </form>
    </div>
  );
}
