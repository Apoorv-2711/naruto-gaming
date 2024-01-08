"use client";
import React from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  CalendarDaysIcon,
  Clock5Icon,
  Mic,
  PlayCircle,
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

type Props = {
  carouselData: any[];
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
                  className={`object-cover bg-gray-800 min-w-full h-[500px] text-black filter brightness-75`}
                  style={{
                    backgroundImage: `url(${item.poster})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    boxShadow: "inset 0 0 0 1000px rgba(0,0,0,.5)",
                  }}
                >
                  <div className="text-white px-6 py-8 flex justify-start items-end h-full filter brightness-100">
                    <div className="mb-4">
                      <h2 className="text-lg font-bold">
                        #{item.rank} Spotlight
                      </h2>
                      <h1 className="xs:text-2xl sm:text-3xl md:text-4xl     font-bold mt-2">
                        {item.name}
                      </h1>
                      <div className="flex items-center space-x-3 my-4">
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
                          className="flex flex-row  items-center justify-center"
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
                        <Button variant="default">Watch Now</Button>
                        <Link href={`${item.id}`}>
                          <Button variant="secondary">Detail</Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
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
      </Carousel>
    </>
  );
}

{
  /* <Carousel>
        {carouselData?.map((item, idx) => (
          <>
            <div
              className={`object-cover bg-gray-800 min-w-full h-[500px] text-black filter brightness-75`}
              style={{
                backgroundImage: `url(${
                  item.bannerImage
                    ? item.bannerImage
                    : item.coverImage.extraLarge
                })`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                boxShadow: "inset 0 0 0 1000px rgba(0,0,0,.5)",
              }}
            >
              <div className="text-white px-6 py-8 flex justify-start items-end h-full">
                <div className="mb-4">
                  <h2 className="text-lg font-bold">#{idx + 1} Spotlight</h2>
                  <h1 className="text-4xl font-bold mt-2">
                    {item.title.userPreferred.substring(0, 30)}
                  </h1>
                  <div className="flex items-center space-x-3 my-4">
                    <Badge variant="secondary">{item.format}</Badge>
                    <Badge
                      variant="default"
                      className="flex flex-row  items-center space-x-2"
                    >
                      <CalendarIcon />
                      <span>{item.status}</span>
                    </Badge>
                    <Badge variant="default">HD</Badge>
                    <Badge
                      variant="default"
                      className="flex flex-row space-x-1"
                    >
                      <Badge variant="default" className="text-white py-0 px-0">
                        CC
                      </Badge>
                      <span className="sr-only">Closed Captioning</span>
                      <span>{item?.episodes}</span>
                    </Badge>
                  </div>
                  <p className="max-w-2xl mb-6">
                    {item.description.substring(0, 250)}...
                  </p>
                  <div className="flex space-x-4">
                    <Button variant="default">Watch Now</Button>
                    <Link href={`${item.title.userPreferred.split(" ").join("-")}`}>
                      <Button variant="secondary">Detail</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </>
        ))}
      </Carousel> */
}
