import Bannermain from "../component/global/Banner";
import SustainabilityIntro from "../component/sustainability/SustainabilityIntro";
import WhyWeExist from "../component/sustainability/WhyWeExist";
import WhatWeDo from "../component/sustainability/What we do";
import Achievements from "../component/sustainability/Achievements";

const SustainabilityPage = () => {
  return (
    <>
      <Bannermain
        backgroundImg="/About%20Banner.webp"
        title="Sustainability"
      />

      <SustainabilityIntro />
      <WhyWeExist />
      <WhatWeDo />
      <Achievements />
      

      {/* Rest of the page content goes below */}
    </>
  );
};

export default SustainabilityPage;
