import type { Metadata } from "next";
import CustomCursor from "@/components/CustomCursor";
import { ThemeProvider } from "@/components/ThemeProvider";
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
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* Inline script runs before paint — prevents flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('portfolio-theme')||'dark';document.documentElement.className=t;})();`,
          }}
        />
      </head>
      <body className="antialiased cursor-none" style={{ backgroundColor: 'var(--bg-base)', color: 'var(--text-body)' }}>
        <ThemeProvider>
          <CustomCursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
