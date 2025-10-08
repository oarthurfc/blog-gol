"use client";

import React from "react";
import { Copy, Facebook, Twitter, Linkedin, MessageCircle } from "lucide-react";

interface ShareSectionProps {
  seo?: ReturnType<typeof import("@/lib/metadata").generateMetadataObject>;
}

export default function ShareSection({ seo }: ShareSectionProps) {
  const title = seo?.openGraph?.title || seo?.title || "Compartilhe este artigo";
  const description = seo?.openGraph?.description || seo?.description || "";
  const url = typeof window !== "undefined" ? window.location.href : "";

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      console.log("Link copiado!");
    } catch (err) {
      console.error("Erro ao copiar link:", err);
    }
  };

  const shareOnFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(title)} - ${encodeURIComponent(description)}`,
      "_blank",
    );
  };

  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}&via=gol_a_gol&hashtags=futebol`,
      "_blank",
    );
  };

  const shareOnWhatsApp = () => {
    const message = `${title}${description ? " - " + description : ""}`;
    window.open(
      `https://wa.me/?text=${encodeURIComponent(message)} - ${encodeURIComponent(url)}`,
      "_blank",
    );
  };

  return (
    <div className="flex flex-col items-end gap-3">
      <p className="text-sm font-semibold text-muted-foreground">Compartilhar</p>
      <div className="flex gap-2">
        <button
          onClick={copyToClipboard}
          className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          title="Copiar link"
        >
          <Copy size={18} />
        </button>
        <button
          onClick={shareOnFacebook}
          className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white transition-colors hover:bg-blue-700"
          title="Facebook"
        >
          <Facebook size={18} />
        </button>
        <button
          onClick={shareOnTwitter}
          className="flex h-10 w-10 items-center justify-center rounded-lg bg-black text-white transition-colors hover:bg-gray-800"
          title="Twitter / X"
        >
          <Twitter size={18} />
        </button>
        <button
          onClick={shareOnWhatsApp}
          className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-600 text-white transition-colors hover:bg-green-700"
          title="WhatsApp"
        >
          <MessageCircle size={18} />
        </button>
      </div>
    </div>
  );
}
