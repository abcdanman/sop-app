import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminDashboard(){
  const token = localStorage.getItem('token');
  const [apps, setApps] = useState([]);
  const [stats, setStats] = useState({});

  useEffect(()=>{ fetchApps(); fetchStats(); },[]);
  const fetchApps = async ()=>{ const r = await axios.get('/api/admin/applications', { headers:{ Authorization:'Bearer '+token } }); setApps(r.data); }
  const fetchStats = async ()=>{ const r = await axios.get('/api/admin/stats', { headers:{ Authorization:'Bearer '+token } }); setStats(r.data); }
  const update = async (id, status) =>{ await axios.put('/api/admin/applications/'+id, { status }, { headers:{ Authorization:'Bearer '+token } }); fetchApps(); fetchStats(); }

  return (
    <div>
      <h2 className="text-xl font-bold">Admin Dashboard</h2>
      <div className="grid grid-cols-4 gap-4 my-4">
        <div className="p-3 bg-white rounded shadow">Total: {stats.total}</div>
        <div className="p-3 bg-white rounded shadow">Approved: {stats.approved}</div>
        <div className="p-3 bg-white rounded shadow">Pending: {stats.pending}</div>
        <div className="p-3 bg-white rounded shadow">Rejected: {stats.rejected}</div>
      </div>

      <ul className="space-y-2">
        {apps.map(a=> (
          <li key={a._id} className="p-3 bg-white rounded shadow flex justify-between items-center">
            <div>
              <div className="font-bold">{a.programTitle}</div>
              <div className="text-sm">Student: {a.student?.name} ({a.student?.email})</div>
              <div className="text-sm">Status: {a.status}</div>
            </div>
            <div className="space-x-2">
              <button onClick={()=>update(a._id,'approved')} className="px-2 py-1 bg-green-600 text-white rounded">Approve</button>
              <button onClick={()=>update(a._id,'rejected')} className="px-2 py-1 bg-red-600 text-white rounded">Reject</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
