"use client";

import React, { useState } from "react";
import Image from "next/image";

const YOUTUBE_ID = "BOKQClMzRM0";

const Video = () => {
  const [playing, setPlaying] = useState(false);
  const [thumbLoaded, setThumbLoaded] = useState(false);

  return (
    <div className="py-20">
      <div className="wrapper w-full h-[501px] rounded-[25px] overflow-hidden relative bg-gray-200">
        {playing ? (
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=1`}
            title="Video Player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <button
            onClick={() => setPlaying(true)}
            className="group relative w-full h-full"
            aria-label="Play video"
          >
            {!thumbLoaded && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse" />
            )}

            <Image
              src={`https://img.youtube.com/vi/${YOUTUBE_ID}/maxresdefault.jpg`}
              alt="Video thumbnail"
              fill
              unoptimized
              onLoad={() => setThumbLoaded(true)}
              className={`object-cover transition-opacity duration-300 ${
                thumbLoaded ? "opacity-100" : "opacity-0"
              }`}
            />

            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
              <span className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-[#2e6378] ml-1"
                >
                  <path d="M8 5v14l11-7z" fill="currentColor" />
                </svg>
              </span>
            </div>
          </button>
        )}
      </div>
    </div>
  );
};

export default Video;
