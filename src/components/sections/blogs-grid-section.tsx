import { BlogCard } from '../blogs/blog-card';
import { SectionContainer } from '../layout/section-container';

import { blogPosts } from '@/data/blogs';

export function BlogsGridSection() {
  return (
    <SectionContainer as="div" className="pb-24 lg:pb-32">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post, index) => (
          <BlogCard key={post.slug} post={post} index={index} />
        ))}
      </div>
    </SectionContainer>
  );
}
