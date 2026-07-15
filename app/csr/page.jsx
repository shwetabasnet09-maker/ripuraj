import React from 'react'
import CSRSection from '../component/csr/CSRSection'
import Bannermain from '../component/global/Banner'
import GallerySection from '../component/csr/GallerySection'

const page = () => {
  return (
    <div>
        <Bannermain
        backgroundImg="/About%20Banner.webp"
        title="CSR Activity"
      />
        <CSRSection/>
        <GallerySection/>
    </div>
  )
}

export default page