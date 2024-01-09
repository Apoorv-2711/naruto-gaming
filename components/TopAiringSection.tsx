import { home } from "@/types/types";
import { FC } from "react";
import AnimeList from "./AnimeList";

type TopSectionProps = {
  topAiringAnimes: home["topAiringAnimes"];
};

const TopAiringSection: FC<TopSectionProps> = ({ topAiringAnimes }) => {
  const TopAiringData = topAiringAnimes.slice(0, 5) as home["topAiringAnimes"];
  const TopAiringData2 = topAiringAnimes.slice(
    5,
    10
  ) as home["topAiringAnimes"];
  const TopAiringData3 = topAiringAnimes.slice(
    10,
    15
  ) as home["topAiringAnimes"];
  const TopAiringData4 = topAiringAnimes.slice(
    15,
    20
  ) as home["topAiringAnimes"];

  return (
    <div className="text-white flex flex-row flex-wrap justify-between p-4 items-center">
      <AnimeList
        data={TopAiringData}
        header={"Top Airing"}
        className=" xl:basis-1/4 md:basis-1/2 basis-full"
      />
      <AnimeList
        data={TopAiringData2}
        header={"Most Popular"}
        className=" xl:basis-1/4 md:basis-1/2 basis-full"
      />
      <AnimeList
        data={TopAiringData3}
        header={"Most Favorite"}
        className=" xl:basis-1/4 md:basis-1/2 basis-full"
      />
      <AnimeList
        data={TopAiringData4}
        header={"Latest Completed"}
        className=" xl:basis-1/4 md:basis-1/2 basis-full"
      />
    </div>
  );
};

export default TopAiringSection;
