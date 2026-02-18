import Image from "next/image";

const MessageCard = () => {
  return (
    <div className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Main Card */}
        <div className="bg-[#2f5f73] rounded-2xl p-6 md:p-10 flex flex-col lg:flex-row gap-10 items-center">

          {/* LEFT CONTENT */}
          <div className="flex-1 text-white">
            <p className="uppercase text-sm tracking-wider mb-4 opacity-90">
              Messages
            </p>

            <p className="text-sm leading-relaxed text-gray-100 mb-8">
              Mr. Rameshwar Prasad Gupta is a seasoned businessman and brings
              with him close to three decades of extensive business experience.
              Having started with a modest auto repair business under M/s
              Gupta Diesel at Raxaul dealing in agriculture diesel engines,
              pump sets and parts of rice mill machinery, Mr. Gupta later
              ventured into food processing industry by setting up a Rice
              Mill (Unit I) under Ripuraj Agro Pvt. Ltd. (RAPL). Mr. Gupta went
              on to undertake multiple expansions in the existing rice mill
              and today takes pride in having as many as 3 rice mill units
              running under RAPL, making it one of the biggest rice mills in
              the state. Mr. Gupta is responsible for various policy decisions
              of the Company and will be monitoring the overall project.
            </p>

            <p className="font-semibold uppercase">
              Rameshwar Prasad Gupta
            </p>
            <p className="text-sm text-gray-200">
              Managing Director
            </p>
          </div>

          {/* RIGHT IMAGE */}
          <div className="flex-shrink-0  rounded-2xl p-4">
            <Image
              src="/md.png"   
              alt="Managing Director"
              width={300}
              height={600}
              className="rounded-xl object-cover"
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default MessageCard;
