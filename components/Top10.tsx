"use client";
import { home } from "@/types/types";
import React, { FC, useState } from "react";
import { Button } from "./ui/button";
import { EyeIcon, HeartIcon } from "lucide-react";
import { Separator } from "./ui/separator";

type Top10Props = {
  top10Data: home["top10Animes"];
};

const Top10: FC<Top10Props> = ({ top10Data }) => {
  const [data, setData] = useState<
    | home["top10Animes"]["today"]
    | home["top10Animes"]["week"]
    | home["top10Animes"]["month"]
  >(top10Data.today);

  const [active, setActive] = useState<"today" | "week" | "month">("today");

  return (
    <>
      <div className="mt-12 mb-4 flex flex-row justify-between items-center">
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
      <div className=" bg-[#252424]  p-4">
        <div className="grid grid-cols-1 gap-y-4">
          {data.map((anime, idx) => (
            <div className="flex items-center gap-x-2">
              <div className="text-2xl font-bold pr-2 text-white flex flex-col">
                {idx < 9 ? `0${idx + 1}` : idx + 1}
                <Separator className="h-[3px] mt-1" />
              </div>
              <img
                alt="One Piece"
                className="w-24 h-24 mr-2"
                height="100"
                src={anime.poster}
                style={{
                  aspectRatio: "100/100",
                  objectFit: "cover",
                }}
                width="100"
              />
              <div>
                <div className="font-bold">One Piece</div>
                <div className="flex items-center">
                  <EyeIcon className="text-gray-400" />
                  <span className="text-gray-400 mx-1">1090</span>
                  <HeartIcon className="text-red-500" />
                  <span className="text-red-500 mx-1">1048</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Top10;
