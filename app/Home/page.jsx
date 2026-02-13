import React from 'react'

import ProductCarousel from '../component/home/Shop'
import About from '../component/home/about'
import RipurajProductsSwiper from '../component/home/products'
import Video from '../component/home/video'
import Factories from '../component/home/factories'
import Banner from '../component/home/banner'
import Testimonial from '../component/home/Testimonial'
import Faq from '../component/home/Faq'

import TrustBadges from '../component/gobal/TrustBadges'
import Herodiv from '../component/home/Herosection'
import Trustdiv from '../component/home/TrustSection'

const Home = () => {
  return (
    <div className=''>
        <Herodiv/>
        <ProductCarousel/>
        <About/>
        <RipurajProductsSwiper/>
        <Video/>
        <Factories/>
        <Banner/>
        <Testimonial/>
        <Faq/>
        <Trustdiv/>
        
        
    </div>
  )
}

export default Home