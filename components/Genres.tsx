"use client";
import { home } from "@/types/types";
import React, { useEffect } from "react";
import { Button } from "./ui/button";

type GenresProps = {
  genresData: home["genres"];
};

const Genres: React.FC<GenresProps> = ({ genresData }) => {
  const [show, setShow] = React.useState(false);
  const [data, setData] = React.useState<home["genres"]>(genresData.slice(0, 24));

  const colors = React.useMemo(() => {
    return genresData.map((genre) => getRandomColor());
  }, [genresData]);
  
  useEffect(() => {
    if (show) {
      setData(genresData);
    } else {
      setData(genresData.slice(0, 24));
    }
  } , [show, genresData]);

  return (
    <div className="xl:w-1/4 w-full px-4 h-fit">
      <h3 className="text-2xl  font-bold mt-12 mb-4 text-red-500">Genres</h3>
      <div className=" bg-[#252424]  p-4">
        <div className="flex flex-wrap gap-3 justify-start ">
          {data.map((genre) => (
            <h2
              className="flex basis-1/4 flex-row  text-white rounded-md  mb-2 mx-3 whitespace-nowrap"
              key={genre}
            >
              <span className="text-sm font-semibold"
              style={{color: colors[genresData.indexOf(genre)]}}
              >
                {genre}
              </span>
            </h2>
          ))}
        </div>
          <Button
            className="flex flex-row text-white rounded-md w-full mt-2"
            onClick={() => setShow(!show)}
            variant={"outline"}
          >
            <span className="text-sm font-semibold">
              {show ? "Show Less" : "Show More"}
            </span>
          </Button>
      </div>
    </div>
  );
};

export default Genres;


function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}