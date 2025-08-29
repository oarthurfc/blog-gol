import React from "react";
import Link from "next/link";
import Image from "next/image";
import { strapiImage } from "@/lib/strapi/strapiImage";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "../ui/badge";
import { ArrowRight, Square, Timer } from "lucide-react";

interface FeaturedArticleCardProps {
  flex?: string;
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

export default function FeaturedArticleCard({
  title,
  description,
  slug,
  image,
  categories,
  publishedAt,
  flex = "column",
}: FeaturedArticleCardProps) {
  return (
    <Card
      className={`flex-1 flex-${flex} overflow-hidden rounded-sm border-card bg-card py-0 text-white`}
    >
      {image?.url && (
        <div className="relative min-h-96 w-full">
          <Image
            src={strapiImage(image.url)}
            alt={image.alternativeText || title}
            fill
            className="object-cover"
          />
        </div>
      )}
      <CardContent className="flex h-full flex-col justify-center gap-4 px-12 py-16">
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
            <Link className="text-3xl" href={`/articles/${slug}`}>
              {title}
            </Link>
          </CardTitle>
          <CardDescription className="text-xl text-card-foreground">{description}</CardDescription>
        </CardHeader>

        <div className="flex flex-row items-center gap-1 text-xs font-bold text-secondary-foreground">
          <div className="flex flex-row items-center gap-1">
            <Timer width={14} />
            {new Date(publishedAt).toLocaleDateString("pt-BR", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </div>

          <div className="flex flex-row items-center gap-1 pl-2">
            <Link className="text-sm text-foreground" href={`/articles/${slug}`}>
              Todos os detalhes
            </Link>
            <ArrowRight className="text-primary-yellow" width={14} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
