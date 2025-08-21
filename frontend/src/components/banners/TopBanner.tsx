import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface TopBannerProps {
  title: string;
  subtitle?: string;
  imageUrl: string;
  buttonText?: string;
  buttonLink?: string;
}

export default function TopBanner({
  title,
  subtitle,
  imageUrl,
  buttonText,
  buttonLink
}: TopBannerProps) {
  return (
    <div className="relative w-full h-96">
      {/* Imagem de fundo */}
      <div className="absolute inset-0">
        <Image
          src={imageUrl}
          alt={title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Overlay escuro para melhor contraste */}
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>
      
      {/* Conteúdo */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{title}</h2>
        
        {subtitle && (
          <p className="text-xl text-white mb-8 max-w-2xl">{subtitle}</p>
        )}
        
        {buttonText && buttonLink && (
          <Link 
            href={buttonLink}
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded font-medium hover:bg-blue-700 transition"
          >
            {buttonText}
          </Link>
        )}
      </div>
    </div>
  );
}
