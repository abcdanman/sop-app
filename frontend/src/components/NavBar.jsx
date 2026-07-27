import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar(){
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  return (
    <nav className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-8">
        <Link to="/" className="flex items-center gap-3 font-bold text-slate-900">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-sm text-white shadow-lg shadow-blue-200">SOP</span>
          <span><span className="block leading-tight">Outbound UM</span><span className="block text-xs font-medium text-slate-500">Student Mobility Portal</span></span>
        </Link>
        <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
          <Link className="rounded-lg px-3 py-2 hover:bg-slate-100 hover:text-blue-700" to="/">Home</Link>
          {!token && <><Link className="rounded-lg px-3 py-2 hover:bg-slate-100 hover:text-blue-700" to="/login">Login</Link><Link className="rounded-lg bg-blue-600 px-4 py-2 text-white shadow hover:bg-blue-700" to="/register">Apply now</Link></>}
          {token && role === 'student' && <Link className="rounded-lg bg-blue-600 px-4 py-2 text-white" to="/dashboard">Dashboard</Link>}
          {token && role === 'admin' && <Link className="rounded-lg bg-blue-600 px-4 py-2 text-white" to="/admin">Admin</Link>}
        </div>
      </div>
    </nav>
  );
}
