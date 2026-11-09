'use client';
import {useEffect,useState} from 'react';import {createClient} from '@/lib/supabase/client';import Builder from './Builder';import type {ActivityType} from '@/lib/types';
type Saved={id:string;title:string;type:ActivityType;updated_at:string};
export default function Dashboard({email}:{email:string}){
 const [saved,setSaved]=useState<Saved[]>([]),[loading,setLoading]=useState(true),[open,setOpen]=useState(false);
 async function load(){try{const s=createClient();const {data,error}=await s.from('activities').select('id,title,type,updated_at').order('updated_at',{ascending:false});if(error)throw error;setSaved(data||[]);}catch{}finally{setLoading(false)}}
 useEffect(()=>{load()},[]);
 async function logout(){await createClient().auth.signOut();location.href='/login'}
 return <main className="app-shell"><header className="topbar"><div className="brand"><span className="brand-mark">L</span> LessonLab</div><div className="user-menu"><span>{email}</span><button className="ghost" onClick={logout}>Log out</button></div></header>
 <div className="dashboard"><div className="hero"><div><p className="eyebrow">TEACHER WORKSPACE</p><h1>Make learning <span>click.</span></h1><p className="muted">Create playful, interactive activities in minutes.</p></div><button className="primary" onClick={()=>setOpen(true)}>＋ Create activity</button></div>
 {open&&<Builder onClose={()=>setOpen(false)} onSaved={()=>{setOpen(false);load()}}/>}
 <div className="section-heading"><div><h2>Your activities</h2><p className="muted">Pick up where you left off.</p></div><span className="count">{saved.length} saved</span></div>
 {loading?<p className="muted">Loading activities…</p>:saved.length===0?<div className="empty"><div className="empty-icon">✦</div><h3>Your next great lesson starts here</h3><p className="muted">Create your first activity and share it with your students.</p><button className="secondary" onClick={()=>setOpen(true)}>Create your first activity</button></div>:<div className="activity-grid">{saved.map(a=><article className="activity-card" key={a.id}><div className="card-top"><span className="type-chip">{a.type.replace('_',' ')}</span><span className="dots">•••</span></div><h3>{a.title}</h3><p className="muted small">Updated {new Date(a.updated_at).toLocaleDateString()}</p><div className="card-actions"><a className="text-link" href={`/edit/${a.id}`}>Open editor →</a><a className="text-link" href={`/a/${a.id}`} target="_blank">Student link ↗</a></div></article>)}</div>}
 </div></main>
}
