"use client";

import cloudinaryLoader from "@/lib/cloudinary";
import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "./components/ModeToggle";

type Props = {
  right_navbar_items: {
    id: string;
    URL: string;
    text: string;
    target?: string;
  }[];
  logo: {
    url: string;
  };
};

export function Navbar({ data }: { data: Props | null }) {
  if (!data) return null;

  // Arbitrary Value para o corte diagonal:
  // (0,0) -> (50% top) -> (47% bottom) -> (0, 100%)
  const CLIP_PATH_CLASS = "[clip-path:polygon(0_0,_50%_0,_47%_100%,_0_100%)]";

  return (
    <div className="relative h-16 w-full overflow-hidden border-b-4 border-primary-yellow bg-primary-yellow">
      <div className={`absolute inset-0 bg-black ${CLIP_PATH_CLASS}`}></div>

      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1320px] flex-row items-center justify-between px-4">
        {data?.logo && (
          <Link href="/">
            <Image
              loader={cloudinaryLoader}
              src={data.logo.url}
              width={90}
              height={30}
              alt="Logo Gol a Gol"
            />
          </Link>
        )}

        <div className="flex flex-row items-center gap-6">
          {data?.right_navbar_items && data.right_navbar_items.length > 0 && (
            <nav className="flex flex-row">
              <ul className="flex flex-row gap-6 md:gap-12">
                {data.right_navbar_items.map((item) => (
                  <li
                    key={item.id}
                    // Alterado para 'text-black' para contraste no fundo amarelo
                    className="font-bold text-black"
                  >
                    <Link href={item.URL} target={item.target}>
                      {item.text.toUpperCase()}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}
