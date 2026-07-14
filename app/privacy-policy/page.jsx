import Bannermain from "../component/global/Banner";

const sections = [
  {
    title: "Consent",
    body: "By using our website, you hereby consent to our Privacy Policy and agree to its terms.",
  },
  {
    title: "Information we collect",
    body: "The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.\n\nIf you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.\n\nWhen you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.",
  },
  {
    title: "How we use your information",
    body: "We use the information we collect in various ways, including to:",
    list: [
      "Provide, operate, and maintain our website",
      "Improve, personalize, and expand our website",
      "Understand and analyze how you use our website",
      "Develop new products, services, features, and functionality",
      "Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes",
      "Send you emails",
      "Find and prevent fraud",
    ],
  },
  {
    title: "Log Files",
    body: "Ripuraj Agro follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.",
  },
  {
    title: "Advertising Partners Privacy Policies",
    body: "You may consult this list to find the Privacy Policy for each of the advertising partners of Ripuraj Agro. Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on Ripuraj Agro, which are sent directly to users' browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.\n\nNote that Ripuraj Agro has no access to or control over these cookies that are used by third-party advertisers.",
  },
  {
    title: "Third Party Privacy Policies",
    body: "Ripuraj Agro's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.\n\nYou can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers' respective websites.",
  },
  {
    title: "CCPA Privacy Rights (Do Not Sell My Personal Information)",
    body: "Under the CCPA, among other rights, California consumers have the right to:",
    list: [
      "Request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.",
      "Request that a business delete any personal data about the consumer that a business has collected.",
      "Request that a business that sells a consumer's personal data, not sell the consumer's personal data.",
    ],
    footer:
      "If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.",
  },
  {
    title: "GDPR Data Protection Rights",
    body: "We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:",
    list: [
      "The right to access – You have the right to request copies of your personal data. We may charge you a small fee for this service.",
      "The right to rectification – You have the right to request that we correct any information you believe is inaccurate. You also have the right to request that we complete the information you believe is incomplete.",
      "The right to erasure – You have the right to request that we erase your personal data, under certain conditions.",
      "The right to restrict processing – You have the right to request that we restrict the processing of your personal data, under certain conditions.",
      "The right to object to processing – You have the right to object to our processing of your personal data, under certain conditions.",
      "The right to data portability – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.",
    ],
    footer:
      "If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.",
  },
  {
    title: "Children's Information",
    body: "Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.\n\nRipuraj Agro does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <Bannermain backgroundImg="/aboutbanner.png" title="Privacy Policy" />

      <section className="py-16 md:py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-[#2f5f73] mb-6">
            Read Our Privacy and Policy
          </h1>

          <p className="text-gray-700 text-[15px] leading-relaxed mb-4">
            At Ripuraj Agro, accessible from{" "}
            <a
              href="https://www.ripurajagro.com"
              className="text-[#2f5f73] font-medium hover:underline"
            >
              https://www.ripurajagro.com
            </a>
            , one of our main priorities is the privacy of our visitors. This
            Privacy Policy document contains types of information that is
            collected and recorded by Ripuraj Agro and how we use it. If you
            have additional questions or require more information about our
            Privacy Policy, do not hesitate to contact us.
          </p>

          <p className="text-gray-700 text-[15px] leading-relaxed mb-12">
            This Privacy Policy applies only to our online activities and is
            valid for visitors to our website with regards to the information
            that they shared and/or collect in Ripuraj Agro. This policy is
            not applicable to any information collected offline or via
            channels other than this website.
          </p>

          <div className="space-y-10">
            {sections.map((section, i) => (
              <div key={i}>
                <h2 className="text-lg md:text-xl font-bold text-[#1a1a1a] mb-3">
                  {section.title}
                </h2>

                {section.body.split("\n\n").map((para, j) => (
                  <p
                    key={j}
                    className="text-gray-700 text-[15px] leading-relaxed mb-3"
                  >
                    {para}
                  </p>
                ))}

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

                {section.footer && (
                  <p className="text-gray-700 text-[15px] leading-relaxed">
                    {section.footer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
