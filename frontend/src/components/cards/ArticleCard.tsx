"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "../ui/badge";
import { Square, Timer } from "lucide-react";
import cloudinaryLoader from "@/lib/cloudinary";
import { formatDateFull } from "@/lib/helpers";
import { Article } from "@/types/article";

export default function ArticleCard(props: Article) {
  const { title, slug, image, categories, publishedAt } = props;

  return (
    <Card className="flex h-full w-full flex-col overflow-hidden rounded-sm border-card bg-card py-0 text-white">
      {image?.url && (
        <Link href={`/artigos/${slug}`} className="relative aspect-[16/9] w-full">
          <Image
            loader={cloudinaryLoader}
            src={image.url}
            alt={image.alternativeText || title}
            fill
            className="object-cover"
          />
        </Link>
      )}

      <CardContent className="flex flex-1 flex-col justify-between gap-4 p-4">
        <CardHeader className="gap-4 p-0">
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
          <CardTitle>
            <Link className="text-lg" href={`/artigos/${slug}`}>
              {title}
            </Link>
          </CardTitle>
        </CardHeader>

        <div className="flex flex-row items-center gap-1 text-xs font-bold text-secondary-foreground">
          <Timer width={14} />
          {formatDateFull(publishedAt)}
        </div>
      </CardContent>
    </Card>
  );
}
