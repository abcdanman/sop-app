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
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-lg font-bold mb-4">Login</h2>
      {err && <div className="text-red-600 mb-2">{err}</div>}
      <form onSubmit={submit}>
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full mb-2 p-2 border" />
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" className="w-full mb-2 p-2 border" />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
      </form>
    </div>
  );
}
