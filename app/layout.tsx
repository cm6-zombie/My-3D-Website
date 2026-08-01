import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
const site = process.env.NEXT_PUBLIC_SITE_URL || "https://mainak-portfolio-chi.vercel.app";
export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: { default: "Mainak Chandra | QA Automation Engineer & SDET", template: "%s | Mainak Chandra" },
  description: "Premium interactive portfolio of Mainak Chandra—QA Automation Engineer, SDET and Operations Support professional with 7+ years of experience in Selenium, Java, AWS, Linux and enterprise application support.",
  keywords: ["Mainak Chandra","QA Automation Engineer","SDET","Software Test Engineer","Selenium","Java","TestNG","AWS","Linux","Operations Support","Kolkata"],
  authors: [{ name: "Mainak Chandra" }], creator: "Mainak Chandra",
  openGraph: { title: "Mainak Chandra | QA Automation Engineer & SDET", description: "Interactive 3D portfolio with live GitHub, LeetCode, projects, experience and skills.", url: site, siteName: "Mainak Chandra Portfolio", type: "website", locale: "en_IN" },
  twitter: { card: "summary_large_image", title: "Mainak Chandra | QA Automation Engineer", description: "QA Automation, SDET, AWS/Linux and Operations Support portfolio." },
  robots: { index: true, follow: true }, alternates: { canonical: site },
  category: "technology"
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: [{media:"(prefers-color-scheme: dark)",color:"#070910"},{media:"(prefers-color-scheme: light)",color:"#f6f8fc"}] };
const jsonLd={"@context":"https://schema.org","@type":"Person",name:"Mainak Chandra",url:site,jobTitle:"QA Automation Engineer and SDET",email:"mailto:subham.cm6@gmail.com",sameAs:["https://github.com/cm6-zombie","https://leetcode.com/u/mainak000/","https://www.crio.do/learn/portfolio/subham-cm6/"],knowsAbout:["Selenium WebDriver","Java","TestNG","AWS","Linux","SQL","Application Support","Quality Assurance"]};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en" suppressHydrationWarning><body>{children}<Analytics/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(jsonLd)}}/></body></html>}
