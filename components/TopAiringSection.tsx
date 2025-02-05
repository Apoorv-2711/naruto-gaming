import { home } from "@/types/types";
import { FC } from "react";
import AnimeList from "./AnimeList";
import { TopAiringAnime } from "@/types/anime";

type TopSectionProps = {
  topAiringAnimes: TopAiringAnime[];
};

const TopAiringSection: FC<TopSectionProps> = ({ topAiringAnimes }) => {
  const TopAiringData = topAiringAnimes.slice(0, 5);
  const MostPopularData = topAiringAnimes.slice(5, 10);
  const MostFavoriteData = topAiringAnimes.slice(10, 15);
  const LatestCompletedData = topAiringAnimes.slice(15, 20);

  return (
    <div className="text-white flex flex-row flex-wrap justify-between p-4 items-center">
      <AnimeList
        data={TopAiringData}
        header={"Top Airing"}
        className=" xl:basis-1/4 md:basis-1/2 basis-full"
      />
      <AnimeList
        data={MostPopularData}
        header={"Most Popular"}
        className=" xl:basis-1/4 md:basis-1/2 basis-full"
      />
      <AnimeList
        data={MostFavoriteData}
        header={"Most Favorite"}
        className=" xl:basis-1/4 md:basis-1/2 basis-full"
      />
      <AnimeList
        data={LatestCompletedData}
        header={"Latest Completed"}
        className=" xl:basis-1/4 md:basis-1/2 basis-full"
      />
    </div>
  );
};

export default TopAiringSection;
