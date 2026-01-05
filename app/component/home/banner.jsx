import React from 'react'

const Banner = () => {
  return (
    <div>
      <section
      className="h-[430px] bg-[url('/banner.png')] bg-cover bg-center flex items-center"
    >
      <div className="wrapper text-white flex justify-between  ">
        <div className="w-[43%] ">
        <h2 className="text-[35px] font-bold ">
          Looking to buy in bulk?
        </h2>

        <p className="mt-4 text-[17x]  ">
         Our wholesale team is available and will assist you during the process.
        </p>

        <button className="mt-6 bg-white px-6 py-3 rounded-md text-[19px] font-medium text-[#306177] ">
          GET IN TOUCH
        </button>
      </div>
      </div>
    </section>  
    </div>
  )
}

export default Banner