import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Reveal } from '../motion/reveal';

import type { BlogPost } from '@/types/blog';

export function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <Reveal delayMs={60 * (index % 3)} className="group h-full">
      <Link
        href={`/blogs/${post.slug}`}
        className="border-foreground/10 bg-surface hover:border-foreground/30 flex h-full flex-col overflow-hidden rounded-2xl border transition-all duration-500"
      >
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={post.coverImage.src}
            alt={post.coverImage.alt}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
          <span className="bg-background/90 text-foreground absolute top-3 right-3 rounded-full px-2.5 py-1 font-mono text-[11px] backdrop-blur">
            {post.date}
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-4 p-6 lg:p-7">
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="border-foreground/10 text-muted-foreground rounded-full border px-2.5 py-1 font-mono text-[11px]"
              >
                {tag}
              </span>
            ))}
          </div>
          <h3 className="font-heading text-xl leading-tight tracking-tight lg:text-2xl">
            {post.title}
          </h3>
          <p className="text-muted-foreground font-body flex-1 text-sm leading-relaxed lg:text-base">
            {post.excerpt}
          </p>
          <span className="group/link font-body inline-flex items-center gap-2 pt-1 text-sm font-medium transition-all group-hover:gap-3">
            Read Case Study
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}
