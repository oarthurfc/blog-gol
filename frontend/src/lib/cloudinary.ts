"use client";

export default function cloudinaryLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  const cloudinaryName = "dq2kgghmy";
  const params = ["f_auto", "c_limit", `w_${width}`, `q_${quality || "auto"}`];

  // extrai apenas o path relativo da imagem
  const match = src.match(/\/upload\/(.*)$/);
  const path = match?.[1];

  if (!path) {
    console.warn("Imagem fora do padrão Cloudinary:", src);
    return src; // fallback: retorna o que recebeu
  }

  return `https://res.cloudinary.com/${cloudinaryName}/image/upload/${params.join(",")}/${path}`;
}
