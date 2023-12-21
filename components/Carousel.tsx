"use client";
import React, { useEffect, useState } from "react";
import { ChevronRightIcon, ChevronLeftIcon } from "@radix-ui/react-icons";

function Carousel({ children: slides }: any) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const prev = () => {
    setCurrentSlide((curr) => (curr === 0 ? slides?.length - 1 : curr - 1));
  };

  const next = () => {
    setCurrentSlide((curr) => (curr === slides?.length - 1 ? 0 : curr + 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 5000);
    return () => clearInterval(interval);
  }, [next]);

  return (
    <div className="overflow-hidden relative shadow-lg">
      <div
        className="flex transition-transform ease-out duration-1000"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {slides}
      </div>
      <div>
        <button
          className="absolute right-5 top-[450px]  transform -translate-y-1/2  rounded-lg bg-white/70 p-2 hover:bg-white/80 transition-colors duration-300 ease-out"
          onClick={prev}
        >
          <ChevronLeftIcon
            className={
              "w-6 h-6 text-black/70 hover:text-black/80 transition-colors duration-300 ease-out text-gray font-bold"
            }
          />
        </button>
        <button
          className="absolute right-5 top-[400px] transform -translate-y-1/2 rounded-lg bg-white/70 p-2 hover:bg-white/80 transition-colors duration-300 ease-out"
          onClick={next}
        >
          <ChevronRightIcon
            className={
              "w-6 h-6 text-black/70 hover:text-black/80 transition-colors duration-300 ease-out text-gray font-bold"
            }
          />
        </button>
      </div>
      <div className="absolute bottom-4 right-0 left-0">
        <div className="flex items-center justify-center gap-2">
          {slides?.map((_: number, idx: number) => (
            <div
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-3 h-3 rounded-full bg-neutral-600 transition-colors duration-300 ease-out ${
                currentSlide === idx && "bg-white"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Carousel;
