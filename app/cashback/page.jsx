import Image from "next/image";
import Link from "next/link";
import ClaimCashback from "../component/cashback/ClaimCashback";
import CashbackSteps from "../component/cashback/CashbackSteps";
import CashbackFaq from "../component/cashback/CashbackFaq";

const CashbackPage = () => {
  return (
    <main>
      {/* Hero Banner */}
      <div className="relative h-125 sm:h-150 md:h-175] lg:h-194 overflow-hidden">
        
        {/* Background image */}
        <Image
          src="/CashbackBg.png"
          alt=""
          fill
          className="object-cover"
          priority
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full items-center">
            
            {/* LEFT CONTENT */}
            <div className="text-white text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[65px] font-extrabold leading-tight">
                GET MORE BACK
              </h1>

              <p className="mt-3 text-sm sm:text-base md:text-[18px] lg:text-[20px] text-white/90 max-w-md mx-auto lg:mx-0">
                Win Upto Rs 1000 CASHBACK on Every 5 Kg Pack
                of Ripuraj Sonashakti
              </p>

              <Link
                href="/shop"
                className="mt-6 inline-block bg-white text-[#2f5f73] font-bold px-6 sm:px-8 py-2.5 sm:py-3 rounded-md hover:bg-gray-100 transition-colors text-sm sm:text-base"
              >
                SHOP NOW
              </Link>
            </div>

            {/* RIGHT VISUAL - single grouped image (product + badge + model) */}
            <div className="relative h-full flex items-center justify-center">
              
            </div>
          </div>
        </div>
      </div>

      {/* Claim Your Cashback Section */}
      <ClaimCashback />
      <CashbackSteps />
      <CashbackFaq />
      

      {/* Rest of your cashback page content goes below */}
    </main>
  );
};

export default CashbackPage;