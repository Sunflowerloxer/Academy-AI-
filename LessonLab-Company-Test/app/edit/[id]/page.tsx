'use client';
import {useEffect,useState} from 'react';import {createClient} from '@/lib/supabase/client';import Editor from '@/components/Editor';import type {Activity} from '@/lib/types';
export default function EditPage({params}:{params:Promise<{id:string}>}){const [id,setId]=useState(''),[activity,setActivity]=useState<Activity|null>(null),[error,setError]=useState('');
 useEffect(()=>{params.then(async p=>{setId(p.id);try{const s=createClient();const {data,error}=await s.from('activities').select('content').eq('id',p.id).single();if(error)throw error;setActivity(data.content as Activity)}catch(e){setError(e instanceof Error?e.message:'Could not load activity.')}})},[params]);
 if(error)return <main className="dashboard"><p className="error">{error}</p><a href="/">Back to dashboard</a></main>;
 return activity?<Editor initial={activity} activityId={id} onSaved={()=>location.href='/'}/>:<main className="dashboard">Loading activity…</main>;
}
