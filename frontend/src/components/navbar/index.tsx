"use client";

import cloudinaryLoader from "@/lib/cloudinary";
import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "./components/ModeToggle";
import { useState } from "react";
import { Menu, X } from "lucide-react";

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (!data) return null;

  // Arbitrary Value para o corte diagonal:
  // (0,0) -> (50% top) -> (47% bottom) -> (0, 100%)
  const CLIP_PATH_CLASS = "[clip-path:polygon(0_0,_50%_0,_47%_100%,_0_100%)]";

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative h-16 w-full border-b-4 border-primary-yellow bg-primary-yellow">
      <div className={`absolute inset-0 bg-[#232323] ${CLIP_PATH_CLASS}`}></div>

      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1320px] flex-row items-center justify-between px-4 lg:px-0">
        {data?.logo && (
          <Link href="/">
            <Image
              loader={cloudinaryLoader}
              src={data.logo.url}
              width={90}
              height={30}
              alt="Logo Gol a Gol"
              className="h-auto w-auto scale-75 md:scale-100"
            />
          </Link>
        )}

        {/* Desktop Navigation */}
        <div className="hidden flex-row items-center gap-4 md:flex lg:gap-6">
          {data?.right_navbar_items && data.right_navbar_items.length > 0 && (
            <nav className="flex flex-row">
              <ul className="flex flex-row gap-4 lg:gap-12">
                {data.right_navbar_items.map((item) => (
                  <li key={item.id} className="text-sm font-bold text-black lg:text-base">
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

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <ModeToggle />
          <button
            onClick={toggleMenu}
            className="p-2 text-black transition-colors hover:text-gray-700"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`absolute left-0 right-0 top-16 z-50 bg-background transition-all duration-300 ease-in-out md:hidden ${
          isMenuOpen
            ? "h-[calc(100vh-4rem)] translate-y-0 opacity-100"
            : "h-0 -translate-y-full opacity-0"
        }`}
      >
        <div className="h-full overflow-hidden">
          <nav className="h-full px-4 py-6">
            <ul className="flex flex-col gap-6">
              {data?.right_navbar_items?.map((item) => (
                <li key={item.id} className="font-bold text-white">
                  <Link
                    href={item.URL}
                    target={item.target}
                    onClick={() => setIsMenuOpen(false)}
                    className="block border-b border-gray-700 py-3 text-lg transition-colors last:border-b-0 hover:text-primary-yellow"
                  >
                    {item.text.toUpperCase()}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
