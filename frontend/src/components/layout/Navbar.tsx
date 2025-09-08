import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/vercel.svg" // Substitua pelo logo do Blog GOL
              alt="Blog GOL"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
          </Link>

          {/* Links de navegação principal */}
          <nav className="hidden space-x-8 md:flex">
            <Link href="/" className="font-medium text-gray-700 hover:text-blue-600">
              Home
            </Link>
            <Link href="/artigos" className="font-medium text-gray-700 hover:text-blue-600">
              Artigos
            </Link>
            <Link href="/testimonials" className="font-medium text-gray-700 hover:text-blue-600">
              Depoimentos
            </Link>
          </nav>

          {/* Menu mobile (hambúrguer) */}
          <div className="md:hidden">
            <button className="text-gray-600 hover:text-blue-600 focus:outline-none">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile (expandido) - Será controlado por um estado */}
      {/* <div className="md:hidden bg-white py-2 shadow-inner">
        <div className="container mx-auto px-4">
          <div className="flex flex-col space-y-3">
            <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium py-2">
              Home
            </Link>
            <Link href="/artigos" className="text-gray-700 hover:text-blue-600 font-medium py-2">
              Artigos
            </Link>
            <Link href="/testimonials" className="text-gray-700 hover:text-blue-600 font-medium py-2">
              Depoimentos
            </Link>
          </div>
        </div>
      </div> */}
    </header>
  );
}
