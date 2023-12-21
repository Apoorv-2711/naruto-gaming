import React from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import Carousel from "./Carousel";
import { anilistTrending } from "@/types/types";
import { CalendarIcon } from "@radix-ui/react-icons";

type Props = {
  carouselData: anilistTrending[];
};

export default function CarouselItems({ carouselData }: Props) {
  return (
    <>
      <Carousel>
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
                // filter: "brightness(0.5)",
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
                    {/* <span>1h 50m</span> */}
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
                      {/* Creae an svg icon for closed captioning */}
                      <Badge variant="default" className="text-white py-0 px-0">
                        CC
                      </Badge>
                      <span className="sr-only">Closed Captioning</span>
                      <span>{item.episodes}</span>
                    </Badge>
                    {/* <Badge variant="default">1</Badge> */}
                  </div>
                  <p className="max-w-2xl mb-6">
                    As a lionhearted boy who can't wield magic strives for the
                    title of Wizard King, four banished Wizard Kings of yore
                    return to crush the Clover Kingdom.
                  </p>
                  <div className="flex space-x-4">
                    <Button variant="default">Watch Now</Button>
                    <Button variant="secondary">Detail</Button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ))}
      </Carousel>
    </>
  );
}
