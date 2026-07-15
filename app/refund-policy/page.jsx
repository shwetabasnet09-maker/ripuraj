import Bannermain from "../component/global/Banner";

const sections = [
  {
    title: "Exchanges and Returns",
    body: "To be eligible for an exchange or return, your item must be unused, in the same condition that you received it, and in its original packaging. The invoice must be provided at the time of return pickup. Items that have been used will not be eligible for exchange or return.\n\nExchanges and returns are allowed only in the following cases:",
    list: [
      "The product is damaged or you received the wrong item.",
      "The product is not sealed properly at the time of delivery.",
      "The product has expired by the time of delivery.",
    ],
    footer:
      "If your return is accepted, we will arrange a pickup from the same address, and you will be notified of the expected pick-up date. In case of an exchange, the new product will be delivered within 8-10 days after the return pickup.\n\nFor any delivery-related discrepancies, please reach out to us within 48 hours after the order has been marked as delivered.\n\nFor any quality issues, kindly contact us at +91 990 5555 666 or email us at sales@ripurajagro.com.",
  },
  {
    title: "Cancellation",
    body: "An order cancellation request will be accepted only if the product has not yet been shipped. If the cancellation request is accepted, you will receive a full refund.\n\nRipuraj Private Ltd reserves the right to cancel or refuse any order for various reasons, including but not limited to the non-availability of stock, pricing errors, informational errors, or issues identified with the personal/financial details provided by the customer.",
  },
  {
    title: "Refunds",
    body: "Once we receive and inspect your returned item, we will notify you of the approval or rejection of your refund. If approved, the refund will be processed to your original payment method within 7-10 days.\n\nFor any return-related questions, please contact us at sales@ripurajagro.com.",
  },
];

function ParagraphBlock({ text }) {
  return text.split("\n\n").map((para, i) => (
    <p key={i} className="text-gray-700 text-[15px] leading-relaxed mb-3">
      {para}
    </p>
  ));
}

export default function RefundPolicyPage() {
  return (
    <>
      <Bannermain backgroundImg="/aboutbanner.png" title="Refund and Returns Policy" />

      <section className="py-16 md:py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-[#2f5f73] mb-6">
            Refund Policy
          </h1>

          <p className="text-gray-700 text-[15px] leading-relaxed mb-12">
            At Ripuraj Private Ltd, we offer a 10-day exchange/return policy.
            You have 10 days from the date you receive your item to request a
            replacement or return. For exchanges or returns, please contact
            us at{" "}
            <a
              href="mailto:sales@ripurajagro.com"
              className="text-[#2f5f73] font-medium hover:underline"
            >
              sales@ripurajagro.com
            </a>
            .
          </p>

          <div className="space-y-10">
            {sections.map((section, i) => (
              <div key={i}>
                <h2 className="text-lg md:text-xl font-bold text-[#1a1a1a] mb-3">
                  {section.title}
                </h2>

                <ParagraphBlock text={section.body} />

                {section.list && (
                  <ul className="list-disc pl-5 space-y-2 mb-3">
                    {section.list.map((item, k) => (
                      <li
                        key={k}
                        className="text-gray-700 text-[15px] leading-relaxed"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                {section.footer && <ParagraphBlock text={section.footer} />}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
