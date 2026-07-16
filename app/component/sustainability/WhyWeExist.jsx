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
            A Farmer's Problem. A Founder's Answer.
          </h2>

          <p className="text-white/90 text-[15px] mt-2 leading-6">
            The story of Ripuraj Agro begins not in a boardroom, but in the
            paddy fields of East Champaran — where farmers had no reliable
            buyer for their harvest.
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
                "The absence of an industry in this region to assist the farmer
                sell his crop in a timely manner was missing — and that is what
                prompted me to start Ripuraj Agro. With a background of more
                than three decades of farming experience, we produce some of the
                best rice varieties in the country."
              </p>

            </div>

            {/* Tags */}

            <div className="flex flex-wrap gap-4 mt-10">

              <span className="bg-[#3F6C84] text-white rounded-full px-5 py-2">
                3 decades farming background
              </span>

              <span className="bg-[#3F6C84] text-white rounded-full px-5 py-2">
                East Champaran native
              </span>

              <span className="bg-[#3F6C84] text-white rounded-full px-5 py-2">
                Founded Raxaul, 2010
              </span>

            </div>

          </div>

          {/* Right Cards */}

          <div className="space-y-3">

            <InfoCard
              icon={<ClipboardList size={34} />}
              title="Transparency in every grain"
              description="Full transparency in our food sourcing process—from which farm the paddy came, to how it was milled, to what the lab results said. We share because we have nothing to hide."
            />

            <InfoCard
              icon={<Users size={34} />}
              title="Connecting with our heritage"
              description="Ripuraj is not a new brand pivoting to sustainability. Our roots in Bihar's Gangetic plains go back decades—the farming knowledge, the land, and the community are our foundation."
            />

            <InfoCard
              icon={<Handshake size={34} />}
              title="Committed to conscious action"
              description="From organic paddy and Gangetic water to zero hand-touch production—every operational choice reflects our belief that how rice is made matters as much as how it tastes."
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