"use client";

import cloudinaryLoader from "@/lib/cloudinary";
import Image from "next/image";

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

  console.log("Data recebida no NavBar:", data);
  return (
    <div className="flex h-16 w-full flex-row items-center justify-center border-b-2 border-amber-300 bg-black">
      <div className="flex w-full max-w-[1320px] flex-row justify-between">
        {data?.logo && (
          <Image
            loader={cloudinaryLoader}
            src={data.logo.url}
            width={90}
            height={30}
            alt="Logo Gol a Gol"
          />
        )}

        {data?.right_navbar_items && data.right_navbar_items.length > 0 && (
          <nav className="flex flex-row">
            <ul className="flex flex-row gap-12">
              {data.right_navbar_items.map((item) => (
                <li key={item.id} className="font-semibold">
                  {item.text.toUpperCase()}
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
}
