"use client";
import React, { FC, useState } from "react";
import { Button } from "./ui/button";
import { Mic, Subtitles } from "lucide-react";
import { Separator } from "./ui/separator";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { ScrapedHomePage } from "@/types/scrapper/homePage";

type Top10Props = {
  top10Data: ScrapedHomePage["top10Animes"];
};

const Top10: FC<Top10Props> = ({ top10Data }) => {
  const [data, setData] = useState<
    | ScrapedHomePage["top10Animes"]["today"]
    | ScrapedHomePage["top10Animes"]["week"]
    | ScrapedHomePage["top10Animes"]["month"]
  >(top10Data.today);

  const [active, setActive] = useState<"today" | "week" | "month">("today");

  return (
    <>
      <div className="mt-12 mb-4 flex flex-row justify-between items-center cursor-default">
        <h3 className="text-2xl  font-bold  text-[#f97316]">Top 10</h3>
        <div className={"flex flex-row items-center text-white"}>
          <Button
            className={`rounded-r-none hover:bg-[#252424] hover:text-[#f97316] ${
              active === "today"
                ? "bg-[#f97316] hover:bg-[#f97316] hover:text-black text-black"
                : "bg-[#252424]"
            }`}
            onClick={() => {
              setData(top10Data.today);
              setActive("today");
            }}
            variant={"default"}
          >
            Today
          </Button>
          <Button
            className={`rounded-l-none rounded-r-none hover:bg-[#252424] hover:text-[#f97316] ${
              active === "week"
                ? "bg-[#f97316] hover:bg-[#f97316] hover:text-black text-black"
                : "bg-[#252424]"
            }`}
            onClick={() => {
              setData(top10Data.week);
              setActive("week");
            }}
            variant={"default"}
          >
            Week
          </Button>
          <Button
            className={`rounded-l-none hover:bg-[#252424] hover:text-[#f97316] ${
              active === "month"
                ? "bg-[#f97316] hover:bg-[#f97316] hover:text-black text-black"
                : "bg-[#252424]"
            }`}
            onClick={() => {
              setData(top10Data.month);
              setActive("month");
            }}
            variant={"default"}
          >
            Month
          </Button>
        </div>
      </div>
      <div className=" bg-[#171717] p-4 cursor-default rounded-sm">
        <div className="flex flex-col gap-y-4 ">
          {data.map((anime, idx) => (
            <div
              className={`flex flex-col w-full ${
                idx > 2 ? "hover:text-white text-white/30" : "text-white"
              }`}
              key={anime.id}
            >
              <div className="flex flex-row items-center gap-x-2 ">
                <div className="text-2xl font-bold pr-2 w-10 flex flex-col">
                  {idx < 9 ? `0${idx + 1}` : idx + 1}
                  <Separator
                    className={idx < 3 ? "bg-[#f97316] h-[2px]" : "hidden"}
                  />
                </div>
                <div className="flex flex-row justify-start space-x-3 w-full">
                  <Image
                    alt={anime.name ? anime.name : "__VK__APOORV__NG"}
                    className="w-16 h-20 rounded-md mb-2 "
                    height="1080"
                    src={anime.poster ? anime.poster : "/logo.png"}
                    style={{
                      aspectRatio: "75/75",
                      objectFit: "cover",
                    }}
                    width="1080"
                  />
                  <div className="flex flex-col items-start space-y-2 w-full text-white">
                    <h3 className="font-semibold cursor-pointer hover:text-[#f97316]">
                      {anime.name}
                    </h3>
                    <div className="flex flex-row gap-x-[1px] items-center justify-center">
                      <Badge
                        variant="secondary"
                        className="flex flex-row rounded-r-none px-1"
                      >
                        <Subtitles size={15} className="mr-1" />
                        <span>{anime.episodes.sub}</span>
                      </Badge>
                      {anime.episodes.dub && (
                        <Badge
                          variant="secondary"
                          className="flex flex-row rounded-none px-1"
                        >
                          <Mic size={15} className="mr-1" />
                          <span>{anime.episodes.dub}</span>
                        </Badge>
                      )}
                      <Badge
                        variant="default"
                        className="flex flex-row rounded-l-none px-1"
                      >
                        <span>
                          {(anime.episodes.sub ?? 0) > (anime.episodes.dub ?? 0)
                            ? anime.episodes.sub
                            : anime.episodes.dub}
                        </span>
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
              <Separator className="bg-gray-800 h-[0.5px] rounded-full last:hidden" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Top10;
