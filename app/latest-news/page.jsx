import Bannermain from "../component/gobal/Banner";
import NewsCard from "../component/latestnew.jsx/NewsCard";
import { newsData } from "../data/page";




const LatestNewsPage = () => {
  return (
    <main>
      <Bannermain
        backgroundImg="/banner-news.jpg"
        title="Latest News"
      />

      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsData.map((news) => (
            <NewsCard key={news.id} {...news} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default LatestNewsPage;
