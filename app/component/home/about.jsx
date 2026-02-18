import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const About = () => {
  return (
    <div className='bg-[#FFF2D9] py-12 md:py-20 px-6'>
      {/* Wrapper with max-width and flex layout */}
      <div className='max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-16'>
        
        {/* Text div - 65% Width on Desktop */}
        <div className='w-full lg:w-[55%]'>
          <h3 className='text-[18px] md:text-[20px] font-medium tracking-wide text-gray-800'>
            WELCOME TO RIPURAJ AGRO
          </h3>
          <h2 className='text-[#306177] text-[28px] md:text-[45px] font-bold leading-tight mt-2'>
            Over 46+ Years of Cultivating <br className="hidden md:block" /> Quality and Excellence
          </h2>
          <p className='text-[16px] md:text-[17px] mt-6 text-gray-700 leading-relaxed'>
            Rice is the heart of a delicious meal for billions across the globe. 
             Ripuraj Agro Pvt Ltd, has been dedicated to rice and paddy production. 
            Our passion has marked our journey for Supporting local farmers in Bihar 
            and pioneering organic agriculture practices. Our commitment to quality 
            and sustainability has made us a trusted name in Bihar and beyond.
          </p>
          <Link
            className="inline-block mt-8 py-3 px-8 rounded-[5px] bg-[#306177] text-white text-[18px] font-semibold hover:bg-[#254d5f] transition-all"
            href="/about"
          >
            ABOUT US
          </Link>
        </div>

        {/* Image div - 35% Width on Desktop */}
        <div className='w-full lg:w-[35%]'>
          <div className='relative w-full aspect-[4/5] md:aspect-square lg:aspect-[0.8/1]'>
            <Image
              src="/about.png" 
              alt="Ripuraj Agro Products"
              fill
              className="object-cover rounded-[30px]"
              priority
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;