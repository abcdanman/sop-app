import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function StudentDashboard(){
  const [apps, setApps] = useState([]);
  const [programTitle, setProgramTitle] = useState('');
  const [files, setFiles] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(()=>{ if(token){ axios.get('/api/applications/me', { headers: { Authorization: 'Bearer '+token } }).then(r=>setApps(r.data)).catch(console.error); } },[token]);

  const submit = async e =>{
    e.preventDefault();
    if(!programTitle) return alert('Provide program title');
    const form = new FormData();
    form.append('programTitle', programTitle);
    if(files) for (let i=0;i<files.length;i++) form.append('documents', files[i]);
    await axios.post('/api/applications', form, { headers: { Authorization: 'Bearer '+token, 'Content-Type':'multipart/form-data' } });
    alert('Applied');
  }

  return (
    <div>
      <h2 className="text-xl font-bold">Your Applications</h2>
      <form onSubmit={submit} className="bg-white p-4 rounded shadow my-4">
        <input value={programTitle} onChange={e=>setProgramTitle(e.target.value)} placeholder="Program Title" className="w-full p-2 border mb-2" />
        <input type="file" multiple accept="application/pdf" onChange={e=>setFiles(e.target.files)} className="mb-2" />
        <button className="bg-blue-600 text-white px-3 py-1 rounded">Apply</button>
      </form>

      <ul className="space-y-2">
        {apps.map(a=> (
          <li key={a._id} className="p-3 bg-white rounded shadow flex justify-between">
            <div>
              <div className="font-bold">{a.programTitle}</div>
              <div className="text-sm">Status: {a.status}</div>
            </div>
            <div className="text-sm">Applied: {new Date(a.appliedAt).toLocaleString()}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
