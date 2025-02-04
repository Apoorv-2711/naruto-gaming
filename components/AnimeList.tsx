import React from "react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowRightIcon, Dot, Mic, Subtitles } from "lucide-react";
import { Separator } from "./ui/separator";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Image from "next/image";
import InsideHoverCard from "./InsideHoverCard";
import Balancer from "react-wrap-balancer";
import { ScrapedHomePage } from "@/types/scrapper/homePage";

type AnimeListPorps = {
  data: ScrapedHomePage["topAiringAnimes"];
  header: string;
  className?: string;
};

const AnimeList: React.FC<AnimeListPorps> = ({ data, header, className }) => {
  return (
    <div className={` text-white p-4 rounded-md ${className}`}>
      <h2 className="text-xl font-bold mb-4 text-[#f97316]">{header}</h2>
      <div className="space-y-4">
        {data.map((item) => (
          <>
            <div className="flex flex-row justify-start space-x-3">
              <HoverCard openDelay={0} closeDelay={0}>
                <HoverCardTrigger asChild>
                  <Image
                    alt={item.name ? item.name : "__VK__APOORV__NG"}
                    className="w-16 h-20 rounded-md mb-2 "
                    height="1080"
                    src={item.poster ? item.poster : "/logo.png"}
                    style={{
                      aspectRatio: "75/75",
                      objectFit: "cover",
                    }}
                    width="1080"
                  />
                </HoverCardTrigger>
                <HoverCardContent className=" dark min-w-[350px] w-min  bg-[#49494929] text-white rounded-lg border-none bg-opacity-60 backdrop-blur-lg p-0 m-0">
                  <InsideHoverCard id={item?.id} />
                </HoverCardContent>
              </HoverCard>
              <div className="flex flex-col items-start space-y-2">
                <h3 className="font-semibold">{item.name}</h3>
                <div className="flex sm:flex-row flex-wrap gap-x-[1px] items-center sm:justify-center justify-start">
                  <Badge
                    variant="secondary"
                    className="flex flex-row rounded-r-none px-1"
                  >
                    <Subtitles size={15} className="mr-1" />
                    <span>{item.episodes.sub}</span>
                  </Badge>
                  {item.episodes.dub && (
                    <Badge
                      variant="secondary"
                      className="flex flex-row rounded-none px-1"
                    >
                      <Mic size={15} className="mr-1" />
                      <span>{item.episodes.dub}</span>
                    </Badge>
                  )}

                  <div className="flex flex-row items-center space-x-1">
                    <Dot className="m-0 p-0 text-gray-500" />
                    <span className="text-gray-500 font-semibold text-sm p-0 m-0">
                      {item.type}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <Separator className=" bg-gray-800 h-[0.5px] rounded-full" />
          </>
        ))}
      </div>
      <Link
        className="flex flex-row items-center justify-start mt-3 text-start text-gray-400 hover:text-indigo-300"
        href="/"
      >
        <span>View More</span>
        <ArrowRightIcon size={15} className="ml-1" />
      </Link>
    </div>
  );
};

export default AnimeList;
