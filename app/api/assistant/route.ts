import { NextResponse } from "next/server";
import { assistantKnowledge, profile } from "@/lib/profile";

function localAnswer(question:string){
  const q=question.toLowerCase();
  const scored=assistantKnowledge.map(text=>({text,score:text.toLowerCase().split(/\W+/).filter(w=>w.length>3&&q.includes(w)).length})).sort((a,b)=>b.score-a.score);
  const context=scored.filter(x=>x.score>0).slice(0,4).map(x=>x.text);
  if(!context.length) return `I can answer questions about ${profile.name}'s experience, QA automation skills, AWS/Linux background, projects, leadership, and career history. Try asking: “What automation frameworks has Mainak built?”`;
  return context.join(" ");
}
export async function POST(req:Request){
  const {question}=await req.json();
  if(!question||typeof question!=="string") return NextResponse.json({error:"Question is required."},{status:400});
  const key=process.env.OPENAI_API_KEY;
  if(!key) return NextResponse.json({answer:localAnswer(question),mode:"resume-grounded local assistant"});
  try{
    const model=process.env.OPENAI_MODEL;
    if(!model) return NextResponse.json({answer:localAnswer(question),mode:"resume-grounded local assistant",warning:"Set OPENAI_MODEL to enable the hosted AI response."});
    const response=await fetch("https://api.openai.com/v1/responses",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${key}`},body:JSON.stringify({model,input:[{role:"system",content:`You are the portfolio assistant for Mainak Chandra. Answer only from this verified resume/project context. If the context does not support the answer, say so. Context:\n${assistantKnowledge.join("\n")}`},{role:"user",content:question}],max_output_tokens:300})});
    if(!response.ok) throw new Error("AI provider error");
    const json=await response.json();
    const answer=json.output_text||json.output?.flatMap((o:any)=>o.content||[]).map((c:any)=>c.text).filter(Boolean).join(" ");
    return NextResponse.json({answer:answer||localAnswer(question),mode:"AI + resume grounding"});
  }catch{return NextResponse.json({answer:localAnswer(question),mode:"resume-grounded fallback"});}
}
