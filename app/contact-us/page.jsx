import React from 'react'
import Bannermain from '../component/global/Banner'
import ContactSection from '../component/contact/Form'
import ContactFooter from '../component/contact/RipurajContactPage'
import MapEmbed from '../component/contact/Map'

const page = () => {
  return (
    <div>
        <Bannermain
        backgroundImg="/About%20Banner.webp"
        title="Contact Us"
      />
      <ContactSection/>
      <ContactFooter/>
      <MapEmbed/>
      
    </div>
  )
}

export default page
