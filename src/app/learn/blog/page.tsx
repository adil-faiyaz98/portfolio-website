import type { Metadata } from "next";
import Link from "next/link";
import { GlassCard } from "@/components/ui";
import { blogPosts, getFeaturedPosts, getAllCategories } from "@/data/blog";
import { ArrowRight, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog | SDA Intelligence",
  description:
    "Insights on enterprise AI agents, SAP integration, and automation best practices from SDA Intelligence.",
  openGraph: {
    title: "Blog | SDA Intelligence",
    description:
      "Insights on enterprise AI agents, SAP integration, and automation.",
    type: "website",
    siteName: "SDA Intelligence",
  },
};

export default function BlogPage() {
  const featuredPosts = getFeaturedPosts();
  const categories = getAllCategories();

  return (
    <main id="main-content" className="min-h-screen bg-background py-20 px-6">
      <div className="max-w-[1280px] mx-auto">
        {/* Page Header */}
        <section className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-primary/10 text-accent-primary text-sm font-medium mb-6">
            <BookOpen className="w-4 h-4" />
            SDA Intelligence Blog
          </div>
          <h1 className="text-h1 text-text-primary mb-6">
            Insights & Best Practices
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Deep dives on enterprise AI agents, SAP integration patterns, and
            automation strategies from our team.
          </p>
        </section>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="mb-16">
            <h2 className="text-h3 text-text-primary mb-8">Featured Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredPosts.slice(0, 4).map((post) => (
                <GlassCard
                  key={post.slug}
                  interactive={true}
                  className="p-6 group"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 text-xs rounded-md bg-accent-primary/10 text-accent-primary">
                      {post.category}
                    </span>
                    <span className="text-xs text-text-muted">{post.readTime}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-accent-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-text-secondary mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-text-muted">{post.date}</span>
                    <span className="inline-flex items-center gap-1 text-sm text-accent-primary">
                      Read more
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </GlassCard>
              ))}
            </div>
          </section>
        )}

        {/* Categories */}
        <section className="mb-12">
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1.5 text-sm rounded-lg bg-accent-primary text-white">
              All
            </span>
            {categories.map((category) => (
              <span
                key={category}
                className="px-3 py-1.5 text-sm rounded-lg bg-surface-elevated text-text-secondary hover:text-text-primary hover:bg-surface cursor-pointer transition-colors"
              >
                {category}
              </span>
            ))}
          </div>
        </section>

        {/* All Posts */}
        <section>
          <h2 className="text-h3 text-text-primary mb-8">All Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <GlassCard
                key={post.slug}
                interactive={true}
                className="p-6 group"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-1 text-xs rounded-md bg-surface-elevated text-text-muted">
                    {post.category}
                  </span>
                  <span className="text-xs text-text-muted">{post.readTime}</span>
                </div>
                <h3 className="text-base font-semibold text-text-primary mb-2 group-hover:text-accent-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-text-secondary mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xs text-text-muted">{post.date}</span>
                  <span className="inline-flex items-center gap-1 text-sm text-accent-primary">
                    Read
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="mt-20">
          <GlassCard className="p-8 md:p-12 text-center">
            <h3 className="text-2xl font-semibold text-text-primary mb-4">
              Stay Updated
            </h3>
            <p className="text-text-secondary mb-6 max-w-xl mx-auto">
              Get the latest insights on enterprise AI agents and SAP automation
              delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 rounded-lg bg-white/5 border border-border focus:border-accent-primary focus:outline-none text-text-primary"
              />
              <button className="px-6 py-3 rounded-lg bg-accent-primary text-white font-medium hover:bg-accent-primary-hover transition-colors">
                Subscribe
              </button>
            </div>
          </GlassCard>
        </section>
      </div>
    </main>
  );
}
