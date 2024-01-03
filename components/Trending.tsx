"use client";
import { gogoPopular } from "@/types/types";
import Image from "next/image";
import React, { FC } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

type TrendingProps = {
  trendingData: gogoPopular[];
};

const Trending: FC<TrendingProps> = ({ trendingData }) => {
  return (
    <div className="mx-auto">
      <h3 className="text-2xl font-bold mt-12 mb-4 ml-4 text-white">
        Trending
      </h3>
      <div className="flex overflow-x-auto p-6 px-14 items-center justify-center ">
        <Carousel className="w-full ">
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
                      <h2 className="">{`${item.title.slice(0, 15)}...`}</h2>
                    </div>
                    <span className="text-white text-2xl font-bold">
                      {(idx + 1).toString().padStart(2, "0")}
                    </span>
                  </div>
                  <Image
                    alt={item.title}
                    className="w-40 h-60 rounded-md"
                    height="300"
                    src={item.image}
                    style={{
                      aspectRatio: "200/300",
                      objectFit: "cover",
                    }}
                    width="200"
                  />
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
