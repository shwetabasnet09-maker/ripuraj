import React from 'react'
import Bannermain from '../component/gobal/Banner'
import Welcomediv from '../component/about/WelcomeSection'
import WhatWeDo from '../component/about/Whatwedo'
import WhyChooseUs from '../component/about/Whychooseus'
import MissionVision from '../component/about/MissionVision'
import MessageCard from '../component/about/MessageCard'
import Achievements from '../component/about/Achievements'

const page = () => {
  return (
    <div>
       <Bannermain backgroundImg=" " title="About Us" />
       <Welcomediv/>
       <WhatWeDo/>
       <WhyChooseUs/>
       <MissionVision/>
       <MessageCard/>
       <Achievements/>
      

    </div>
  )
}

export default page