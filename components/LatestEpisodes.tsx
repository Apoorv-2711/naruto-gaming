import { home } from "@/types/types";
import Image from "next/image";
import { FC } from "react";
import InsideHoverCard from "./InsideHoverCard";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { ArrowRight, Dot } from "lucide-react";

type LatestEpisodesProps = {
  latestEpisodeData: home["latestEpisodeAnimes"];
};

const LatestEpisodes: FC<LatestEpisodesProps> = ({ latestEpisodeData }) => {
  return (
    <>
      <div className="mt-12 mb-4 flex flex-row justify-between items-center">
        <h3 className="text-2xl  font-bold text-[#f97316]">Latest Episode</h3>
        <div className="flex flex-row items-center content-center text-white/30">
          <div className="text-sm">View more</div>
          <ArrowRight size={15} className="ml-2 p-0 m-0" />
        </div>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-x-3 ">
        {latestEpisodeData.map((data) => (
          <div
            className="group mb-5 w-full space-y-3 after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
            key={data.id}
          >
            <HoverCard openDelay={0} closeDelay={0}>
              <HoverCardTrigger asChild>
                <Image
                  alt={data.name}
                  className="transform rounded-lg brightness-90 transition will-change-auto hover:blur-sm group-hover:brightness-100"
                  style={{
                    transform: "translate3d(0, 0, 0)",
                    aspectRatio: "3/4",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                  src={data.poster}
                  width={720}
                  height={480}
                  sizes="(max-width: 640px) 100vw,
                  (max-width: 1280px) 50vw,
                  (max-width: 1536px) 33vw,
                  25vw"
                />
              </HoverCardTrigger>
              <HoverCardContent className=" dark min-w-[350px] w-min  bg-[#25242489] text-white rounded-lg border-none bg-opacity-60 backdrop-blur-lg p-0 m-0">
                <InsideHoverCard id={data?.id} />
              </HoverCardContent>
            </HoverCard>
            <div className="flex flex-col space-y-2 items-start text-white overflow-hidden">
              <div
                className=" flex flex-row hover:text-[#f97316] cursor-pointer"
                style={{
                  maxWidth: "100%",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                }}
              >
                <h3 className="text-sm font-bold">{data.name}</h3>
              </div>
              <p className="text-sm text-gray-300">
                {data.type}
                <Dot size={25} className="inline-block" />
                {data.duration}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default LatestEpisodes;
