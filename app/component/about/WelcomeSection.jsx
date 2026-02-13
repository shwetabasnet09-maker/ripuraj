import React from "react";
import Image from "next/image";

const RipurajHero = () => {
  return (
    <div className="w-full bg-white py-20">
      <div className="mx-auto max-w-7xl px-4">

        <div className="grid grid-cols-12 gap-0 items-stretch">

          {/* LEFT – 55% */}
          <div className="col-span-12 lg:col-span-7">
            <div className="h-full rounded-[48px] bg-[#F7EACB] px-16 py-16">

              <p className="text-sm font-semibold tracking-wide text-black">
                WELCOME TO RIPURAJ AGRO
              </p>

              <h1 className="mt-3 text-[44px] font-extrabold leading-[1.15] text-[#2C5F7F]">
                Over 46+ Years of Cultivating
                <br />
                Quality and Excellence
              </h1>

              <p className="mt-6 max-w-[520px] text-[15px] leading-7 text-[#444]">
                Rice is the heart of a delicious meal for billions across the globe.
                Ripuraj Agro Pvt Ltd has been dedicated to rice and paddy production.
                Our passion has marked our journey for supporting local farmers in Bihar
                and pioneering organic agriculture practices. Our commitment to quality
                and sustainability has made us a trusted name in Bihar and beyond.
              </p>

              {/* Features */}
              <div className="mt-8 space-y-6">
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
                    ✔
                  </div>
                  <div>
                    <p className="font-bold text-[#2C5F7F]">
                      100% Guaranteed Organic Product
                    </p>
                    <p className="text-sm text-[#555]">
                      Use of Organic paddy
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
                    ✔
                  </div>
                  <div>
                    <p className="font-bold text-[#2C5F7F]">
                      Zero hand touch production
                    </p>
                    <p className="text-sm text-[#555]">
                      We use pure gangetic basin water in production
                    </p>
                  </div>
                </div>
              </div>

              <button className="mt-10 rounded-xl bg-[#2C5F7F] px-10 py-3.5 font-semibold text-white">
                SHOP NOW
              </button>
            </div>
          </div>

          {/* RIGHT – 45% */}
          <div className="col-span-12 lg:col-span-5 flex items-stretch">
            <div className="ml-0 lg:-ml-10 w-full mt-6">
              <div className="h-[95%] rounded-[22px] bg-white p-3 shadow-2xl">
                <div className="relative h-full overflow-hidden rounded-[18px]">
                  <Image
                    src="/rice-products.jpg"
                    alt="Ripuraj Rice Products"
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RipurajHero;
