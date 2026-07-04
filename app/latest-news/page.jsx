import Bannermain from "../component/gobal/Banner";
import NewsCard from "../component/latestnew.jsx/NewsCard";
import { newsData } from "../data/date";
import Image from "next/image";

const LatestNewsPage = () => {
  return (
    <main>
      <Bannermain
        backgroundImg="/aboutbanner.png"
        title="Latest News"
      />

      <div className="relative overflow-hidden bg-[#f5f5f5] py-16 px-4">

        {/* Left Decorative Image */}
        <div className="absolute top-0 left-0 w-32 md:w-44 opacity-80">
          <Image
            src="/leftpea.png"
            alt="left design"
            width={180}
            height={180}
            className="w-full h-auto"
          />
        </div>

        {/* Right Decorative Image */}
        <div className="absolute top-0 right-0 w-32 md:w-44 opacity-80 ">
          <Image
            src="/rightpea.png"
            alt="right design"
            width={180}
            height={180}
            className="w-full h-auto"
          />
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto relative z-10">

          {/* Heading */}
          <p className="text-center uppercase text-sm tracking-widest text-gray-500 mb-2">
            Stay Updated With Us
          </p>

          <h1 className="text-center text-3xl md:text-4xl font-semibold text-[#2f5f73] mb-12">
            Latest News & Updates
          </h1>

          {/* News Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsData.map((news) => (
              <NewsCard key={news.id} {...news} />
            ))}
          </div>

        </div>
      </div>
    </main>
  );
};

export default LatestNewsPage;