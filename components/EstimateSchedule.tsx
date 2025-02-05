"use client";
import { FC, useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { estimateSchedule } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { Button } from "./ui/button";
import Link from "next/link";
import { Separator } from "./ui/separator";
import { PlayCircle, PlayIcon } from "lucide-react";

type EstimateScheduleProps = {
  estimateScheduleData: estimateSchedule["scheduledAnimes"];
  dateList: string[];
  currentDate: string;
};

const EstimateSchedule: FC<EstimateScheduleProps> = ({
  estimateScheduleData,
  dateList,
  currentDate,
}) => {
  const [currentTime, setCurrentTime] = useState(
    `(GMT+05:30) ${new Date().toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
      hour12: true,
    })}`
  );
  const [activeTab, setActiveTab] = useState<string>(currentDate);

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      const options = { timeZone: "Asia/Kolkata", hour12: true };
      const str = date.toLocaleString("en-US", options);
      const gmt = `(GMT+05:30) ${str}`;
      setCurrentTime(gmt);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const [show, setShow] = useState<number | undefined>(7);

  const fetchData = async (date: string) => {
    const res = await fetch(
      `https://api-aniwatch.onrender.com/anime/schedule?date=${date}`
    );
    const data = await res.json();
    return data.scheduledAnimes as estimateSchedule["scheduledAnimes"];
  };

  const { data = estimateScheduleData, isLoading } = useQuery({
    queryKey: [activeTab],
    queryFn: () => fetchData(activeTab),
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <div className="mt-12 mb-4 flex flex-row justify-between items-center">
        <h3 className="text-2xl font-bold text-[#f97316]">
          Estimated Schedule
        </h3>
        <Badge className="bg-white p-1 text-black rounded-full md:block hidden">
          <div className="font-bold text-sm mx-1" suppressHydrationWarning>
            {currentTime}
          </div>
        </Badge>
      </div>
      <div className="px-10 py-4 mt-2">
        <Carousel
          className="flex flex-auto"
          opts={{
            startIndex: new Date().getDate() - 1,
            // Animation: "scroll",
            // scroll: 1,
            dragFree: true,
          }}
        >
          <CarouselContent className="flex flex-auto w-full px-1 gap-x-4 cursor-pointer">
            {dateList.map((date, index) => (
              <CarouselItem key={index} className="basis-auto">
                <Card
                  className={`${
                    activeTab !== date ? "bg-[#262525]" : "bg-[#f97316] "
                  } border-none p-2 min-w-[150px] `}
                  onClick={() => {
                    setActiveTab(date);
                  }}
                >
                  <div className="flex flex-col justify-center items-center">
                    <h3
                      className={`text-lg font-semibold  ${
                        activeTab === date ? "text-[#000000]" : "text-white "
                      }`}
                    >
                      {new Date(date).toLocaleString("en-US", {
                        weekday: "short",
                      })}
                    </h3>
                    <div className="flex flex-row justify-center items-center">
                      <h3
                        className={`text-sm  ${
                          activeTab !== date
                            ? "text-[#6f6d6d]"
                            : "text-[#000000] "
                        }`}
                      >
                        {new Date(date).toLocaleString("en-US", {
                          month: "short",
                        })}{" "}
                        {new Date(date).toLocaleString("en-US", {
                          day: "numeric",
                        })}
                      </h3>
                    </div>
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext className="text-3xl font-bold text-[#ffffff]" />
          <CarouselPrevious className="text-3xl font-bold text-[#ffffff]" />
        </Carousel>
      </div>
      <div suppressHydrationWarning>
        {isLoading ? (
          <div className="flex flex-row justify-center items-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#f97316]"></div>
          </div>
        ) : (
          <div>
            {data?.slice(0, show).map((item) => (
              <div key={item.id} className=" text-white w-full cursor-pointer">
                <div className="mx-auto py-6 px-4 group">
                  <ul className="">
                    <li className="flex justify-between w-full">
                      <div className="flex flex-row space-x-6 w-3/4">
                        <div className="font-bold text-gray-400 group-hover:text-[#f97316] transition-colors duration-150">
                          {item.time}
                        </div>
                        <span className="font-medium truncate group-hover:text-[#f97316] transition-colors duration-150">
                          {item.name}
                        </span>
                      </div>
                      <Link
                        className="text-white w-1/4 sm:w-auto items-end group-hover:bg-[#f97316] group-hover:text-black px-2 py-1 rounded-md transition-colors duration-150"
                        href=""
                      >
                        <span className="whitespace-nowrap">Episode 2</span>
                      </Link>
                    </li>
                  </ul>
                </div>
                <Separator className="px-4 mx-auto bg-gray-800 h-[0.5px]" />
              </div>
            ))}
            {data.length > 7 && (
              <div
                className="text-white mx-4 my-6 px-0 py-0 font-bold cursor-pointer hover:text-[#f97316]"
                onClick={() => {
                  setShow((prev) => {
                    if (prev === 7) {
                      return undefined;
                    } else {
                      return 7;
                    }
                  });
                }}
              >
                {show === 7 ? "Show More" : "Show Less"}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default EstimateSchedule;
