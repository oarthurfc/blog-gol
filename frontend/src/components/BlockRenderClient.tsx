"use client";
import Image from "next/image";

import { BlocksRenderer, type BlocksContent } from "@strapi/blocks-react-renderer";
import cloudinaryLoader from "@/lib/cloudinary";

export default function BlockRendererClient({ content }: { readonly content: BlocksContent }) {
  if (!content) return null;
  return (
    <BlocksRenderer
      content={content}
      blocks={{
        paragraph: ({ children }) => <p className="text-neutral900">{children}</p>,

        heading: ({ children }) => <h1 className="text-3xl">{children}</h1>,

        image: ({ image }) => {
          return (
            <Image
              loader={cloudinaryLoader}
              src={image.url}
              alt={image.alternativeText || ""}
              width={0}
              height={0}
              sizes="100vw"
              className="h-auto w-full"
            />
          );
        },
      }}
    />
  );
}
