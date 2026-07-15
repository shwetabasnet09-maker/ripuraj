"use client";

import React, { useState } from "react";
import { MapPin } from "lucide-react";
import AnimateIn from "./AnimateIn";

export default function GoogleMapClone() {
  const [mapLoaded, setMapLoaded] = useState(false);

  const mapSrc =
    "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14167.316827845348!2d84.8513!3d26.9124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin";

  return (
    <AnimateIn>
      <div className="p-4 md:p-8 bg-white">
        <div className="max-w-7xl mx-auto rounded-[40px] overflow-hidden shadow-xl h-[400px] md:h-[500px] relative bg-[#E8EEF1]">
          {mapLoaded ? (
            <iframe
              src={mapSrc}
              className="h-full w-full grayscale-[0.1] contrast-[1.05]"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ramgarhwa Map View"
            ></iframe>
          ) : (
            <button
              onClick={() => setMapLoaded(true)}
              className="group relative w-full h-full flex flex-col items-center justify-center gap-3"
              aria-label="Load map"
            >
              <div className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <MapPin size={28} className="text-[#2e6378]" />
              </div>

              <span className="text-[#2e6378] font-semibold text-sm">
                Click to load map
              </span>
            </button>
          )}
        </div>
      </div>
    </AnimateIn>
  );
}