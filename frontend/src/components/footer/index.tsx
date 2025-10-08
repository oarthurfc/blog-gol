"use client";

import Link from "next/link";
import Image from "next/image";
import { Footer as FooterType } from "@/types/footer";
import cloudinaryLoader from "@/lib/cloudinary";

interface FooterProps {
  data: FooterType | null;
}

export function Footer({ data }: FooterProps) {
  if (!data) return null;

  const { logo, description, copyright, internal_links = [], policy_links = [] } = data;

  return (
    <footer className="border-t-4 border-primary-yellow bg-black text-white">
      {/* Newsletter */}
      <div className="bg-primary-yellow p-6 text-black">
        <div className="mx-auto flex max-w-[1320px] flex-col items-center space-y-4 md:flex-row md:justify-between md:space-y-0">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold">Newsletter Gol a Gol</h3>
            <p className="text-sm">
              Receba as últimas notícias do futebol diretamente no seu e-mail
            </p>
          </div>
          <div className="flex w-full max-w-md gap-2">
            <input
              type="email"
              placeholder="Digite seu e-mail"
              className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-black placeholder-gray-500 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
            />
            <button
              type="button"
              className="whitespace-nowrap rounded-md bg-black px-6 py-2 text-white transition-colors hover:bg-gray-800"
            >
              Inscrever
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-[1320px] bg-black px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Logo e descrição */}
          <div className="flex flex-col space-y-4">
            {data?.logo && (
              <Image
                loader={cloudinaryLoader}
                src={logo.url}
                width={90}
                height={30}
                alt="Logo Gol a Gol"
              />
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
                      className="text-muted-foreground transition-colors hover:text-primary-yellow"
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
                      className="text-muted-foreground transition-colors hover:text-primary-yellow"
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
        <div className="mt-8 border-t border-gray-800 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            {copyright || `© ${new Date().getFullYear()} Gol a Gol. Todos os direitos reservados.`}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
