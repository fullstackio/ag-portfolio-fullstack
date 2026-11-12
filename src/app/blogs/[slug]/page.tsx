import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import type { Metadata } from 'next';

import { SectionContainer } from '@/components/layout/section-container';
import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { Reveal } from '@/components/motion/reveal';
import { blogPosts } from '@/data/blogs';

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

function getPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Suspense fallback={null}>
          {params.then((p) => (
            <PostContent slug={p.slug} />
          ))}
        </Suspense>
      </main>
      <SiteFooter />
    </>
  );
}

async function PostContent({ slug }: { slug: string }) {
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <>
      <SectionContainer as="div" className="pt-40 pb-16 lg:pt-48 lg:pb-20">
        <Reveal>
          <Link
            href="/blogs"
            className="text-muted-foreground hover:text-foreground font-body mb-8 inline-flex items-center gap-2 text-sm transition-colors"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to Case Studies
          </Link>

          <div className="mb-6 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="border-foreground/10 text-muted-foreground rounded-full border px-2.5 py-1 font-mono text-[11px]"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="font-heading mb-6 max-w-3xl text-[clamp(2rem,5vw,3.25rem)] leading-[1.05] tracking-tight">
            {post.title}
          </h1>

          <p className="text-muted-foreground font-body mb-6 max-w-2xl text-lg leading-relaxed">
            {post.excerpt}
          </p>

          <p className="text-muted-foreground font-mono text-sm">
            By Avijit Ghosh &middot; {post.date}
          </p>
        </Reveal>
      </SectionContainer>

      <SectionContainer as="div" className="pb-16 lg:pb-20">
        <Reveal className="border-foreground/10 relative aspect-video w-full overflow-hidden rounded-2xl border">
          <Image
            src={post.coverImage.src}
            alt={post.coverImage.alt}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 1200px, 100vw"
            priority
          />
        </Reveal>
      </SectionContainer>

      <SectionContainer as="div" className="pb-24 lg:pb-32">
        <div className="mx-auto flex max-w-3xl flex-col gap-12">
          {post.sections.map((section, index) => (
            <Reveal key={section.heading} delayMs={60 * index}>
              <h2 className="font-heading mb-4 text-2xl tracking-tight lg:text-3xl">
                {section.heading}
              </h2>
              {section.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-muted-foreground font-body mb-4 text-base leading-relaxed lg:text-lg"
                >
                  {paragraph}
                </p>
              ))}
              {section.bullets ? (
                <ul className="font-body flex flex-col gap-2">
                  {section.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="text-muted-foreground flex items-start gap-2.5 text-base leading-relaxed lg:text-lg"
                    >
                      <span className="bg-foreground/40 mt-2.5 size-1.5 shrink-0 rounded-full" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              ) : null}
            </Reveal>
          ))}
        </div>
      </SectionContainer>
    </>
  );
}
