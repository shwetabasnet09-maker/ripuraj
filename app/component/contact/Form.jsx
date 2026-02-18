import React from 'react';
import { Phone, MapPin, Mail } from 'lucide-react';

const RipurajContactPage = () => {
  return (
    <div className="min-h-screen bg-white p-4 md:p-10 space-y-10 font-sans">
      
      {/* SECTION 1: CONTACT FORM & INFO */}
      <div className="flex flex-col md:flex-row w-full max-w-7xl mx-auto rounded-[50px] overflow-hidden bg-[#FFF5E1]">
        
        {/* Left Side: Dark Blue Form */}
        <div className="bg-[#2D5A71] p-8 md:p-14 w-full md:w-[55%] rounded-[50px]">
          <div className="mb-8">
            <h3 className="text-white text-sm font-semibold tracking-widest uppercase mb-2">
              HAVE QUESTIONS?
            </h3>
            <h2 className="text-white text-5xl font-bold">
              Leave A Message
            </h2>
          </div>

          <form className="space-y-5">
            <div>
              <label className="text-gray-300 text-sm mb-2 block ml-1">Name</label>
              <input type="text" className="w-full p-4 rounded-2xl bg-[#BDE0EB] border-none focus:ring-2 focus:ring-white outline-none" />
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <label className="text-gray-300 text-sm mb-2 block ml-1">Email</label>
                <input type="email" className="w-full p-4 rounded-2xl bg-[#BDE0EB] border-none focus:ring-2 focus:ring-white outline-none" />
              </div>
              <div className="flex-1">
                <label className="text-gray-300 text-sm mb-2 block ml-1">Phone</label>
                <input type="text" className="w-full p-4 rounded-2xl bg-[#BDE0EB] border-none focus:ring-2 focus:ring-white outline-none" />
              </div>
            </div>

            <div>
              <label className="text-gray-300 text-sm mb-2 block ml-1">Select State</label>
              <input type="text" className="w-full p-4 rounded-2xl bg-[#BDE0EB] border-none focus:ring-2 focus:ring-white outline-none" />
            </div>

            <div>
              <label className="text-gray-300 text-sm mb-2 block ml-1">Message Us</label>
              <textarea rows={4} className="w-full p-4 rounded-2xl bg-[#BDE0EB] border-none focus:ring-2 focus:ring-white outline-none resize-none" />
            </div>

            <button className="w-full bg-white text-[#2D5A71] font-bold py-4 rounded-xl mt-4 text-lg hover:bg-opacity-90 transition-all">
              Submit Here
            </button>
          </form>
        </div>

        {/* Right Side: Contact Info */}
        <div className="p-8 md:p-14 w-full md:w-[45%] flex flex-col justify-center">
          <h2 className="text-[#2D5A71] text-4xl font-bold mb-4">Contact Information</h2>
          <p className="text-[#2D5A71] opacity-80 mb-12 text-lg leading-snug">
            We are a happy service by compiling each piece of rice and delivering pearl with faith
          </p>

          <div className="space-y-10">
            <div className="flex items-start gap-5">
              <Phone className="text-[#2D5A71] w-8 h-8" />
              <div>
                <h4 className="font-bold text-[#2D5A71] text-xl">Hotline</h4>
                <p className="text-[#2D5A71] text-lg">+91 9905555666</p>
              </div>
            </div>

            <div className="flex items-start gap-5">
              <MapPin className="text-[#2D5A71] w-8 h-8" />
              <div>
                <h4 className="font-bold text-[#2D5A71] text-xl">Head Office</h4>
                <p className="text-[#2D5A71] text-lg leading-relaxed">
                  RIPURAJ AGRO PVT LTD NH-527D,<br />
                  Village Amodei Anchal, Ramgarhwa,<br />
                  District East Champaran Bihar - 845433
                </p>
              </div>
            </div>

            <div className="flex items-start gap-5">
              <Mail className="text-[#2D5A71] w-8 h-8" />
              <div>
                <h4 className="font-bold text-[#2D5A71] text-xl">Official Email</h4>
                <p className="text-[#2D5A71] text-lg">sales@ripurajagro.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

     
    </div>
  );
};

export default RipurajContactPage;