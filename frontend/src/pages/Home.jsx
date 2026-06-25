import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home(){
  const [ann, setAnn] = useState([]);
  useEffect(()=>{ axios.get('/api/announcements').then(r=>setAnn(r.data)).catch(console.error); },[]);
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Student Outbound Program</h1>
      <p className="mb-4">Overview and how to apply.</p>
      <h2 className="text-xl font-semibold">Announcements</h2>
      <ul className="mt-2 space-y-2">
        {ann.map(a=> (
          <li key={a._id} className="p-3 bg-white rounded shadow"> <div className="font-bold">{a.title}</div><div className="text-sm">{a.content}</div></li>
        ))}
      </ul>
    </div>
  );
}
