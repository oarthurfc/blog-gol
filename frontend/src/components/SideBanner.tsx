"use client";

import Link from "next/link";
import Image from "next/image";
import cloudinaryLoader from "@/lib/cloudinary";

interface SideBannerProps {
  banner: {
    id: number;
    title: string;
    link: string;
    position: string;
    image?: {
      url: string;
      alternativeText?: string;
    };
  };
}

export default function SideBanner({ banner }: SideBannerProps) {
  if (!banner) return null;

  return (
    <div className="w-full">
      <Link href={banner.link} target="_blank" rel="noopener noreferrer" className="block w-full">
        {banner.image?.url ? (
          <Image
            loader={cloudinaryLoader}
            src={banner.image.url}
            alt={banner.image.alternativeText || banner.title}
            width={300}
            height={600}
            className="h-auto w-full cursor-pointer rounded-lg object-cover transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <div className="flex h-96 w-full items-center justify-center rounded-lg bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400">
            <div className="text-center">
              <h3 className="text-lg font-semibold">{banner.title}</h3>
              <p className="text-sm">Clique para acessar</p>
            </div>
          </div>
        )}
      </Link>
    </div>
  );
}
