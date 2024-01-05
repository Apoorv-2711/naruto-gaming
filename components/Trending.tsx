"use client";
import { home } from "@/types/types";
import Image from "next/image";
import React, { FC, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { InsideHoverCard } from "./InsideHoverCard";

type TrendingProps = {
  trendingData: home["trendingAnimes"];
};

const Trending: FC<TrendingProps> = ({ trendingData }) => {
  const [hover, setHover] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [idx, setIdx] = useState("");

  const handleHover = (e: React.MouseEvent<HTMLImageElement>) => {
    setIdx(e.currentTarget.alt);
    setHover(true);
  };

  const handleHoverLeave = () => {
    setHover(false);
  };

  const handleMousePosition = (e: React.MouseEvent<HTMLImageElement>) => {
    setMousePosition({
      x: e.clientX,
      y: e.clientY,
    });
  };

  return (
    <div className="mx-auto">
      <h3 className="text-2xl font-bold mt-12 mb-4 ml-4 text-white">
        Trending
      </h3>
      <div className="flex overflow-x-auto p-6 px-14 items-center justify-center ">
        <Carousel className="w-full">
          <CarouselContent className="-ml-3">
            {trendingData.map((item, idx) => {
              return (
                <CarouselItem
                  key={idx + "__VK__APOORV__NG"}
                  className=" md:basis-1/2 lg:basis-1/6 flex flex-row max-h-60  justify-center space-x-2 hover:scale-105 transform transition-all duration-500 ease-in-out"
                >
                  <div className="text-white space-y-2 flex flex-col items-center justify-end flex-wrap py-1">
                    <div
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                      }}
                    >
                      <h2 className="">{`${item.name.slice(0, 15)}...`}</h2>
                    </div>
                    <span className="text-white text-2xl font-bold">
                      {(idx + 1).toString().padStart(2, "0")}
                    </span>
                  </div>
                  <Popover open={hover} onOpenChange={
                    (e) => {
                      if (!e) {
                        setHover(false);
                      }
                    }
                  }>
                    <PopoverTrigger asChild>
                      <Image
                        alt={item.id}
                        className="realtive w-40 h-60 rounded-md z-0"
                        height="1080"
                        src={item.poster}
                        style={{
                          aspectRatio: "200/300",
                          objectFit: "cover",
                        }}
                        width="1080"
                        onMouseOver={handleHover}
                        onMouseLeave={handleHoverLeave}
                        onMouseMove={handleMousePosition}
                      />
                    </PopoverTrigger>
                    <PopoverContent className="p-0 m-0 border-none outline-none bg-black ">
                      <InsideHoverCard />
                    </PopoverContent>
                  </Popover>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselNext className="text-white " />
          <CarouselPrevious className="text-white " />
        </Carousel>
      </div>
    </div>
  );
};

export default Trending;
