import { NextResponse } from "next/server";
import { profile } from "@/lib/profile";
export const dynamic = "force-dynamic";
export async function GET(){return NextResponse.json({resumeUrl:process.env.RESUME_URL||profile.links.resume,siteUrl:process.env.NEXT_PUBLIC_SITE_URL||""});}
