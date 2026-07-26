import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Clock, ArrowLeft } from "lucide-react";
import { blogs } from "../../data/date";

function getReadingTime(text) {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) return notFound();

  const otherBlogs = blogs.filter((b) => b.slug !== slug).slice(0, 3);
  const readingTime = getReadingTime(blog.content);
  const category = "Rice & Nutrition";
  const tags = [category, "Ripuraj Agro", "Rice Guide"];

  return (
    <>
      {/* ================= COVER IMAGE ================= */}
      <div className="relative h-[280px] sm:h-[380px] lg:h-[460px] w-full">
        <Image
          src={blog.coverImage}
          alt={blog.title}
          fill
          unoptimized
          priority
          className="object-cover"
        />
      </div>

      <div className="max-w-6xl mx-auto px-5 lg:px-4">
        {/* Back to Blog */}
        <Link
          href="/blog"
          className="group inline-flex items-center gap-2 text-[#2f5f73] font-semibold text-sm mt-6 mb-4 hover:gap-3 transition-all duration-300"
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          Back to Blog
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12">
          {/* ================= MAIN CONTENT (left, 2/3 width) ================= */}
          <div className="lg:col-span-2">
            {/* Category + reading time */}
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-[#2f5f73] text-white text-xs font-semibold px-3 py-1 rounded-full">
                {category}
              </span>
              <span className="text-gray-400 text-xs flex items-center gap-1">
                <Clock size={13} />
                {readingTime}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-[42px] font-bold text-[#1a1a1a] leading-tight lg:leading-tight mb-5">
              {blog.title}
            </h1>

            {/* Author row */}
            <div className="flex items-center gap-3 pb-6 border-b border-gray-100 mb-8">
              <div className="w-10 h-10 rounded-full bg-[#2f5f73] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                RA
              </div>
              <div>
                <p className="text-[#1a1a1a] font-semibold text-sm">Ripuraj Agro</p>
                <p className="text-gray-400 text-xs">{blog.date}</p>
              </div>
            </div>

            {/* Article body */}
            <article className="space-y-5">
              {blog.content.split("\n\n").map((para, i) => {
                const isNumbered = /^\d+\.\s/.test(para);

                return (
                  <p
                    key={i}
                    className={`text-gray-700 text-[15px] lg:text-[17px] leading-relaxed lg:leading-loose ${
                      isNumbered ? "pl-4 border-l-2 border-[#2f5f73]/30" : ""
                    }`}
                  >
                    {para}
                  </p>
                );
              })}
            </article>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-gray-100">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* ================= SIDEBAR (right, 1/3 width, sticky) ================= */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-28 space-y-6 pb-16">
              {/* Brand bio card */}
              <div className="bg-[#FAF8F3] rounded-2xl p-6">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#2f5f73] flex items-center justify-center text-white font-bold flex-shrink-0">
                    RA
                  </div>
                  <div>
                    <p className="font-bold text-[#1a1a1a] mb-1">
                      Ripuraj Agro Pvt. Ltd.
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      India's trusted rice brand since 2010, supplying premium
                      non-Basmati and Basmati rice across the country and
                      beyond.
                    </p>
                    <Link
                      href="/about-us"
                      className="inline-block mt-2 text-[#2f5f73] font-semibold text-sm hover:underline"
                    >
                      Learn about us →
                    </Link>
                  </div>
                </div>
              </div>

              {/* CTA box */}
              <div className="bg-[#2f5f73] rounded-2xl p-6 text-center">
                <h3 className="text-white font-bold text-lg mb-2">
                  Looking for Premium Quality Rice?
                </h3>
                <p className="text-white/80 text-sm mb-5">
                  Explore our full range of rice, delivered fresh across India
                  with trusted quality since 2010.
                </p>

                <div className="flex flex-col gap-3">
                  <Link
                    href="/shop"
                    className="bg-white text-[#2f5f73] font-semibold px-6 py-2.5 rounded-full text-sm hover:bg-gray-100 transition-all hover:shadow-lg active:scale-95"
                  >
                    Shop Now →
                  </Link>
                  <Link
                    href="/contact-us"
                    className="border border-white/40 text-white font-semibold px-6 py-2.5 rounded-full text-sm hover:bg-white/10 transition-all"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>

              {/* Quick links */}
              <div>
                <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">
                  Quick Links
                </h4>
                <div className="space-y-2">
                  <Link href="/shop" className="block text-[#2f5f73] text-sm hover:underline">
                    🛒 Browse Our Products
                  </Link>
                  <Link href="/about-us" className="block text-[#2f5f73] text-sm hover:underline">
                    🏭 About Ripuraj Agro
                  </Link>
                  <Link href="/contact-us" className="block text-[#2f5f73] text-sm hover:underline">
                    📞 Contact Us
                  </Link>
                  <Link href="/blog" className="block text-[#2f5f73] text-sm hover:underline">
                    📰 All Blog Posts
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MORE ARTICLES ================= */}
      {otherBlogs.length > 0 && (
        <section className="relative py-12 lg:py-20 px-5 lg:px-4 bg-[#FAFAF8] overflow-hidden">
          <div className="max-w-6xl mx-auto relative z-10">
            <p className="text-center uppercase text-[10px] lg:text-xs tracking-widest text-gray-400 mb-2">
              Keep Reading
            </p>
            <h2 className="text-center text-xl lg:text-3xl font-bold text-[#2f5f73] mb-8 lg:mb-12">
              More Articles
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 lg:gap-8">
              {otherBlogs.map((b) => (
                <Link
                  key={b.slug}
                  href={`/blog/${b.slug}`}
                  className="group block bg-white rounded-2xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5"
                >
                  <div className="relative w-full h-[170px] lg:h-[190px] overflow-hidden">
                    <Image
                      src={b.coverImage}
                      alt={b.title}
                      fill
                      unoptimized
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                    />
                  </div>

                  <div className="p-4 lg:p-5">
                    <p className="text-gray-400 text-[11px] mb-1.5">{b.date}</p>
                    <h3 className="font-bold text-[#1a1a1a] text-sm lg:text-base leading-snug line-clamp-2 group-hover:text-[#2f5f73] transition-colors">
                      {b.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}