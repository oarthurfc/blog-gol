import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import fetchContentType from "@/lib/strapi/fetchContentType";
import { generateMetadataObject } from "@/lib/metadata";
import { Navbar } from "@/components/navbar";

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

// Default Global SEO for pages without them
export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const pageData = await fetchContentType(
    'global',
    {
      filters: { locale: params.locale },
      populate: 'seo.metaImage',
    },
    true
  );

  const seo = pageData?.seo;
  const metadata = generateMetadataObject(seo);
  return metadata;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const pageData = await fetchContentType(
    'global',
    {
      populate: {
        navbar: { 
          populate: ['logo', 'right_navbar_items']
        },
      }
    },
    true
  );

  console.log("Layout data:", pageData);

  return (
    <html lang="pt-BR">
      <body
        className={`${interSans.variable} antialiased`}
      >
        <Navbar data={pageData?.navbar || null}/>
        {children}
      </body>
    </html>
  );
}
