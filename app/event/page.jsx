import Image from "next/image";
import Link from "next/link";
import Bannermain from "../component/global/Banner";
import { events } from "../data/date";

export default function EventPage() {
  return (
    <>
      <Bannermain backgroundImg="/About%20Banner.webp" title="Events" />

      <section className="relative py-14 md:py-20 px-4 bg-white overflow-hidden">
        {/* Decorative corner icons
        <div className="absolute top-0 left-0 w-32 md:w-44 opacity-70 pointer-events-none">
          <Image
            src="/leftpea.png"
            alt=""
            width={180}
            height={180}
            className="w-full h-auto"
          />
        </div> */}
        {/* <div className="absolute top-0 right-0 w-32 md:w-44 opacity-70 pointer-events-none">
          <Image
            src="/rightpea.png"
            alt=""
            width={180}
            height={180}
            className="w-full h-auto"
          />
        </div> */}

        <div className="max-w-7xl mx-auto relative z-10">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-14">
            {events.map((event) => (
              <div key={event.slug} className="flex flex-col items-center text-center group">
                <div className="relative w-full h-[210px] rounded-2xl overflow-hidden shadow-md">
                  <Image
                    src={event.coverImage}
                    alt={event.title}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  />
                </div>

                <h3 className="mt-5 text-[20px] font-objective font-semibold text-[#1a2b33]">
                  {event.title}
                </h3>

                <Link
                  href={`/event/${event.slug}`}
                  className="mt-5 bg-[#2f5f73] hover:bg-[#244a5a] text-[#F6C453] font-bold px-8 py-3 rounded-full transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:scale-95"
                >
                  See More
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}