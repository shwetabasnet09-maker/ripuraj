import Image from "next/image";
import Link from "next/link";
import Bannermain from "../component/global/Banner";
import { blogs } from "../data/date";

export default function BlogPage() {
  return (
    <>
      <Bannermain backgroundImg="/About%20Banner.webp" title="Blog" />

      <section className="relative py-14 lg:py-20 px-5 lg:px-4 bg-white overflow-hidden">
        {/* Decorative corner icons */}
        {/* <div className="absolute top-0 left-0 w-16 lg:w-44 opacity-70 pointer-events-none">
          <Image
            src="/leftpea.png"
            alt=""
            width={180}
            height={180}
            className="w-full h-auto"
          />
        </div>
        <div className="absolute top-0 right-0 w-16 lg:w-44 opacity-70 pointer-events-none">
          <Image
            src="/rightpea.png"
            alt=""
            width={180}
            height={180}
            className="w-full h-auto"
          />
        </div> */}

        <div className="max-w-7xl mx-auto relative z-10">
          {/* <p className="text-center uppercase text-[10px] lg:text-sm tracking-widest text-gray-500 mb-2">
            From Our Kitchen
          </p>
          <h1 className="text-center text-xl lg:text-4xl font-bold text-[#2f5f73] mb-8 lg:mb-14">
            Ripuraj Blog
          </h1> */}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {blogs.map((blog) => (
              <Link
                key={blog.slug}
                href={`/blog/${blog.slug}`}
                className="group block bg-[#f8f6f1] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="relative w-full h-[180px] lg:h-[220px] overflow-hidden">
                  <Image
                    src={blog.coverImage}
                    alt={blog.title}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  />
                </div>

                <div className="p-4 lg:p-6">
                  <p className="text-gray-400 text-xs mb-2">{blog.date}</p>

                  <h3 className="font-bold text-[#1a1a1a] text-base lg:text-lg leading-snug mb-2 group-hover:text-[#2f5f73] transition-colors line-clamp-2">
                    {blog.title}
                  </h3>

                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                    {blog.excerpt}
                  </p>

                  <span className="inline-block mt-3 text-[#2f5f73] text-sm font-semibold group-hover:underline">
                    Read More →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}