export type ActivityType = 'multiple_choice'|'true_false'|'flashcards'|'matching'|'ordering';
export type Item = {
  id:string; question?:string; options?:string[]; answer?:string; explanation?:string;
  front?:string; back?:string; left?:string; right?:string; prompt?:string; steps?:string[];
};
export type Activity = { title:string; description:string; type:ActivityType; items:Item[] };
export const ACTIVITY_TYPES: {id:ActivityType;name:string;description:string;icon:string}[] = [
 {id:'multiple_choice',name:'Multiple choice',description:'Questions with four answer options',icon:'◉'},
 {id:'true_false',name:'True or false',description:'Quick knowledge checks',icon:'✓'},
 {id:'flashcards',name:'Flashcards',description:'Question and answer study cards',icon:'▤'},
 {id:'matching',name:'Matching game',description:'Connect related pairs',icon:'⇄'},
 {id:'ordering',name:'Ordering activity',description:'Put steps in the correct order',icon:'↕'}
];
