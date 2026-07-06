import Image from "next/image";

const ClaimCashback = () => {
  return (
    <section className="relative py-16 px-4 bg-white overflow-hidden">
      {/* Decorative corner icons */}
      <Image
        src="/leftpea.png"
        alt=""
        width={110}
        height={110}
        className="absolute top-0 left-0 opacity-80 pointer-events-none"
      />
      <Image
        src="/rightpea.png"
        alt=""
        width={110}
        height={110}
        className="absolute top-0 right-0 opacity-80 pointer-events-none"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Heading */}
        <h2 className="text-center text-3xl md:text-4xl font-bold text-[#1e3a4c] mb-12">
          Claim Your Cashback
        </h2>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          
          {/* Step 1 */}
          <div className="bg-[#f0f0f0] rounded-2xl p-8 flex flex-col items-center justify-between h-full">
            <div className="relative w-91 h-55 flex items-center object-cover justify-center">
              <Image
                src="/Sonashakti.png"
                alt="Ripuraj Sonashakti 5kg pack"
                width={160}
                height={200}
                className="object-contain w-full h-[200px]"
              />
            </div>
            <p className="text-center text-[#1e3a4c] font-semibold mt-3">
              Buy a 5kg Pack Of
              <br />
              Ripuraj Sonashakti
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-[#f0f0f0] rounded-2xl p-8 flex flex-col items-center justify-between h-full">
            <div className="w-40 h-40 border-2 border-[#c9a86a] rounded-xl flex items-center justify-center p-2 bg-white">
              <Image
                src="/qr.webp"
                alt="Scan QR code"
                width={160}
                height={160}
                className="object-contain w-full h-full"
              />
            </div>
            <p className="text-center text-[#1e3a4c] font-semibold mt-6">
              Scan the code &
              <br />
              Enter mobile no. & OTP
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-[#f0f0f0] rounded-2xl p-8 flex flex-col items-center justify-between h-full">
            <div className="w-40 h-40 bg-white rounded-xl flex items-center justify-center shadow-sm">
              <Image
                src="/Upi.webp"
                alt="UPI"
                width={130}
                height={70}
                className="object-contain"
              />
            </div>
            <p className="text-center text-[#1e3a4c] font-semibold mt-6">
              Enter UPI ID and Receive
              <br />
              Cashback
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ClaimCashback;