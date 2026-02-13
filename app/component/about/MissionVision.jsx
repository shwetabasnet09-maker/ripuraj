import { Target, Eye } from "lucide-react";

const MissionVision = () => {
  return (
    <div className="bg-[#fff4dc] py-16 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Heading */}
        <h2 className="text-center text-3xl md:text-4xl font-semibold text-[#2f5f73] mb-3">
          Our Mission & Vision
        </h2>

        <p className="text-center max-w-3xl mx-auto text-gray-600 text-sm md:text-base mb-16">
          To produce safe, pure, and high-quality rice using modern technology
          and responsible sourcing, ensuring consistent taste and customer
          satisfaction.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* Vision */}
          <div className="relative bg-[#2f5f73] text-white rounded-2xl px-8 pt-16 pb-10 shadow-lg">
            
            {/* Icon */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white w-16 h-16 rounded-full flex items-center justify-center shadow-md">
              <Eye className="text-[#2f5f73] w-7 h-7" />
            </div>

            <h3 className="text-center text-2xl font-semibold mb-4">
              Vision
            </h3>

            <p className="text-sm leading-relaxed text-gray-100 text-center">
              We aspire to be an organization that continuously invests in
              manufacturing capabilities to enhance automation, infrastructure,
              and facilities, ensuring we consistently meet our high standards
              for quality produce. To preserve and enrich the legacy of both
              non-Basmati and Basmati rice in India, we maintain the genetic
              integrity of seeds. We promote the adoption of scientifically
              agricultural practices and advanced rice processing technologies
              among farmers, aiming to set the industry benchmark for product
              quality and customer service. Our goal is to be recognized by
              consumers as a premier Basmati rice manufacturer known for
              consistent quality.
            </p>
          </div>

          {/* Mission */}
          <div className="relative bg-[#2f5f73] text-white rounded-2xl px-8 pt-16 pb-10 shadow-lg">
            
            {/* Icon */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white w-16 h-16 rounded-full flex items-center justify-center shadow-md">
              <Target className="text-[#2f5f73] w-7 h-7" />
            </div>

            <h3 className="text-center text-2xl font-semibold mb-4">
              Mission
            </h3>

            <p className="text-sm leading-relaxed text-gray-100 text-center">
              We aim to ensure stable and sustainable rice production with
              minimal environmental impact and adaptation to climate change.
              Our goal is to enhance the nutrition and health of both rice
              consumers and farmers. We are committed to equitable access to
              information and fostering the development of future rice
              scientists. Our mission includes aggressively marketing and
              manufacturing non-Basmati and Basmati rice to become a top-three
              brand in India and a leading exporter. We emphasize private
              labeling, process customization, and packaging.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MissionVision;
