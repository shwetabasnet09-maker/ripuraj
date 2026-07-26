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
            <div className="inline-block rounded-full bg-[#F6E7C8] font-medium px-2 py-1 text-[15px]  text-black">
              WELCOME TO RIPURAJ AGRO
            </div>

            {/* Heading */}
            <h2 className="mt-4 md:text-[35px] text-[25px]  leading-[1.1] font-extrabold">
            The Story Behind<br></br>Every Grain of Ripuraj

            </h2>

            {/* Description */}
            <p className="mt- max-w-140 text-[15px]  text-[#E8EEF2]">
            For over 46 years, Ripuraj Agro has been growing with the people who grow our food. Through strong farmer partnerships, advanced milling technology, and a relentless focus on quality, we continue to deliver rice that families proudly serve every day

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