"use client";
import { home } from "@/types/types";
import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { color } from "framer-motion";

type GenresProps = {
  genresData: home["genres"];
};

const Genres: React.FC<GenresProps> = ({ genresData }) => {
  const [show, setShow] = React.useState(false);
  const [data, setData] = React.useState<home["genres"]>(
    genresData.slice(0, 24)
  );
  const [hover, setHover] = React.useState<boolean>(false);

  useEffect(() => {
    if (show) {
      setData(genresData);
    } else {
      setData(genresData.slice(0, 24));
    }
  }, [show, genresData]);

  const colors = [
    "4CE0D2",
    "F3FFB9",
    "9ae5e6",
    "e28413",
    "09e85e",
    "ef3054",
    "ff0f80",
  ];

  const hoverColors = [
    "hover:bg-[rgba(76, 224, 210, 0.2)]",
    "hover:bg-[rgba(243, 255, 185, 0.2)]",
    "hover:bg-[rgba(154, 229, 230, 0.2)]",
    "hover:bg-[rgba(226, 132, 19, 0.2)]",
    "hover:bg-[rgba(9, 232, 94, 0.2)]",
    "hover:bg-[rgba(239, 48, 84, 0.2)]",
    "hover:bg-[rgba(255, 15, 128, 0.2)]",
  ];

  const genrewithColor = data.map((genre) => {
    return {
      genre: genre,
      color: colors[genresData.indexOf(genre)]
        ? colors[genresData.indexOf(genre)]
        : colors[genresData.indexOf(genre) % 7],
      hoverColors: hoverColors[genresData.indexOf(genre)]
        ? hoverColors[genresData.indexOf(genre)]
        : hoverColors[genresData.indexOf(genre) % 7],
    };
  });
  console.log("genre with color", genrewithColor);
  return (
    <>
      <h3 className="text-2xl  font-bold mt-12 mb-4 text-[#f97316]">Genres</h3>
      <div className=" bg-[#171717] rounded-sm  p-4">
        <div className="grid  grid-cols-3">
          {genrewithColor.map((genre, idx) => (
            <h2
              className={cn(
                `rounded-md w-full p-3 truncate cursor-pointer hover:bg-white/10 text-start transition-all duration-200 `
              )}
              style={{
                color: `#${genre.color}`,
                transition: "all 0.2s ease",
              }}
              key={idx}
            >
              <span className={cn()} style={{}}>
                {genre.genre}
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
    </>
  );
};

export default Genres;

// function getRandomColor() {
//   const letters = "0123456789ABCDEF";
//   let color = "#";
//   for (let i = 0; i < 6; i++) {
//     color += letters[Math.floor(Math.random() * 16)];
//   }
//   return color;
// }
