"use client";

import React from "react";
import AnimateIn from "./AnimateIn";

export default function GoogleMapClone() {
  const mapSrc =
    "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14167.316827845348!2d84.8513!3d26.9124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin";

  return (
    <AnimateIn>
      <div className="p-4 md:p-8 bg-white">
        <div className="max-w-7xl mx-auto rounded-[40px] overflow-hidden shadow-xl h-[400px] md:h-[500px] relative">
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
      </div>
    </AnimateIn>
  );
}
