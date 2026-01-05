import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const About = () => {
  return (
    <div className='bg-[#FFF2D9] py-20'>
      <div className='wrapper mx-auto flex items-center gap-10'>
        {/* Text Section */}
        <div className='flex-1 justify-between'>
          <h3 className='text-[20px]'>WELCOME TO RIPURAJ AGRO</h3>
          <h2 className='text-[#306177] text-[35px] font-bold'>Over 46+ Years of Cultivating Quality and Excellence</h2>
          <p className='text-[17px] mt-4'>
            Rice is the heart of a delicious meal for billions across the globe. Ripuraj Agro Pvt Ltd has been dedicated to rice and paddy production. Our passion has marked our journey supporting local farmers in Bihar and pioneering organic agriculture practices. Our commitment to quality and sustainability has made us a trusted name in Bihar and beyond.
          </p>
          <Link
            className="inline-block mt-6 py-2 px-6 rounded-[5px] bg-[#306177] text-white text-[19px]"
            href="#"
          >
            About Us
          </Link>
        </div>

        {/* Image Section */}
        <div className='flex-1 relative w-[271px] h-[280px]'>
          <Image
            src="/path-to-your-image.jpg" // Add your image path here
            alt="Ripuraj Agro"
            fill
            className="object-cover rounded-[30px]"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
