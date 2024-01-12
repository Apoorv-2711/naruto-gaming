import { home } from "@/types/types";
import Image from "next/image";
import { FC } from "react";

type LatestEpisodesProps = {
  latestEpisodeData: home["latestEpisodeAnimes"];
};

const LatestEpisodes: FC<LatestEpisodesProps> = ({ latestEpisodeData }) => {
  return (
    <div className="xl:w-3/4 w-full px-4 bg-white">
      <h3 className="text-2xl  font-bold mt-12 mb-4 ml-4 text-red-500">
        Latest Episode
      </h3>
        <div className="flex flex-wrap justify-evenly  px-auto p-6 pb-8">
        {latestEpisodeData.map((data) => (
          <div className="flex flex-col justify-start w-auto h-auto mr-4 mb-4 space-y-2 relative">
            <Image
              alt="New Release 1"
              className="rounded-md relative"
              height="300"
              loading="lazy"
              src={data.poster}
              width="200"
            />
            <div className="flex flex-col  items-start ">
              <h3 className="text-sm font-bold">
                {data.name.slice(0, 20)}
                {data.name.length > 20 ? "..." : ""}
              </h3>
              <p className="text-sm ">{data.episodes.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestEpisodes;
