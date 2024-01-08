import { home } from "@/types/types";
import { FC } from "react";
import AnimeList from "./AnimeList";

type TopSectionProps = {
  topAiringAnimes: home["topAiringAnimes"];
};

const TopAiringSection: FC<TopSectionProps> = ({ topAiringAnimes }) => {
  return (
    <div className="text-white flex flex-row flex-wrap justify-between p-4 items-center">
      <AnimeList data={topAiringAnimes.slice(0, 5)} header={"Top Airing"} className=" xl:basis-1/4 lg:basis-1/2" />
      <AnimeList data={topAiringAnimes.slice(5, 10)} header={"Most Popular"} className=" xl:basis-1/4 lg:basis-1/2"/>
      <AnimeList data={topAiringAnimes.slice(10, 15)} header={"Most Favorite"} className=" xl:basis-1/4 lg:basis-1/2"/>
      <AnimeList data={topAiringAnimes.slice(15, 20)} header={"Latest Completed"} className=" xl:basis-1/4 lg:basis-1/2"/>
    </div>
  );
};

export default TopAiringSection;
