import Image from "next/image";

const MessageCard = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Main Wrapper */}
        <div className="bg-[#efe4cf] rounded-[30px] overflow-hidden flex flex-col lg:flex-row">
          
          {/* LEFT CONTENT */}
          <div className="flex-1 p-8 md:p-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 leading-tight">
              <span className="text-black">Leadership & </span>
              <span className="text-[#3b6780]">Legacy</span>
            </h2>

            <div className="space-y-6 text-[#2b2b2b]  text-[15px] leading-relaxed">
              <p>
                Mr. Rameshwar Prasad Gupta is a seasoned businessman with nearly
                three decades of hands-on experience in building and scaling
                successful ventures. His journey began in Raxaul with a modest
                auto repair business under M/s Gupta Diesel, where he worked
                closely with agriculture diesel engines, pump sets, and rice
                mill machinery parts. This early phase gave him strong technical
                knowledge along with a clear understanding of ground-level
                business operations.
              </p>

              <p>
                With a clear vision to grow, Mr. Gupta moved into the food
                processing industry by establishing the first rice mill unit
                under Ripuraj Agro Pvt. Ltd. (RAPL). What started as a single
                unit expanded over time through consistent efforts and practical
                decision-making. Today, RAPL operates three rice mill units,
                making it one of the prominent rice processing setups in the
                state.
              </p>

              <p>
                Currently, Mr. Gupta plays a key role in shaping the company’s
                direction. He is actively involved in major policy decisions and
                oversees overall operations, ensuring smooth functioning and
                consistent quality.
              </p>
            </div>
          </div>

          {/* RIGHT IMAGE SECTION */}
           <div className="lg:w-[30%] relative flex flex-col justify-end bg-[#e9edf0]">
            
            {/* IMAGE */}
            <div className="w-full h-[380px] lg:h-[450px] overflow-hidden">
              <Image
                src="/md.png"
                alt="Managing Director"
                width={500}
                height={600}
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* BOTTOM NAME BAR */}
            <div className="bg-[#2f6178] px-6 py-4 text-white">
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