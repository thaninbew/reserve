import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Reserve",
  description: "Secure estate and property management for families.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased selection:bg-[#c5a059] selection:text-white`}
      >
        <div className="filament-container">
           <div className="filament" style={{ left: '10%' }}></div>
           <div className="filament" style={{ left: '30%' }}></div>
           <div className="filament" style={{ left: '50%' }}></div>
           <div className="filament" style={{ left: '70%' }}></div>
           <div className="filament" style={{ left: '90%' }}></div>
        </div>
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
