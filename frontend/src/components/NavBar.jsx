import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar(){
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="font-bold">SOP</Link>
        <div className="space-x-4">
          <Link to="/">Home</Link>
          <Link to="/announcements">Announcements</Link>
          {!token && <><Link to="/login">Login</Link><Link to="/register">Register</Link></>}
          {token && role === 'student' && <Link to="/dashboard">Dashboard</Link>}
          {token && role === 'admin' && <Link to="/admin">Admin</Link>}
        </div>
      </div>
    </nav>
  );
}
