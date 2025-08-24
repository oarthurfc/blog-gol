import { generateMetadataObject } from "@/lib/metadata";
import fetchContentType from "@/lib/strapi/fetchContentType";
import { strapiImage } from "@/lib/strapi/strapiImage";
import Image from "next/image";

export async function generateMetadata() {
  const homepage = await fetchContentType('home', {
    populate: {
      seo: { populate: '*' }
    }
  }, true);
  return generateMetadataObject(homepage?.seo);
}

export default async function Home() {
  const homepage = await fetchContentType('home', {
    populate: {
      top_banner: { populate: '*' },
      main_article: { populate: '*' },
      middle_banner: { populate: '*' },
      bet_main_article: { populate: '*' }
    }
  }, true);

  console.log("Homepage", homepage)

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      
      <Image src={strapiImage(homepage.top_banner.image.url)} alt={""} width={1200} height={48} />

      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">

      </footer>
    </div>
  );
}
