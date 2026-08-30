import { NextResponse } from "next/server";
export const revalidate=300;
export async function GET(){
 const username=process.env.GITHUB_USERNAME||"cm6-zombie"; const token=process.env.GITHUB_TOKEN;
 const headers:HeadersInit={Accept:"application/vnd.github+json"}; if(token) headers.Authorization=`Bearer ${token}`;
 try{
  const [userRes,repoRes]=await Promise.all([fetch(`https://api.github.com/users/${username}`,{headers,next:{revalidate:300}}),fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,{headers,next:{revalidate:300}})]);
  if(!userRes.ok||!repoRes.ok) throw new Error(); const user=await userRes.json(); const raw=await repoRes.json();
  let contributions:any=null;
  if(token){
   const now=new Date(),from=new Date(now);from.setFullYear(now.getFullYear()-1);
   const query=`query($login:String!,$from:DateTime!,$to:DateTime!){user(login:$login){contributionsCollection(from:$from,to:$to){contributionCalendar{totalContributions weeks{contributionDays{date contributionCount color}}}}}}`;
   const gr=await fetch("https://api.github.com/graphql",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${token}`},body:JSON.stringify({query,variables:{login:username,from:from.toISOString(),to:now.toISOString()}}),next:{revalidate:300}});
   if(gr.ok){const gj=await gr.json();contributions=gj?.data?.user?.contributionsCollection?.contributionCalendar||null;}
  }
  return NextResponse.json({user:{login:user.login,avatarUrl:user.avatar_url,bio:user.bio,publicRepos:user.public_repos,followers:user.followers,following:user.following,profileUrl:user.html_url},repos:raw.filter((r:any)=>!r.fork).map((r:any)=>({name:r.name,description:r.description,url:r.html_url,language:r.language,stars:r.stargazers_count,forks:r.forks_count,updatedAt:r.updated_at,pushedAt:r.pushed_at,topics:r.topics||[]})),contributions,contributionsConfigured:Boolean(token)});
 }catch{return NextResponse.json({error:"GitHub data is temporarily unavailable."},{status:502});}
}
