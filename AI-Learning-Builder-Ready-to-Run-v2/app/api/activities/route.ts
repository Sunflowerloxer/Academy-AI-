import {NextResponse} from 'next/server';import {createClient} from '@/lib/supabase/server';import {validateActivity} from '@/lib/schema';
export async function POST(req:Request){
 try{
 const supabase=await createClient();const {data:{user}}=await supabase.auth.getUser();if(!user)return NextResponse.json({error:'Please log in to save activities.'},{status:401});
 const body=await req.json();const parsed=validateActivity(body.activity);if(!parsed.success)return NextResponse.json({error:'This activity has invalid content. Check the fields and try again.'},{status:400});
 const row={...(body.id?{id:body.id}:{}),teacher_id:user.id,title:parsed.data.title,type:parsed.data.type,content:parsed.data};
 const {data,error}=await supabase.from('activities').upsert(row).select('id').single();if(error)throw error;
 return NextResponse.json({id:data.id});
 }catch(e){return NextResponse.json({error:e instanceof Error?e.message:'Could not save activity.'},{status:500});}
}
