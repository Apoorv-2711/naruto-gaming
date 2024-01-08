import React from "react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowRightIcon, Dot, Mic, Subtitles } from "lucide-react";
import { Separator } from "./ui/separator";

type AnimeListPorps = {
  data: {
    id: string;
    name: string;
    jname: string;
    poster: string;
    otherInfo: string[];
  }[];
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
              <img
                alt={item.name}
                className="w-16 h-20 rounded-md mb-2 "
                height="1080"
                src={item.poster}
                style={{
                  aspectRatio: "75/75",
                  objectFit: "cover",
                }}
                width="1080"
              />
              <div className="flex flex-col items-start space-y-2">
                <h3 className="font-semibold">{item.name}</h3>
                <div className="flex flex-row gap-x-[1px] items-center justify-center">
                  <Badge
                    variant="secondary"
                    className="flex flex-row rounded-r-none"
                  >
                    <Subtitles size={15} className="mr-1" />
                    <span>{/* {item.episodes.sub} */}22</span>
                  </Badge>
                  {/* {item.episodes.dub && ( */}
                  <Badge
                    variant="secondary"
                    className="flex flex-row rounded-none"
                  >
                    <Mic size={15} className="mr-1" />
                    <span>{/* {item.episodes.dub} */}22</span>
                  </Badge>
                  {/* )} */}
                  <Badge
                    variant="default"
                    className="flex flex-row rounded-l-none"
                  >
                    <span>
                      {/* {item.episodes.sub > item.episodes.dub
                      ? item.episodes.sub
                      : item.episodes.dub} */}
                      22
                    </span>
                  </Badge>
                  <Dot className="m-0 p-0 text-gray-500" />
                  <span className="text-gray-500 font-semibold text-sm p-0 m-0">
                    {item.otherInfo[0]}
                  </span>
                </div>
              </div>
            </div>
            <Separator />
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
