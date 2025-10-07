import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { getGlobalData } from "@/services/global";
import { ThemeProvider } from "@/components/themeProvider";

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

// Default Global SEO for pages without them
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Blog GOL",
    description: "Seu esportivo de futebol favorito",
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const pageData = await getGlobalData();

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${interSans.variable} flex min-h-screen flex-col antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar data={pageData?.navbar || null} />
          <main className="flex-grow">{children}</main>
          <Footer data={pageData?.footer || null} />
        </ThemeProvider>
      </body>
    </html>
  );
}
