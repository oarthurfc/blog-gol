"use client";
import Image from "next/image";

import { BlocksRenderer, type BlocksContent } from "@strapi/blocks-react-renderer";
import cloudinaryLoader from "@/lib/cloudinary";

export default function BlockRendererClient({ content }: { readonly content: BlocksContent }) {
  if (!content) return null;

  const renderHeading = (level: number, children: React.ReactNode) => {
    const baseClasses = "font-bold text-heading mb-4";

    switch (level) {
      case 1:
        return <h1 className={`text-3xl lg:text-4xl ${baseClasses}`}>{children}</h1>;
      case 2:
        return <h2 className={`text-2xl lg:text-3xl ${baseClasses}`}>{children}</h2>;
      case 3:
        return <h3 className={`text-xl lg:text-2xl ${baseClasses}`}>{children}</h3>;
      case 4:
        return <h4 className={`text-lg lg:text-xl ${baseClasses}`}>{children}</h4>;
      case 5:
        return <h5 className={`text-base lg:text-lg ${baseClasses}`}>{children}</h5>;
      case 6:
        return <h6 className={`text-sm lg:text-base ${baseClasses}`}>{children}</h6>;
      default:
        return <h2 className={`text-2xl lg:text-3xl ${baseClasses}`}>{children}</h2>;
    }
  };

  return (
    <BlocksRenderer
      content={content}
      blocks={{
        paragraph: ({ children }) => (
          <p className="text-neutral900 mb-4 leading-relaxed">{children}</p>
        ),

        heading: ({ children, level }) => renderHeading(level, children),

        image: ({ image }) => {
          return (
            <Image
              loader={cloudinaryLoader}
              src={image.url}
              alt={image.alternativeText || ""}
              width={0}
              height={0}
              sizes="100vw"
              className="mb-4 h-auto w-full"
            />
          );
        },
      }}
    />
  );
}
