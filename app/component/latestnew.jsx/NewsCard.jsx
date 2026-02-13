import Image from "next/image";
import Link from "next/link";

const NewsCard = ({ slug, image, title, date, description }) => {
  return (
    <Link href={`/latest-news/${slug}`}>
      <div className="bg-white rounded-xl shadow-md overflow-hidden group cursor-pointer">
        {/* Image */}
        <div className="relative h-56 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        {/* Content */}
        <div className="p-5">
          <p className="text-sm text-gray-400">{date}</p>
          <h3 className="font-semibold text-gray-800 mt-2">
            {title}
          </h3>
          <p className="text-gray-600 text-sm mt-2">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;
