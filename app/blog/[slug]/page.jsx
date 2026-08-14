import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, ArrowLeft } from "lucide-react";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

function getReadingTime(text) {
  if (!text) return "1 min read";
  // Strip HTML tags before counting words so the estimate isn't inflated
  // by markup like <p style="margin-left:0px;">.
  const plain = text.replace(/<[^>]*>/g, " ");
  const words = plain.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

function getInitials(name) {
  if (!name) return "RA";
  const parts = name.trim().split(/\s+/);
  return parts
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
}

const linkTarget = (b) => (b?.slug && b.slug.trim() ? b.slug : b?.id);

// Try a single-article endpoint first (fast path once the backend supports it).
async function fetchBlogBySlug(slug) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/news/${slug}/`, {
      cache: "no-store",
    });
    if (res.status === 404) return { notFound: true };
    if (!res.ok) throw new Error(`Server returned status ${res.status}`);
    const data = await res.json();
    return { blog: data };
  } catch (err) {
    // Endpoint may not exist yet, or the request genuinely failed —
    // let the caller decide whether to fall back or surface an error.
    return { error: err };
  }
}

// Fallback: pull the full list and match on slug OR id, same behavior
// as the previous implementation (and as the /blog listing page).
async function fetchAllNews() {
  const res = await fetch(`${API_BASE_URL}/api/news/`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Server returned status ${res.status}`);
  }
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

async function getBlogData(slug) {
  const single = await fetchBlogBySlug(slug);

  if (single.blog) {
    // Still fetch "related" posts from the list for the sidebar/footer grid.
    let allNews = [];
    try {
      allNews = await fetchAllNews();
    } catch {
      // Non-fatal — article itself loaded fine, just skip "More Articles".
    }
    return { blog: single.blog, allNews };
  }

  if (single.notFound) {
    return { blog: null, allNews: [] };
  }

  // Single-article endpoint failed/unavailable — fall back to full list.
  const allNews = await fetchAllNews();
  const blog = allNews.find(
    (b) => (b.slug && b.slug === slug) || String(b.id) === String(slug)
  );
  return { blog: blog || null, allNews };
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;

  let blog, allNews;
  try {
    ({ blog, allNews } = await getBlogData(slug));
  } catch (err) {
    console.error("Failed to fetch news:", err);
    return (
      <div className="min-h-screen flex items-center justify-center pt-24 px-4 text-center">
        <div>
          <p className="text-red-600 font-medium mb-2">
            Couldn't load this article
          </p>
          <p className="text-gray-500 text-sm">
            Please try again in a moment.
          </p>
          <Link
            href="/blog"
            className="inline-block mt-4 text-[#2f5f73] font-semibold text-sm hover:underline"
          >
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  if (!blog) return notFound();

  const otherBlogs = allNews
    .filter((b) => linkTarget(b) !== linkTarget(blog))
    .slice(0, 3);

  const readingTime = getReadingTime(blog.content);
  const category = "Rice & Nutrition";
  const tags = [category, "Ripuraj Agro", "Rice Guide"];
  const authorName = blog.author || "Ripuraj Agro";
  const publishedDate = blog.published_date
    ? new Date(blog.published_date).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <>
      {/* ================= COVER IMAGE ================= */}
      <div className="relative h-[280px] sm:h-[380px] lg:h-[460px] w-full bg-gray-100">
        {blog.image && (
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            unoptimized
            priority
            className="object-cover"
          />
        )}
      </div>

      <div className="max-w-6xl mx-auto px-5 lg:px-4">
        <Link
          href="/blog"
          className="group inline-flex items-center gap-2 text-[#2f5f73] font-semibold text-sm mt-6 mb-4 hover:gap-3 transition-all duration-300"
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          Back to Blog
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12">
          {/* ================= MAIN CONTENT ================= */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-[#2f5f73] text-white text-xs font-semibold px-3 py-1 rounded-full">
                {category}
              </span>
              <span className="text-gray-400 text-xs flex items-center gap-1">
                <Clock size={13} />
                {readingTime}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-[42px] font-bold text-[#1a1a1a] leading-tight lg:leading-tight mb-5">
              {blog.title}
            </h1>

            <div className="flex items-center gap-3 pb-6 border-b border-gray-100 mb-8">
              <div className="w-10 h-10 rounded-full bg-[#2f5f73] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                {getInitials(authorName)}
              </div>
              <div>
                <p className="text-[#1a1a1a] font-semibold text-sm">{authorName}</p>
                {publishedDate && (
                  <p className="text-gray-400 text-xs">{publishedDate}</p>
                )}
              </div>
            </div>

            {/*
              blog.content is HTML coming from the CMS/rich-text editor
              (it already contains <p>, <h2>, <strong>, <br> tags — see
              the raw content in the admin). Render it as HTML instead of
              splitting on "\n\n" and printing it as literal text, or the
              tags show up as visible text in the page.

              This is safe here because the HTML comes from our own
              backend/CMS, not from arbitrary user input.
            */}
            <article
              className="prose prose-neutral max-w-none
                         text-gray-700 text-[15px] lg:text-[17px]
                         leading-relaxed lg:leading-loose
                         prose-headings:text-[#1a1a1a] prose-headings:font-bold
                         prose-h2:text-xl prose-h2:lg:text-2xl prose-h2:mt-8 prose-h2:mb-3
                         prose-p:my-4
                         prose-a:text-[#2f5f73] prose-a:no-underline hover:prose-a:underline
                         prose-strong:text-[#1a1a1a]
                         prose-img:rounded-xl"
              dangerouslySetInnerHTML={{ __html: blog.content || "" }}
            />

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

          {/* ================= SIDEBAR ================= */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-28 space-y-6 pb-16">
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
                  key={linkTarget(b)}
                  href={`/blog/${linkTarget(b)}`}
                  className="group block bg-white rounded-2xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5"
                >
                  <div className="relative w-full h-[170px] lg:h-[190px] overflow-hidden bg-gray-100">
                    {b.image && (
                      <Image
                        src={b.image}
                        alt={b.title}
                        fill
                        unoptimized
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                      />
                    )}
                  </div>

                  <div className="p-4 lg:p-5">
                    <p className="text-gray-400 text-[11px] mb-1.5">
                      {b.published_date
                        ? new Date(b.published_date).toLocaleDateString("en-IN")
                        : ""}
                    </p>
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