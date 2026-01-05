import React from 'react'
import Herosection from '../component/home/Herosection'
import ProductCarousel from '../component/home/Shop'
import About from '../component/home/about'
import RipurajProductsSwiper from '../component/home/products'
import Video from '../component/home/video'
import Factories from '../component/home/factories'
import Banner from '../component/home/banner'
import Testimonial from '../component/home/Testimonial'
import Faq from '../component/home/Faq'
import TrustSection from '../component/home/TrustSection'
import TrustBadges from '../component/home/TrustBadges'

const Home = () => {
  return (
    <div className=''>
        <Herosection/>
        <ProductCarousel/>
        <About/>
        <RipurajProductsSwiper/>
        <Video/>
        <Factories/>
        <Banner/>
        <Testimonial/>
        <Faq/>
        <TrustSection/>
        <TrustBadges/>
        
    </div>
  )
}

export default Home