"use client";
import { home } from "@/types/types";
import Image from "next/image";
import React, { FC } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPreviousCustom,
} from "./ui/carousel";

type TrendingProps = {
  trendingData: home["trendingAnimes"];
};

const Trending: FC<TrendingProps> = ({ trendingData }) => {
  return (
    <div className="h-full mx-auto">
      <h3 className="text-2xl font-bold mt-12  ml-4 text-[#f97316]">
        Trending
      </h3>
      <div className="flex overflow-x-auto p-6 sm:pr-14 items-center justify-center ">
        <Carousel className="w-full">
          <CarouselContent className="sm:space-x-4">
            {trendingData.map((item, idx) => {
              return (
                <CarouselItem
                  key={idx + "__VK__APOORV__NG"}
                  className="  basis-auto flex flex-row max-h-60  justify-center sm:space-x-1 hover:scale-105 transform transition-all duration-500 ease-in-out"
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
                    className="realtive w-40 h-60 rounded-md z-0 cursor-pointer"
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
          <div className="sm:block hidden">
            <CarouselNext className="border-none bg-gray-400 top-1/4 py-12 rounded-lg" />
            <CarouselPreviousCustom className="border-none bg-gray-400 top-3/4 py-12 rounded-lg" />
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default Trending;
