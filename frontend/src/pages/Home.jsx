import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Home(){
  const [ann, setAnn] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(()=>{ axios.get('/api/announcements').then(r=>setAnn(r.data)).catch(()=>setAnn([])).finally(()=>setLoading(false)); },[]);
  return (
    <div className="space-y-10">
      <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-indigo-700 to-violet-700 px-7 py-12 text-white shadow-xl shadow-indigo-100 sm:px-12">
        <div className="max-w-3xl">
          <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider">University of Malaya</span>
          <h1 className="mt-5 text-4xl font-extrabold leading-tight sm:text-6xl">Take your learning beyond borders.</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-blue-100">Discover outbound programmes, submit your documents, and follow every application from one clear dashboard.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/register" className="rounded-xl bg-white px-5 py-3 font-bold text-blue-700 shadow hover:bg-blue-50">Start an application</Link>
            <a href="#announcements" className="rounded-xl border border-white/30 px-5 py-3 font-bold hover:bg-white/10">View updates</a>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        {[
          ['1', 'Create your account', 'Keep your profile and programme details together.'],
          ['2', 'Upload documents', 'Attach the required PDFs through a guided form.'],
          ['3', 'Track the decision', 'See pending, approved, or rejected status clearly.'],
        ].map(([n,title,text]) => <div key={n} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="mb-4 grid h-9 w-9 place-items-center rounded-xl bg-blue-50 font-bold text-blue-700">{n}</div><h3 className="font-bold">{title}</h3><p className="mt-1 text-sm leading-6 text-slate-600">{text}</p></div>)}
      </section>

      <section id="announcements">
        <div className="mb-4 flex items-end justify-between"><div><p className="text-sm font-bold uppercase tracking-wider text-blue-600">Latest information</p><h2 className="mt-1 text-2xl font-bold">Announcements</h2></div><span className="text-sm text-slate-500">{ann.length} update{ann.length === 1 ? '' : 's'}</span></div>
      <ul className="grid gap-4 md:grid-cols-2">
        {ann.map(a=> (
          <li key={a._id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="font-bold text-slate-900">{a.title}</div><div className="mt-2 text-sm leading-6 text-slate-600">{a.content}</div></li>
        ))}
        {!loading && !ann.length && <li className="col-span-full rounded-2xl border border-dashed border-slate-300 bg-white/70 p-8 text-center text-slate-500"><div className="text-2xl">📣</div><p className="mt-2 font-semibold text-slate-700">No announcements yet</p><p className="mt-1 text-sm">New programme updates will appear here.</p></li>}
        {loading && <li className="col-span-full rounded-2xl bg-white p-8 text-center text-slate-500">Loading announcements…</li>}
      </ul>
      </section>
    </div>
  );
}
