import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Bannermain from "../../component/global/Banner";
import { events } from "../../data/date";

export default async function EventDetailPage({ params }) {
  const { slug } = await params;
  const event = events.find((e) => e.slug === slug);

  if (!event) return notFound();

  return (
    <>
      <Bannermain backgroundImg="/aboutbanner.png" title={event.title} />

      <section className="relative py-16 md:py-20 px-4 bg-white overflow-hidden">
        {/* Decorative corner icons */}
        <div className="absolute top-0 left-0 w-32 md:w-44 opacity-70 pointer-events-none">
          <Image
            src="/leftpea.png"
            alt=""
            width={180}
            height={180}
            className="w-full h-auto"
          />
        </div>
        <div className="absolute top-0 right-0 w-32 md:w-44 opacity-70 pointer-events-none">
          <Image
            src="/rightpea.png"
            alt=""
            width={180}
            height={180}
            className="w-full h-auto"
          />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold text-[#2f5f73] mb-4 text-center">
            {event.title}
          </h1>

          <p className="text-gray-600 text-[15px] md:text-base leading-relaxed text-center max-w-3xl mx-auto mb-12">
            {event.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {event.gallery.map((img, i) => (
              <div
                key={i}
                className="relative h-[260px] rounded-2xl overflow-hidden shadow-md group"
              >
                <Image
                  src={img}
                  alt={`${event.title} photo ${i + 1}`}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                />
              </div>
            ))}
          </div>

          <div className="text-center mt-14">
            <Link
              href="/event"
              className="inline-block bg-[#2f5f73] hover:bg-[#244a5a] text-[#F6C453] font-bold px-8 py-3 rounded-full transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:scale-95"
            >
              ← Back to All Events
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}