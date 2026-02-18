import React from 'react'
import CSRSection from '../component/csr/CSRSection'
import Bannermain from '../component/gobal/Banner'
import GallerySection from '../component/csr/GallerySection'

const page = () => {
  return (
    <div>
        <Bannermain
        backgroundImg="/aboutbanner.png"
        title="CSR Activity"
      />
        <CSRSection/>
        <GallerySection/>
    </div>
  )
}

export default page