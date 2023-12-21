import { gogoPopular } from "@/types/types";
import React, { FC } from "react";

type TrendingProps = {
  trendingData: gogoPopular[];
};

const Trending: FC<TrendingProps> = ({ trendingData }) => {
  return (
    <div>
      <h3 className="text-2xl font-bold mt-12 mb-4  text-white">Trending</h3>
      <div className="flex overflow-x-auto px-2 space-x-4  bg-green-500 items-center justify-center ">
        {trendingData.map((item, idx) => {
          return (
            <div className="bg-red-500 flex flex-col whitespace-nowrap">
              <div className="bg-yellow-500 whitespace-nowrap flex flex-row flex-wrap ">
                <div className="text-white rotate-90 bg-blue-500">
                  <span className="text-white">{idx + 1}</span>
                  <h2>{item.title.slice(0, 10)}</h2>
                </div>
                <img
                  alt={item.title}
                  className="w-40 h-60 rounded-md"
                  height="300"
                  src={item.image}
                  style={{
                    aspectRatio: "200/300",
                    objectFit: "cover",
                  }}
                  width="200"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Trending;
