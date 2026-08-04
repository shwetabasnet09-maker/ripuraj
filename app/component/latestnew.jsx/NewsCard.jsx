import Image from "next/image";
import Link from "next/link";

const NewsCard = ({ id, slug, image, title, short_description }) => {
  // Some news items have an empty slug from the backend — fall back to
  // the numeric id so the link always points somewhere valid instead of
  // a broken "/latest-news/" URL.
  const linkTarget = slug && slug.trim() ? slug : id;

  return (
    <Link href={`/latest-news/${linkTarget}`}>
      <div className="group cursor-pointer">
        {/* Image */}
        <div className="relative h-64 bg-[#2f5f73] rounded-[21px] overflow-hidden">
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              unoptimized
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white/60 text-sm">
              No image
            </div>
          )}
        </div>

        {/* Title */}
        <p className="text-center text-[#2f5f73] font-medium text-[20px] mt-4">
          {title}
        </p>

        {/* Short description */}
        {/* {short_description && (
          <p className="text-center text-gray-500 text-sm mt-2 line-clamp-2">
            {short_description}
          </p>
        )} */}
      </div>
    </Link>
  );
};

export default NewsCard;