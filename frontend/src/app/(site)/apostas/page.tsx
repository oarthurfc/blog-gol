import { getApostasPage } from "@/services/apostas";
import seoData from "@/lib/nextMetadata";
import { Category } from "@/types/category";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, CheckIcon, Square, Star, StarIcon } from "lucide-react";
import BlockRendererClient from "@/components/BlockRenderClient";
import cloudinaryLoader from "@/lib/cloudinary";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export async function generateMetadata() {
  const apostasPage = await getApostasPage();

  if (!apostasPage) {
    return seoData;
  }

  // Retorna metadata básico baseado nos dados da página
  return {
    title: apostasPage.title,
    description: apostasPage.description,
  };
}

export default async function ApostasPage() {
  const apostasPage = await getApostasPage();
  const categories: Category[] | undefined = apostasPage?.categories;

  console.log(apostasPage);
  return (
    <article className="m-auto flex min-h-screen w-full max-w-[1320px] flex-col items-center px-4 py-10 sm:items-start lg:px-0">
      {/* Categories */}
      {categories && categories.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((categoria, index) => (
            <Link
              key={categoria.id}
              className="flex flex-row items-center gap-2"
              href={`/categorias/${categoria.slug}`}
            >
              <Badge>{categoria.name}</Badge>
              {index < categories.length - 1 && <Square width={20} height={2} />}
            </Link>
          ))}
        </div>
      )}

      <h1 className="mb-4 text-3xl font-bold text-heading lg:text-4xl">{apostasPage?.title}</h1>
      <p>{apostasPage?.description}</p>

      {/* Bets */}
      {apostasPage?.bets && apostasPage?.bets.length > 0 && (
        <section className="my-12 flex w-full items-center justify-between">
          {apostasPage.bets.map((bet) => (
            <div
              key={bet.ranking}
              className="relative flex w-full flex-row items-center justify-between border-b-2 border-primary-yellow bg-card px-8 py-8"
            >
              <span className="absolute left-0 top-0 h-5 w-5 bg-primary-yellow text-center text-sm font-bold text-black">
                {bet.ranking}
              </span>

              <div className="flex flex-row items-center gap-2">
                {bet.logo?.url && (
                  <Image
                    loader={cloudinaryLoader}
                    src={bet.logo?.url}
                    alt={bet.logo?.alternativeText || `Foto da casa de aposta ${bet.name}`}
                    width={80}
                    height={80}
                    className="rounded-full object-cover"
                  />
                )}
                <div className="flex flex-col gap-0">
                  <p className="text-lg font-bold">{bet.name}</p>
                  <span className="flex flex-row text-sm text-[#F59E0B]">
                    {Array.from({ length: bet.stars }).map((_, index) => (
                      <Star key={index} fill="#F59E0B" />
                    ))}
                  </span>
                </div>
              </div>

              {bet.differential && (
                <div>
                  <p className="font-bold text-primary-yellow">Diferencial</p>
                  <p className="pb-2">{bet.differential}</p>
                  {bet?.article?.slug && (
                    <Link className="text-gray-500 underline" href={bet?.article?.slug}>
                      Leia {bet.name} Review
                    </Link>
                  )}
                </div>
              )}

              <div className="flex flex-col gap-2">
                {bet.checklist_1 && (
                  <ul className="list-disc pl-5">
                    <li className="flex list-none items-center gap-2">
                      <CheckCircle color="#10B981" />
                      {bet.checklist_1}
                    </li>
                  </ul>
                )}

                {bet.checklist_2 && (
                  <ul className="list-disc pl-5">
                    <li className="flex list-none items-center gap-2">
                      <CheckCircle color="#10B981" />
                      {bet.checklist_2}
                    </li>
                  </ul>
                )}

                {bet.checklist_3 && (
                  <ul className="list-disc pl-5">
                    <li className="flex list-none items-center gap-2">
                      <CheckCircle color="#10B981" />
                      {bet.checklist_3}
                    </li>
                  </ul>
                )}
              </div>

              <Link href={bet.link}>
                <Button className="px-16">Cadastre-se</Button>
              </Link>
            </div>
          ))}
        </section>
      )}

      {apostasPage?.content_1 && <BlockRendererClient content={apostasPage?.content_1} />}

      {/* Testimonials */}
      {apostasPage?.testimonials && apostasPage?.testimonials.length > 0 && (
        <section className="my-12 w-full">
          <h2 className="mb-8 text-2xl font-bold text-heading lg:text-3xl">Nossos especialistas</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {apostasPage.testimonials.slice(0, 4).map((testimonial) => (
              <div
                key={testimonial.id}
                className="900 flex flex-col gap-4 rounded-lg bg-gray-900 p-6 text-white"
              >
                <div className="flex items-center gap-3">
                  {testimonial.profile_picture?.url && (
                    <Image
                      loader={cloudinaryLoader}
                      src={testimonial.profile_picture.url}
                      alt={testimonial.profile_picture.alternativeText || "Foto do especialista"}
                      width={48}
                      height={48}
                      className="rounded-full object-cover"
                    />
                  )}
                  <div className="flex flex-col">
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-sm">{testimonial.job_title}</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed">{testimonial.content}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {apostasPage?.content_2 && <BlockRendererClient content={apostasPage?.content_2} />}

      {/* FAQs */}
      <h2>Perguntas Frequentes</h2>
      {apostasPage?.faqs.map((faq) => (
        <div key={faq.id} className="mb-4">
          <h3 className="font-semibold">{faq.question}</h3>
          <p>{faq.answer}</p>
        </div>
      ))}
    </article>
  );
}
