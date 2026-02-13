const Herodiv = () => {
  return (
    <div
      className="h-[786px] bg-[url('/HeroBanner.png')] bg-cover bg-center flex items-center rounded-b-[30px]"
    >
      <div className="wrapper text-white flex justify-between pt-[120px] ">
        <div className="w-[43%] ">
        <h1 className="text-5xl font-bold ">
          Ripuraj Agro  Sowing Excellence Since 2010
        </h1>

        <p className="mt-4 text-[20px]  ">
          Ripuraj started its journey with the vision to make it the finest brand
          for Non-Basmati/Basmati Rice in India and beyond.
        </p>

        <button className="mt-6 bg-[#3b6b7a] px-6 py-3 rounded-md text-[19px] font-medium  ">
          SHOP NOW
        </button>
      </div>
      </div>
    </div>
  );
};

export default Herodiv;
