"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Footer as FooterType } from "@/types/footer";
import { strapiImage } from "@/lib/strapi/strapiImage";

interface FooterProps {
  data: FooterType;
  className?: string;
}

export function Footer({ data, className }: FooterProps) {
  const { logo, description, copyright, internal_links = [], policy_links = [] } = data || {};

  return (
    <footer className={cn("bg-background text-foreground", className)}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Logo e descrição */}
          <div className="flex flex-col space-y-4">
            {data?.logo && (
              <Image src={strapiImage(logo.url)} width={90} height={30} alt="Logo Gol a Gol" />
            )}
            {description && <p className="text-muted-foreground">{description}</p>}
          </div>

          {/* Links internos */}
          <div>
            <h4 className="mb-4 text-lg font-bold">Links</h4>
            <ul className="space-y-2">
              {internal_links?.map((link) => (
                <li key={link.id}>
                  {link.URL ? (
                    <Link
                      href={link.URL}
                      target={link.target || "_self"}
                      className="hover:text-primary-yellow text-muted-foreground transition-colors"
                    >
                      {link.text}
                    </Link>
                  ) : (
                    <span className="text-muted-foreground">{link.text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Links de política */}
          <div>
            <h4 className="mb-4 text-lg font-bold">Políticas</h4>
            <ul className="space-y-2">
              {policy_links?.map((link) => (
                <li key={link.id}>
                  {link.URL ? (
                    <Link
                      href={link.URL}
                      target={link.target || "_self"}
                      className="hover:text-primary-yellow text-muted-foreground transition-colors"
                    >
                      {link.text}
                    </Link>
                  ) : (
                    <span className="text-muted-foreground">{link.text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-border pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            {copyright || `© ${new Date().getFullYear()} Gol a Gol. Todos os direitos reservados.`}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
