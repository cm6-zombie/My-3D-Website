import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
const site = process.env.NEXT_PUBLIC_SITE_URL || "https://mainak-portfolio-chi.vercel.app";
export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: { default: "Mainak Chandra | SDET · Test Automation · Software Engineering", template: "%s | Mainak Chandra" },
  description: "Interactive engineering portfolio of Mainak Chandra with 7 years of experience across test automation, production reliability, cloud/Linux systems and release validation, plus projects in semantic search, APIs and web engineering.",
  keywords: ["Mainak Chandra","SDET","Software Test Engineer","QA Automation","Selenium","Java","Python","TestNG","pytest","Semantic Search","Sentence Transformers","REST APIs","AWS","Linux","Next.js","Kolkata"],
  authors: [{ name: "Mainak Chandra" }], creator: "Mainak Chandra",
  openGraph: { title: "Mainak Chandra | SDET · Test Automation · Software Engineering", description: "Interactive 3D engineering portfolio with live GitHub, LeetCode, Crio projects, test automation, semantic search, APIs and production reliability experience.", url: site, siteName: "Mainak Chandra Portfolio", type: "website", locale: "en_IN" },
  twitter: { card: "summary_large_image", title: "Mainak Chandra | SDET & Test Automation", description: "Test automation, Java/Python, semantic search, APIs, AWS/Linux and software engineering portfolio." },
  robots: { index: true, follow: true }, alternates: { canonical: site },
  category: "technology"
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: [{media:"(prefers-color-scheme: dark)",color:"#070910"},{media:"(prefers-color-scheme: light)",color:"#f6f8fc"}] };
const jsonLd={"@context":"https://schema.org","@type":"Person",name:"Mainak Chandra",url:site,jobTitle:"Engineering Professional - Test Automation and Production Reliability",email:"mailto:subham.cm6@gmail.com",sameAs:["https://github.com/cm6-zombie","https://leetcode.com/u/mainak000/","https://www.crio.do/learn/portfolio/subham-cm6/"],knowsAbout:["Selenium WebDriver","Java","Python","TestNG","pytest","REST APIs","Sentence Transformers","Semantic Search","AWS","Linux","SQL","Next.js","Quality Assurance"]};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en" suppressHydrationWarning><body>{children}<Analytics/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(jsonLd)}}/></body></html>}
