import Image from "next/image";

const CashbackSteps = () => {
  return (
    <section className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 overflow-hidden">
      {/* Background image */}
      <Image
        src="/CashbackBg.webp"
        alt=""
        fill
        className="object-cover"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">
          
          {/* LEFT CONTENT */}
          <div className="text-white text-center lg:text-left">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-extrabold leading-tight">
              CASHBACK <span className="font-bold">कैसे पाएं</span>{" "}
              <span className="font-extrabold">?</span>
            </h2>

            <div className="w-16 sm:w-20 h-1 bg-white/80 rounded-full my-4 sm:my-5 mx-auto lg:mx-0" />

            <ol className="space-y-3 sm:space-y-4 text-sm sm:text-base md:text-lg font-medium text-left max-w-md mx-auto lg:mx-0">
              <li>
                <span className="font-bold">1.</span> किसी भी App से QR Code
                Scan करें।
              </li>
              <li>
                <span className="font-bold">2.</span> अपना Mobile Number &
                OTP भरकर Registration करें।
              </li>
              <li>
                <span className="font-bold">3.</span> अपनी UPI ID डालें और
                Cashback सीधे Bank Account में पाएं।
              </li>
            </ol>
          </div>

          {/* RIGHT VISUAL */}
          <div className="relative h-[220px] sm:h-[300px] md:h-[360px] lg:h-[400px] flex items-center justify-center">
            <div className="relative w-full max-w-full sm:max-w-full md:max-w-[400px] h-full">
              <Image
                src="/Product.png"
                alt="Ripuraj product"
                fill
                className="object-contain drop-shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CashbackSteps;