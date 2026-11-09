import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import Dashboard from '@/components/Dashboard';
export default async function Home(){
 let user=null;
 try{const supabase=await createClient();const {data}=await supabase.auth.getUser();user=data.user;}catch{}
 if(!user) redirect('/login');
 return <Dashboard email={user.email||''}/>;
}
