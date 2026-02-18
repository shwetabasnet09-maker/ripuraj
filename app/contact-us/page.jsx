import React from 'react'
import Bannermain from '../component/gobal/Banner'
import ContactSection from '../component/contact/Form'
import RipurajContactPage from '../component/contact/RipurajContactPage'
import ContactFooter from '../component/contact/RipurajContactPage'
import MapEmbed from '../component/contact/Map'

const page = () => {
  return (
    <div>
        <Bannermain
        backgroundImg="/aboutbanner.png"
        title="Contact Us"
      />
      <ContactSection/>
      <ContactFooter/>
      <MapEmbed/>
      
    </div>
  )
}

export default page