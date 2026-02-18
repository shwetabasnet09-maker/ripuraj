import React from 'react';

export default function GoogleMapClone() {
  // This URL points directly to the Ramgarhwa/Shiv Nagar coordinates seen in your image
  const mapSrc = "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14167.316827845348!2d84.8513!3d26.9124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin";

  return (
    <div className="relative h-screen w-full bg-[#e5e3df]">
      
     

      {/* The Actual Map Iframe */}
      <iframe
        src={mapSrc}
        className="h-full w-full grayscale-[0.1] contrast-[1.05]"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Ramgarhwa Map View"
      ></iframe>

     

    </div>
  );
}