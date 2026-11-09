import { z } from 'zod';
import type { ActivityType } from './types';
const text = (max: number) => z.string().trim().min(1, 'Text cannot be empty.').max(max, `Text must be ${max} characters or fewer.`);
const base = z.object({id:z.string().trim().min(1).max(80)});
const unique = (values: string[]) => new Set(values).size === values.length;
const mc = base.extend({
 question:text(500), options:z.array(text(180)).length(4), answer:text(180), explanation:text(400).optional()
}).superRefine((item,ctx)=>{
 if(!unique(item.options))ctx.addIssue({code:'custom',message:'Answer options must be different.',path:['options']});
 if(item.options.filter(option=>option===item.answer).length!==1)ctx.addIssue({code:'custom',message:'The correct answer must match exactly one option.',path:['answer']});
});
const tf = base.extend({question:text(500),answer:z.enum(['True','False']),explanation:text(400).optional()});
const fc = base.extend({front:text(300),back:text(600)});
const match = base.extend({left:text(180),right:text(300)});
const order = base.extend({prompt:text(300),steps:z.array(text(180)).min(2).max(12)}).superRefine((item,ctx)=>{
 if(!unique(item.steps))ctx.addIssue({code:'custom',message:'Ordering steps must be different.',path:['steps']});
});
export const activitySchema = z.object({
 title:z.string().trim().min(2).max(100),description:z.string().trim().max(500).default(''),
 type:z.enum(['multiple_choice','true_false','flashcards','matching','ordering']),
 items:z.array(z.unknown()).min(2).max(20)
}).superRefine((a,ctx)=>{
 const schemas:Record<ActivityType, z.ZodTypeAny> = {
  multiple_choice:z.array(mc).min(2).max(20), true_false:z.array(tf).min(2).max(20),
  flashcards:z.array(fc).min(2).max(20), matching:z.array(match).min(2).max(20),
  ordering:z.array(order).min(2).max(20)
 };
 const parsed=schemas[a.type].safeParse(a.items);
 if(!parsed.success) {
  for(const issue of parsed.error.issues)ctx.addIssue({code:'custom',message:issue.message,path:['items',...issue.path]});
  return;
 }
 const ids=(parsed.data as Array<{id:string}>).map(item=>item.id);
 if(!unique(ids))ctx.addIssue({code:'custom',message:'Each item needs a different ID.',path:['items']});
 if(a.type==='matching'){
  const pairs=parsed.data as Array<{left:string;right:string}>;
  if(!unique(pairs.map(item=>item.left)))ctx.addIssue({code:'custom',message:'Matching terms must be different.',path:['items']});
  if(!unique(pairs.map(item=>item.right)))ctx.addIssue({code:'custom',message:'Matching answers must be different.',path:['items']});
 }
});
export function validateActivity(value:unknown){return activitySchema.safeParse(value);}
