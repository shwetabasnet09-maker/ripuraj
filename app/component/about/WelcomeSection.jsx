import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Handshake } from "lucide-react";

const RipurajHero = () => {
  return (
    <div className="w-full bg-[#F6F0DE] py-20">
      <div className="mx-auto max-w-7xl px-4">

        <div className="overflow-hidden rounded-[42px] grid grid-cols-12 items-stretch">

          {/* LEFT */}
          <div className="col-span-12 lg:col-span-7 bg-[#2F657C] px-8 md:px-14 py-14 text-white relative">

            {/* Top Badge */}
            <div className="inline-block rounded-full bg-[#F6E7C8] px-2 py-1 text-[15px]  text-black">
              WELCOME TO RIPURAJ AGRO
            </div>

            {/* Heading */}
            <h2 className="mt-5 text-[30px]  leading-[1.1] font-extrabold">
              Over 46+ Years of Cultivating
              <br />
              Quality and Excellence
            </h2>

            {/* Description */}
            <p className="mt-6 max-w-[560px] text-[15px]  text-[#E8EEF2]">
              Rice is the heart of a delicious meal for billions across the globe.
              Ripuraj Agro Pvt Ltd has been dedicated to rice and paddy production.
              Our passion has marked our journey for supporting local farmers in Bihar
              and pioneering organic agriculture practices. Our commitment to quality
              and sustainability has made us a trusted name in Bihar and beyond.
            </p>

           

            

            {/* Bottom Illustration Icon */}
            <div className="absolute bottom-0 left-4 opacity-30">
              <Image
                src="/Farmer .png"
                alt="Farmer Illustration"
                width={140}
                height={140}
                className="object-contain"
              />
            </div>
          </div>

          {/* RIGHT */}
          <div className="col-span-12 lg:col-span-5 relative min-h-[500px]">
            <Image
              src="/aboutus.png"
              alt="Ripuraj Rice Products"
              fill
              priority
              className="object-cover"
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default RipurajHero;