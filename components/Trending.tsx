"use client";
import { home } from "@/types/types";
import Image from "next/image";
import React, { FC } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { InsideHoverCard } from "./InsideHoverCard";

type TrendingProps = {
  trendingData: home["trendingAnimes"];
};

const Trending: FC<TrendingProps> = ({ trendingData }) => {
  return (
    <div className="mx-auto">
      <h3 className="text-2xl font-bold mt-12  ml-4 text-white">
        Trending
      </h3>
      <div className="flex overflow-x-auto p-6 pr-14 items-center justify-center ">
        <Carousel className="w-full">
          <CarouselContent className="">
            {trendingData.map((item, idx) => {
              return (
                <CarouselItem
                  key={idx + "__VK__APOORV__NG"}
                  className=" md:basis-1/3 lg:basis-1/4 xl:basis-1/6 sm:basis-1/3 basis-1/2 flex flex-row max-h-60  justify-center space-x-1 hover:scale-105 transform transition-all duration-500 ease-in-out"
                  onClick={() => {
                    window.location.href = `${item.id}`;
                  }}
                >
                  <div className="text-white space-y-2 md:flex flex-col items-center justify-end flex-wrap py-1 hidden">
                    <div
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                      }}
                    >
                      <h2 className="">{`${
                        item.name.length > 15
                          ? item.name.slice(0, 15) + "..."
                          : item.name
                      }`}</h2>
                    </div>
                    <span className="text-white text-2xl font-bold">
                      {(idx + 1).toString().padStart(2, "0")}
                    </span>
                  </div>
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
                  />
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselNext className="border-none bg-gray-400 top-1/4 py-12 rounded-lg" />
          <CarouselPrevious className="border-none bg-gray-400 top-3/4 py-12 rounded-lg" />
        </Carousel>
      </div>
    </div>
  );
};

export default Trending;
