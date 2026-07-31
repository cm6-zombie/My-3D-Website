import type { Metadata,Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
const site=process.env.NEXT_PUBLIC_SITE_URL||"https://mainak-portfolio-chi.vercel.app";
export const metadata:Metadata={metadataBase:new URL(site),title:{default:"Mainak Chandra | QA Automation Engineer & SDET",template:"%s | Mainak Chandra"},description:"Interactive 3D portfolio of Mainak Chandra, a QA Automation Engineer, SDET and Operations Support professional with 7+ years of experience.",keywords:["Mainak Chandra","QA Automation Engineer","SDET","Selenium","Java","AWS","Operations Support","Portfolio"],authors:[{name:"Mainak Chandra"}],openGraph:{title:"Mainak Chandra | Interactive 3D Portfolio",description:"QA Automation, SDET, AWS/Linux and Operations Support portfolio.",url:site,siteName:"Mainak Chandra Portfolio",type:"website"},twitter:{card:"summary_large_image",title:"Mainak Chandra | QA Automation Engineer",description:"Interactive 3D portfolio with live GitHub and LeetCode data."},robots:{index:true,follow:true},alternates:{canonical:site}};
export const viewport:Viewport={width:"device-width",initialScale:1,themeColor:"#06060a"};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}<Analytics/></body></html>}
