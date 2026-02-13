export default function Trustdiv() {
  const features = [
    {
      id: 1,
      title: "Premium Grain Choice",
      icon: (
        <svg className="w-20 h-20 text-teal-700" viewBox="0 0 100 100" fill="none" stroke="currentColor">
          <path d="M30 50 Q35 30, 50 30 Q65 30, 70 50" strokeWidth="2"/>
          <path d="M30 50 Q35 70, 50 70 Q65 70, 70 50" strokeWidth="2"/>
          <circle cx="50" cy="50" r="25" strokeWidth="2.5"/>
          <text x="50" y="55" textAnchor="middle" fontSize="12" fontWeight="bold">PREMIUM</text>
        </svg>
      ),
    },
    {
      id: 2,
      title: "Best Parboiled Rice",
      icon: (
        <svg className="w-20 h-20 text-teal-700" viewBox="0 0 100 100" fill="none" stroke="currentColor">
          <ellipse cx="50" cy="65" rx="25" ry="15" strokeWidth="2"/>
          <path d="M25 65 Q50 35 75 65" strokeWidth="2"/>
        </svg>
      ),
    },
    {
      id: 3,
      title: "India's No. 1 Rice in Non-Basmati Segment",
      icon: (
        <svg className="w-20 h-20 text-teal-700" viewBox="0 0 100 100" fill="none" stroke="currentColor">
          <text x="50" y="65" textAnchor="middle" fontSize="36" fontWeight="bold">1</text>
        </svg>
      ),
    },
    {
      id: 4,
      title: "Lakhs of Happy Customers",
      icon: (
        <svg className="w-20 h-20 text-teal-700" viewBox="0 0 100 100" fill="none" stroke="currentColor">
          <circle cx="50" cy="45" r="12" strokeWidth="2"/>
          <path d="M30 80 Q50 60 70 80" strokeWidth="2"/>
        </svg>
      ),
    },
  ];

  return (
    <div className="py-20 bg-white px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-teal-900 mb-4">
            Trusted by Millions, Perfected Over Decades
          </h2>
          <p className="text-gray-700 max-w-4xl mx-auto text-lg">
            Ripuraj, a trusted name for over 46 years. With lakhs of happy customers,
            our commitment to quality shines in every grain.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item) => (
            <div
              key={item.id}
              className="h-[340px] bg-white rounded-xl overflow-hidden shadow-sm border"
            >
              {/* Top div */}
              <div className="h-[60%] flex items-center justify-center">
                {item.icon}
              </div>

              {/* Bottom div */}
              <div className="h-[40%] bg-gradient-to-b from-[#0F4C5C] to-[#0A3C4A] flex items-center justify-center px-6">
                <h3 className="bg-gradient-to-b from-[#1D5D40] to-[#3ABA7F] text-white text-center font-bold text-[18px] leading-snug py-6 px-3 rounded-[10px] w-[95%]">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
