import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import NavBar from './components/NavBar';

export default function App(){
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-blue-50 text-slate-900">
      <NavBar />
      <main className="mx-auto w-full max-w-7xl px-5 py-8 sm:px-8">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/dashboard" element={<StudentDashboard/>} />
          <Route path="/admin" element={<AdminDashboard/>} />
        </Routes>
      </main>
    </div>
  );
}
