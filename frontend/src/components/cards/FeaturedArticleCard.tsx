"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "../ui/badge";
import { ArrowRight, Square, Timer } from "lucide-react";
import cloudinaryLoader from "@/lib/cloudinary";
import { formatDateFull } from "@/lib/helpers";
import { Article } from "@/types/article";

export default function FeaturedArticleCard(props: Article) {
  const { title, description, slug, image, categories, publishedAt, flex = "column" } = props;

  return (
    <Card
      className={`flex-${flex} h-full w-full overflow-hidden rounded-lg border-card bg-card py-0`}
    >
      {image?.url && (
        <Link href={`/artigos/${slug}`} className="relative aspect-[16/9] w-full">
          <Image
            loader={cloudinaryLoader}
            src={image.url}
            alt={image.alternativeText || title}
            fill
            className="cursor-pointer object-cover"
          />
        </Link>
      )}
      <CardContent className="flex min-w-[50%] flex-1 flex-col justify-center gap-4 px-12 py-16">
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
            <Link className="text-3xl" href={`/artigos/${slug}`}>
              {title}
            </Link>
          </CardTitle>
          <CardDescription className="text-card-foreground text-xl">{description}</CardDescription>
        </CardHeader>

        <div className="flex flex-row items-center gap-1 text-xs font-bold text-secondary-foreground">
          <div className="flex flex-row items-center gap-1">
            <Timer width={14} />
            {formatDateFull(publishedAt)}
          </div>

          <div className="flex flex-row items-center gap-1 pl-2">
            <Link className="text-sm text-foreground" href={`/artigos/${slug}`}>
              Todos os detalhes
            </Link>
            <ArrowRight className="text-primary-yellow" width={14} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
