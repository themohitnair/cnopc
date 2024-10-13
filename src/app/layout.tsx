import type { Metadata } from "next";
import "./globals.css";
import Header from "./Header";

export const metadata: Metadata = {
  title: "cnopc",
  description: "README Generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon/cnopc.svg" type="image/svg+xml" />
      </head>
      <body className="font-geistmono text-foreground bg-background">
        <Header/>
        {children}
      </body>
    </html>
  );
}