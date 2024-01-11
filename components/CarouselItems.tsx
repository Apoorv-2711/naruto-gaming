"use client";
import React from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  CalendarDaysIcon,
  Clock5Icon,
  Info,
  Mic,
  PlayCircle,
  PlayCircleIcon,
  Subtitles,
} from "lucide-react";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { home } from "@/types/types";

type Props = {
  carouselData: home["spotlightAnimes"];
};

export default function CarouselItems({ carouselData }: Props) {
  return (
    <>
      <Carousel
        className="w-full "
        plugins={[
          Autoplay({
            delay: 10000,
            stopOnInteraction: true,
          }),
        ]}
        opts={{
          loop: true,
        }}
      >
        <CarouselContent className="">
          {carouselData.map((item, idx) => {
            return (
              <CarouselItem key={idx + "__VK__APOORV__NG"}>
                <div
                  className={`object-cover  min-w-full sm:h-[500px] text-black filter brightness-75 h-[350px]  `}
                  style={{
                    backgroundImage: `url(${item.poster})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    boxShadow: "inset 0 0 0 1000px rgba(0,0,0,.5)",
                  }}
                >
                  <div className="text-white px-6 py-8 pb-3 flex justify-start items-end h-full filter brightness-100">
                    <div className="">
                      <h2 className="text-lg font-semibold ">
                        #{item.rank} Spotlight
                      </h2>
                      <h1 className="xs:text-2xl sm:text-3xl md:text-4xl w-full font-bold sm:mt-1 mb-2">
                        {item.name}
                      </h1>
                      <div className="md:flex hidden items-center space-x-3 my-4">
                        <Badge
                          variant="secondary"
                          className="flex items-center justify-center"
                        >
                          <PlayCircle size={15} className="mr-1 p-0" />
                          <span className="p-0 m-0"> {item.otherInfo[0]} </span>
                        </Badge>
                        <Badge
                          variant="default"
                          className="flex flex-row  items-center justify-center"
                        >
                          <Clock5Icon size={15} className="mr-1 p-0" />
                          <span className="p-0 m-0">{item.otherInfo[1]}</span>
                        </Badge>
                        <Badge
                          variant="default"
                          className="flex flex-row items-center justify-center"
                        >
                          <CalendarDaysIcon size={15} className="mr-1" />
                          <span>{item.otherInfo[2]}</span>
                        </Badge>
                        <Badge variant="default">{item.otherInfo[3]}</Badge>
                        <div className="flex flex-row gap-x-[1px]">
                          <Badge
                            variant="secondary"
                            className="flex flex-row rounded-r-none"
                          >
                            <Subtitles size={15} className="mr-1" />
                            <span>{item.episodes.sub}</span>
                          </Badge>
                          {item.episodes.dub && (
                            <Badge
                              variant="secondary"
                              className="flex flex-row rounded-none"
                            >
                              <Mic size={15} className="mr-1" />
                              <span>{item.episodes.dub}</span>
                            </Badge>
                          )}
                          <Badge
                            variant="default"
                            className="flex flex-row rounded-l-none"
                          >
                            <span>
                              {item.episodes.sub > item.episodes.dub
                                ? item.episodes.sub
                                : item.episodes.dub}
                            </span>
                          </Badge>
                        </div>
                      </div>
                      <p className="hidden md:block max-w-2xl mb-6">
                        {item.description
                          .replace(/(<([^>]+)>)/gi, "")
                          .substring(0, 180)}
                        ...
                      </p>
                      <div className="flex space-x-4">
                        <Button
                          variant="default"
                          className="flex justify-center items-center gap-x-1 bg-[#f97316] hover:bg-[#f94f31] transition-colors duration-300 ease-out"
                        >
                          <PlayCircleIcon size={15} />
                          <span>Watch Now</span>
                        </Button>
                        <Link href={`${item.id}`}>
                          <Button
                            variant="secondary"
                            className="flex items-center justify-center gap-x-1"
                          >
                            <Info size={15} />
                            <span>Detail</span>
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <div className="sm:block hidden">

        <CarouselNext
          className={
            "absolute right-5 top-[400px] transform -translate-y-1/2 rounded-lg bg-white/70 hover:bg-white/80 transition-colors duration-300 ease-out"
          }
        />
        <CarouselPrevious
          className={
            "absolute right-5 top-[440px]  transform -translate-y-1/2  rounded-lg bg-white/70 hover:bg-white/80 transition-colors duration-300 ease-out -left-100"
          }
        />
        </div>
      </Carousel>
    </>
  );
}
