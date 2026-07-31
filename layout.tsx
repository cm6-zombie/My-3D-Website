import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "Mainak Chandra | QA Automation & Operations", description: "3D portfolio of Mainak Chandra - QA Automation Engineer, SDET and Operations Support professional." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
