import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

export const revalidate = 60;

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Vyrix — Early Access",
  description:
    "Vyrix structures your project, checks your validation, and shows you what to do next — built for design students stuck between the brief and the breakthrough.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jakarta.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col overflow-x-hidden bg-[#F7F8F8] text-[#0A0A0A] font-sans">
        {children}
      </body>
    </html>
  );
}
