import type { Metadata } from "next";
import CustomCursor from "@/components/CustomCursor";
import "./globals.css";

export const metadata: Metadata = {
  title: "K S Venkatram | AI Engineer Portfolio",
  description: "Portfolio of K S Venkatram - 3rd year AI Engineering student at Amrita Vishwa Vidyapeetham, passionate about AI and cutting-edge technology",
  keywords: ["AI", "Machine Learning", "Portfolio", "K S Venkatram", "Amrita University"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased cursor-none">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
