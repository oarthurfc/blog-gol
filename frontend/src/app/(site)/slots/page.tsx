import seoData from "@/lib/nextMetadata";
import { Category } from "@/types/category";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Square, Star } from "lucide-react";
import BlockRendererClient from "@/components/BlockRenderClient";
import cloudinaryLoader from "@/lib/cloudinary";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getSlotsPage } from "@/services/slots";

export const revalidate = 5;

export async function generateMetadata() {
  const slotsPage = await getSlotsPage();

  if (!slotsPage) {
    return seoData;
  }

  // Retorna metadata básico baseado nos dados da página
  return {
    title: slotsPage.title,
    description: slotsPage.description,
  };
}

export default async function SlotsPage() {
  const slotsPage = await getSlotsPage();
  const categories: Category[] | undefined = slotsPage?.categories;

  console.log(slotsPage);
  return (
    <article className="m-auto flex min-h-screen w-full max-w-[1320px] flex-col px-4 py-10 lg:px-0">
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

      <h1 className="mb-4 text-3xl font-bold text-heading lg:text-4xl">{slotsPage?.title}</h1>
      <p className="mb-6 text-base lg:text-lg">{slotsPage?.description}</p>

      {/* Bets */}
      {slotsPage?.bets && slotsPage?.bets.length > 0 && (
        <section className="my-12 flex w-full flex-col gap-4">
          {slotsPage.bets.map((bet) => (
            <div
              key={bet.ranking}
              className="relative flex w-full flex-col gap-6 border-b-2 border-primary-yellow bg-card px-4 py-8 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8"
            >
              <span className="absolute right-0 top-0 h-6 w-6 bg-primary-yellow text-center text-sm font-bold leading-6 text-black sm:left-0">
                {bet.ranking}
              </span>

              {/* Logo e Nome */}
              <div className="flex flex-row items-center gap-3 sm:gap-4">
                {bet.logo?.url && (
                  <Image
                    loader={cloudinaryLoader}
                    src={bet.logo?.url}
                    alt={bet.logo?.alternativeText || `Foto da casa de aposta ${bet.name}`}
                    width={60}
                    height={60}
                    className="h-[60px] w-[60px] rounded-full object-cover sm:h-[80px] sm:w-[80px]"
                  />
                )}
                <div className="flex flex-col gap-1">
                  <p className="text-base font-bold sm:text-lg">{bet.name}</p>
                  <span className="flex flex-row text-sm text-[#F59E0B]">
                    {Array.from({ length: bet.stars }).map((_, index) => (
                      <Star key={index} fill="#F59E0B" className="h-4 w-4" />
                    ))}
                  </span>
                </div>
              </div>

              {/* Diferencial */}
              {bet.differential && (
                <div className="flex flex-col">
                  <p className="text-sm font-bold text-primary-yellow sm:text-base">Diferencial</p>
                  <p className="pb-2 text-sm sm:text-base">{bet.differential}</p>
                  {bet?.article?.slug && (
                    <Link
                      className="text-sm text-gray-500 underline"
                      href={`/artigos/${bet?.article?.slug}`}
                    >
                      Leia {bet.name} Review
                    </Link>
                  )}
                </div>
              )}

              {/* Checklist */}
              <div className="flex flex-col gap-2">
                {bet.checklist_1 && (
                  <ul className="list-none">
                    <li className="flex items-start gap-2 text-sm sm:text-base">
                      <CheckCircle color="#10B981" className="mt-0.5 h-5 w-5 flex-shrink-0" />
                      <span>{bet.checklist_1}</span>
                    </li>
                  </ul>
                )}

                {bet.checklist_2 && (
                  <ul className="list-none">
                    <li className="flex items-start gap-2 text-sm sm:text-base">
                      <CheckCircle color="#10B981" className="mt-0.5 h-5 w-5 flex-shrink-0" />
                      <span>{bet.checklist_2}</span>
                    </li>
                  </ul>
                )}

                {bet.checklist_3 && (
                  <ul className="list-none">
                    <li className="flex items-start gap-2 text-sm sm:text-base">
                      <CheckCircle color="#10B981" className="mt-0.5 h-5 w-5 flex-shrink-0" />
                      <span>{bet.checklist_3}</span>
                    </li>
                  </ul>
                )}
              </div>

              {/* Button */}
              <Link href={bet.link} className="w-full sm:w-auto lg:w-auto">
                <Button className="w-full px-8 text-black sm:w-auto sm:px-16">Cadastre-se</Button>
              </Link>
            </div>
          ))}
        </section>
      )}

      {slotsPage?.content_1 && <BlockRendererClient content={slotsPage?.content_1} />}

      {/* Testimonials */}
      {slotsPage?.testimonials && slotsPage?.testimonials.length > 0 && (
        <section className="my-12 w-full">
          <h2 className="mb-8 text-2xl font-bold text-heading lg:text-3xl">Nossos especialistas</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {slotsPage.testimonials.slice(0, 4).map((testimonial) => (
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

      {slotsPage?.content_2 && <BlockRendererClient content={slotsPage?.content_2} />}

      {/* FAQs */}
      {slotsPage?.faqs && slotsPage?.faqs.length > 0 && (
        <section className="my-12 w-full">
          <h2 className="mb-8 text-2xl font-bold text-heading lg:text-3xl">Perguntas Frequentes</h2>
          <Accordion type="single" collapsible className="w-full">
            {slotsPage.faqs.map((faq, index) => (
              <AccordionItem key={faq.id} value={`item-${index}`}>
                <AccordionTrigger className="rounded-none border-b border-primary-yellow text-left text-base font-semibold text-heading sm:text-lg">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      )}
    </article>
  );
}
