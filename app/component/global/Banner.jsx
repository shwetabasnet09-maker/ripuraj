"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const Bannermain = ({ title, subTitle, backgroundImg }) => {
  const location = usePathname();
  const pathnames = location.split("/").filter((x) => x);

  return (
    <div
      className="relative w-full h-[450px] md:h-[457px]   bg-cover bg-center "
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      {/* Strong Dark Overlay */}
      <div className="absolute inset-0 "></div>

      {/* Content */}
      <div className="relative z-10 flex justify-center items-center h-full  px-4">
        <div className=" w-full wrapper mt-20">
          <h1 className="text-[25px] sm:text-[25px] max-w-2xl md:text-[45px] lg:text-[45px] font-primary font-bold text-white leading-tight mb-4">
            {title}
          </h1>

          <ol className="flex flex-wrap text-base sm:text-lg">
            <li>
              <Link
                className="text-white text-[12px] sm:text-[12px] md:text-[17.5px]  font-medium"
                href="/"
              >
                Home
              </Link>
            </li>

            {pathnames.map((value, index) => {
              const formattedTitle = decodeURIComponent(value).replace(
                /[/\-]/g,
                " "
              );
              const last = index === pathnames.length - 1;
              const href = `/${pathnames.slice(0, index + 1).join("/")}`;

              return (
                <li key={href} className="flex items-center">
                  <span className="text-white mx-3 sm:mx-4 text-[15px] sm:text-[17px]">
                    ||
                  </span>

                  {last ? (
                    <span className="text-white capitalize text-[15px] sm:text-[16.5px] md:text-[17.5px] opensans font-medium">
                      {formattedTitle}
                    </span>
                  ) : (
                    <Link
                      className="text-white capitalize font-DmSans text-[15px] sm:text-[16.5px] md:text-[17.5px]"
                      href={href}
                    >
                      {formattedTitle}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Bannermain;