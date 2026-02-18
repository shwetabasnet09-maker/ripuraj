import React from 'react';

const ContactFooter = () => {
  return (
    <div className="w-full p-4 md:p-8 bg-white">
      {/* Main Container - Background hex updated for exact match */}
      <div className="bg-[#325a67] text-white rounded-[40px] p-10 md:p-14 flex flex-col md:flex-row justify-between gap-12 font-sans">
        
        {/* Registered Office Column */}
        <div className="flex-1">
          <h2 className="text-sm tracking-[0.2em] font-light mb-5 text-gray-300">
            REGISTERED OFFICE
          </h2>
          <h3 className="text-lg font-bold mb-3 tracking-wide">
            RIPURAJ AGRO PVT LTD
          </h3>
          <p className="text-[14px] leading-relaxed text-gray-200 font-light max-w-xs">
            Flat No. 101, Block-A, Ara-Mathiani<br />
            Apartment, Near Brindavan Nursing Home,<br />
            Exhibition Road, Patna, Bihar 800001
          </p>
        </div>

        {/* Manufacturing Unit Column */}
        <div className="flex-1">
          <h2 className="text-sm tracking-[0.2em] font-light mb-5 text-gray-300">
            MANUFACTURING UNIT
          </h2>
          <h3 className="text-lg font-bold mb-3 tracking-wide">
            RIPURAJ AGRO PVT LTD
          </h3>
          <p className="text-[14px] leading-relaxed text-gray-200 font-light max-w-xs">
            NH-527D, Village Amodei Anchal<br />
            Ramgarhwa, District East Champaran<br />
            Bihar 845433
          </p>
        </div>

        {/* Official Contacts Column */}
        <div className="flex-1">
          <h2 className="text-sm tracking-[0.2em] font-light mb-5 text-gray-300">
            OFFICIAL CONTACTS
          </h2>
          <div className="space-y-1.5 text-[14px] text-gray-200 font-light">
            <p className="flex gap-2">
              <span className="font-normal">Email</span>
              <a href="mailto:ripuraman@ripurajagro.com" className="hover:text-white transition-colors">ripuraman@ripurajagro.com</a>
            </p>
            <p className="flex gap-2">
              <span className="font-normal">Sales</span>
              <a href="mailto:sales@ripurajagro.com" className="hover:text-white transition-colors">sales@ripurajagro.com</a>
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
    </div>
  );
};

export default ContactFooter;