import React from 'react';

const Video = () => {
  return (
    <div className='py-20'>
    <div className="wrapper w-full h-[501px] rounded-[25px] overflow-hidden">
      <iframe
        className="w-full h-full"
        src="https://www.youtube.com/embed/BOKQClMzRM0" 
        title="Video Player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
    </div>
  );
}

export default Video;
