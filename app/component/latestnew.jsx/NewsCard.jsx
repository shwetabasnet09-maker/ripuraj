import Image from "next/image";
import Link from "next/link";

const NewsCard = ({ slug, image, title }) => {
  return (
    <Link href={`/latest-news/${slug}`}>
      <div className="group cursor-pointer">
        {/* Image */}
        <div className="relative h-64 bg-[#2f5f73] rounded-[21px] overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Title */}
        <p className="text-center text-[#2f5f73] font-medium text-[20px]  mt-4">
          {title}
        </p>
      </div>
    </Link>
  );
};

export default NewsCard;