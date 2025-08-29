import React from "react";
import Link from "next/link";
import Image from "next/image";
import { strapiImage } from "@/lib/strapi/strapiImage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "../ui/badge";
import { Square, Timer } from "lucide-react";

interface ArticleCardProps {
  id: number;
  title: string;
  description: string;
  slug: string;
  image?: {
    id: number;
    name: string;
    alternativeText?: string | null;
    caption?: string | null;
    url: string;
  };
  categories?: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
  content?: Array<unknown>;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  dynamic_zone?: Array<unknown>;
  seo?: unknown;
}

export default function ArticleCard({
  title,
  slug,
  image,
  categories,
  publishedAt,
}: ArticleCardProps) {
  return (
    <Card className="h-fit w-full overflow-hidden rounded-sm border-card bg-card py-0 text-white">
      {image?.url && (
        <Link href={`/articles/${slug}`} className="relative block h-44 w-full">
          <Image
            src={strapiImage(image.url)}
            alt={image.alternativeText || title}
            fill
            className="object-cover"
          />
        </Link>
      )}
      <CardContent className="flex flex-col gap-4 p-4">
        {categories && categories.length > 0 && (
          <div className="flex gap-2">
            {categories.map((categoria, index) => (
              <Link
                key={categoria.id}
                className="flex flex-row items-center gap-2"
                href={`/categorias/${categoria.slug}`}
              >
                <Badge className="text-background">{categoria.name}</Badge>
                {index < categories.length - 1 && <Square width={20} height={2} />}
              </Link>
            ))}
          </div>
        )}
        <CardHeader className="p-0">
          <CardTitle>
            <Link className="text-lg" href={`/articles/${slug}`}>
              {title}
            </Link>
          </CardTitle>
        </CardHeader>

        <div className="flex flex-row items-center gap-1 text-xs font-bold text-secondary-foreground">
          <Timer width={14} />
          {new Date(publishedAt).toLocaleDateString("pt-BR", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </div>
      </CardContent>
    </Card>
  );
}
