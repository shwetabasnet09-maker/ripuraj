import Image from "next/image";

const MessageCard = () => {
  return (
    <section className="relative py-14 px-4 bg-white overflow-hidden">

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Main Wrapper */}
        <div className="bg-[#efe4cf] rounded-[30px] overflow-hidden flex flex-col lg:flex-row">

          {/* LEFT CONTENT */}
          <div className="flex-1 p-8 md:p-14">
            <h2 className="text-[35px]  font-bold mb-2   leading-tight">
              <span className="text-black">A Vision Rooted </span>
              <span className="text-[#3b6780]">in Purpose</span>
            </h2>

            <div className="space-y-0 text-[#000000] text-[15px] leading-relaxed">
              <p>
              When I started Ripuraj Agro, my vision was simple—to build a brand that would honour the hard work of our farmers and deliver rice that families could trust with confidence. What began as a small step has grown into a journey shaped by dedication, integrity, and an unwavering commitment to quality.
Over the years, we have continuously evolved by modern technology, strengthening our quality standards, and expanding our capabilities. 
At Ripuraj, we nurture relationships. With our farmers, who are the backbone of our journey. With our partners, who help us reach new markets. And with our customers, whose trust inspires us to keep raising our standards every single day.
As we continue to grow, our focus remains clear—to deliver the finest quality rice and proudly take the Ripuraj name to more homes across India and the world.
I extend my heartfelt gratitude to every customer, partner, employee, and farmer who has been a part of this journey. Your trust is our greatest strength, and we remain committed to earning it with every grain we deliver.



              </p>


            </div>
          </div>

          {/* RIGHT IMAGE SECTION */}
          <div className="lg:w-[45%] relative flex flex-col justify-end bg-[#e9edf0]">

            {/* IMAGE */}
            <div className="relative w-full h-95 lg:h-112.5">
              <Image
                src="/Message from MD.webp"
                alt="Managing Director"
                fill
                className="object-cover object-top"
              />
            </div>

            {/* BOTTOM NAME BAR */}
            <div className="bg-[#306177] px-6 py-4 text-[#FFF2D9]">
              <h3 className="text-lg lg:text-xl font-bold uppercase leading-snug">
                MR. RAMESHWAR PRASAD GUPTA
              </h3>

              <p className="text-[20px] text-[#FFF2D9] mt-1">
                Managing Director
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MessageCard;