import Bannermain from "../component/global/Banner";

export default function ShippingPolicyPage() {
  return (
    <>
      <Bannermain backgroundImg="/aboutbanner.png" title="Shipping Policy" />

      <section className="py-16 md:py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-[#2f5f73] mb-6">
            Shipping Policy
          </h1>

          <p className="text-gray-700 text-[15px] leading-relaxed mb-4">
            At Ripuraj Private Ltd, we collaborate with multiple trusted
            courier partners to ensure efficient shipping across India.
            Currently, we offer standard shipping services. Delivery
            typically takes up to 10 days, depending on your location.
          </p>

          <p className="text-gray-700 text-[15px] leading-relaxed mb-4">
            Please note that we only accept orders within India.
          </p>

          <p className="text-gray-700 text-[15px] leading-relaxed">
            Ripuraj Private Ltd reserves the right to cancel any order within
            48 hours of placement.
          </p>
        </div>
      </section>
    </>
  );
}
