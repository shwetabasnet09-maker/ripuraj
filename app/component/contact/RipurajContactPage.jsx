import React from "react";
import AnimateIn from "./AnimateIn";

const offices = [
  {
    label: "REGISTERED OFFICE",
    lines: [
      "Flat No - A101, Block-A,",
      "Ara Mathiani Apartment, Salim Ahra,",
      "Near Vrindavan Nursing Home,",
      "Exhibition Road, Patna-800001 (Bihar)",
    ],
    mobile: "+91 8210179608",
  },
  {
    label: "MANUFACTURING UNIT",
    lines: [
      "NH527D, Village-Amodei,",
      "Anchal-Ramgarhwa,",
      "District: East Champaran-845433",
    ],
    mobile: "+91 8084101296",
  },
  {
    label: "REGIONAL OFFICE (NORTH)",
    lines: [
      "Flat No - A503, 5th Floor, A Block,",
      "Tower Height Apartment,",
      "Near TV Tower, QD Block,",
      "Pitampura - 110034 (New Delhi)",
    ],
    email: "rahulraj@ripurajagro.com",
    mobile: "+91 7766916313",
  },
  {
    label: "REGIONAL OFFICE (NORTH-EAST)",
    lines: [
      "Flat No - A905, 9th Floor,",
      "Achyut SRKM Altair Apartment,",
      "Lokhra Road, Sawkuchi,",
      "Guwahati - 781034 (Assam)",
    ],
    email: "bishwadeep@ripuraj.com",
    mobile: "+91 8011368184",
  },
];

const ContactFooter = () => {
  return (
    <div className="w-full p-4 md:px-28 py-0 bg-white">
      <AnimateIn>
        <div className="bg-[#325a67] text-white rounded-[40px] p-10 md:p-14 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12 font-sans">
          {offices.map((office, i) => (
            <div
              key={i}
              className="transition-transform duration-300 hover:-translate-y-1"
            >
              <h2 className="text-sm tracking-[0.2em] font-light mb-5 text-gray-300">
                {office.label}
              </h2>
              <h3 className="text-[15px] font-bold mb-3 tracking-wide">
                RIPURAJ AGRO PRIVATE LIMITED
              </h3>
              <p className="text-[14px] leading-relaxed text-gray-200 font-light max-w-xs">
                {office.lines.map((line, j) => (
                  <React.Fragment key={j}>
                    {line}
                    {j < office.lines.length - 1 && <br />}
                  </React.Fragment>
                ))}
              </p>
              <div className="mt-3 space-y-1 text-[14px] text-gray-200 font-light">
                {office.email && (
                  <p className="flex gap-2">
                    <span className="font-normal">Email :</span>
                    <a
                      href={`mailto:${office.email}`}
                      className="hover:text-white transition-colors"
                    >
                      {office.email}
                    </a>
                  </p>
                )}
                {office.mobile && (
                  <p className="flex gap-2">
                    <span className="font-normal">Mobile :</span>
                    <a
                      href={`tel:${office.mobile.replace(/\s/g, "")}`}
                      className="hover:text-white transition-colors"
                    >
                      {office.mobile}
                    </a>
                  </p>
                )}
              </div>
            </div>
          ))}

          {/* Official Contacts Column */}
          <div className="transition-transform duration-300 hover:-translate-y-1">
            <h2 className="text-sm tracking-[0.2em] font-light mb-5 text-gray-300">
              OFFICIAL CONTACTS
            </h2>
            <div className="space-y-1.5 text-[14px] text-gray-200 font-light">
              <p className="flex gap-2">
                <span className="font-normal">Email</span>
                <a
                  href="mailto:ripuraman@ripurajagro.com"
                  className="hover:text-white transition-colors"
                >
                  ripuraman@ripurajagro.com
                </a>
              </p>
              <p className="flex gap-2">
                <span className="font-normal">Sales</span>
                <a
                  href="mailto:sales@ripurajagro.com"
                  className="hover:text-white transition-colors"
                >
                  sales@ripurajagro.com
                </a>
              </p>
              <p className="flex gap-2">
                <span className="font-normal">Landline</span>
                <span>0612 2323541</span>
              </p>
              <p className="flex gap-2">
                <span className="font-normal">Customer Care</span>
                <span>+91 9905555666</span>
              </p>
            </div>
          </div>
        </div>
      </AnimateIn>
    </div>
  );
};

export default ContactFooter;
