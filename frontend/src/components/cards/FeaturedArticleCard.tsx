"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "../ui/badge";
import { ArrowRight, Square, Timer } from "lucide-react";
import cloudinaryLoader from "@/lib/cloudinary";
import { Article } from "@/types/article";

export default function FeaturedArticleCard(props: Article) {
  const { title, description, slug, image, categories, publishedAt, flex = "column" } = props;

  return (
    <Card
      className={`flex-1 flex-${flex} overflow-hidden rounded-lg border-card bg-card py-0 text-white`}
    >
      {image?.url && (
        <Link href={`/artigos/${slug}`} className="relative min-h-96 w-full min-w-[50%]">
          <Image
            loader={cloudinaryLoader}
            src={image.url}
            alt={image.alternativeText || title}
            fill
            className="cursor-pointer object-cover"
          />
        </Link>
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
            <Link className="text-3xl" href={`/artigos/${slug}`}>
              {title}
            </Link>
          </CardTitle>
          <CardDescription className="text-card-foreground text-xl">{description}</CardDescription>
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
