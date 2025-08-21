import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface MidBannerProps {
  title: string;
  subtitle?: string;
  imageUrl: string;
  buttonText?: string;
  buttonLink?: string;
  position?: 'left' | 'right'; // Posição da imagem
}

export default function MidBanner({
  title,
  subtitle,
  imageUrl,
  buttonText,
  buttonLink,
  position = 'left'
}: MidBannerProps) {
  // Determina a ordem dos elementos com base na posição
  const imageOrder = position === 'left' ? 'order-first' : 'order-last';
  const contentOrder = position === 'left' ? 'order-last' : 'order-first';
  
  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          {/* Imagem */}
          <div className={`w-full md:w-1/2 ${imageOrder} mb-8 md:mb-0`}>
            <div className="relative h-64 md:h-80">
              <Image
                src={imageUrl}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover rounded-lg shadow"
              />
            </div>
          </div>
          
          {/* Conteúdo */}
          <div className={`w-full md:w-1/2 ${contentOrder} md:px-8`}>
            <h3 className="text-3xl font-bold mb-4">{title}</h3>
            
            {subtitle && (
              <p className="text-lg text-gray-600 mb-6">{subtitle}</p>
            )}
            
            {buttonText && buttonLink && (
              <Link 
                href={buttonLink}
                className="inline-block bg-blue-600 text-white px-5 py-3 rounded font-medium hover:bg-blue-700 transition"
              >
                {buttonText}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
