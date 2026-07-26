import {
  ClipboardList,
  Users,
  Handshake,
} from "lucide-react";

export default function WhyWeExist() {
  return (
    <section className="bg-[#3F6C84] py-14">
      <div className="container mx-auto px-4">

        {/* Heading */}
        <div className="text-center max-w-4xl mx-auto">

          <span className="inline-block bg-white text-[#3F6C84] font-medium px-8 py-2 rounded-full tracking-wide">
            WHY WE EXIST
          </span>

          <h2 className="text-[35px] font-bold text-white mt-2">
          Built on Farmers' Trust. Grown Through Quality.
          </h2>

          <p className="text-white/90 text-[15px] mt-2 leading-6">
          Ripuraj Agro was founded with a simple purpose—to create lasting value for farmers while delivering exceptional rice to families across India. Every decision we make is guided by quality, integrity, and the belief that great rice begins long before it reaches the table.
          </p>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-12 mt-10">

          {/* Founder Card */}
          <div className="bg-white rounded-[35px] p-10">

            {/* Profile */}
            <div className="flex items-center gap-5">

              <img
                src="/Md Sir.png"
                alt="Founder"
                className="w-20 h-20 rounded-full object-cover"
              />

              <div>
                <h3 className="text-[22px] font-bold">
                  Rameshwar Prasad Gupta
                </h3>

                <p className="text-[15px] mt-0">
                  Founder · Ripuraj Agro Pvt. Ltd.
                </p>
              </div>

            </div>

            {/* Quote */}

            <div className="border-l-4 border-[#3F6C84] pl-6 mt-10">

              <p className="text-gray-700 leading-5 text-[14px]">
                "Ripuraj was built with the belief that when farmers are respected and quality is never compromised, trust naturally follows. That belief continues to guide us every single day.
                "
              </p>

            </div>

            {/* Tags */}

            <div className="flex flex-wrap gap-4 mt-10">

              <span className="bg-[#3F6C84] text-white rounded-full px-5 py-2">
              Rooted in Agriculture
              </span>

              <span className="bg-[#3F6C84] text-white rounded-full px-5 py-2">
              Farmer First Approach
              </span>

              <span className="bg-[#3F6C84] text-white rounded-full px-5 py-2">
              Proudly from East Champaran
              </span>

            </div>

          </div>

          {/* Right Cards */}

          <div className="space-y-3">

            <InfoCard
              icon={<ClipboardList size={34} />}
              title="Quality Without Compromise"
              description="From sourcing the finest paddy to maintaining rigorous quality standards, every grain reflects our commitment to excellence"
            />

            <InfoCard
              icon={<Users size={34} />}
              title="Growing Together"
              description="Our success is deeply connected to the farmers, partners, and communities who have been part of the Ripuraj journey."
            />

            <InfoCard
              icon={<Handshake size={34} />}
              title="Always Looking Ahead"
              description="While our roots remain strong, we continue to invest in innovation, modern infrastructure, and sustainable growth to serve future generations."
            />

          </div>

        </div>

      </div>
    </section>
  );
}

function InfoCard({ icon, title, description }) {
  return (
    <div className="border border-white rounded-[28px] p-5 flex gap-5">

      <div className="w-[60px] h-[60px] bg-white rounded-2xl flex items-center justify-center text-[#3F6C84] flex-shrink-0">
        {icon}
      </div>

      <div>

        <h3 className="text-white text-[22px] font-semibold">
          {title}
        </h3>

        <p className="text-white/90 text-[14px] mt-0 leading-5">
          {description}
        </p>

      </div>

    </div>
  );
}