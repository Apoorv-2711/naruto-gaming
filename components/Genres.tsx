"use client";
import { home } from "@/types/types";
import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { colors, hoverColors } from "@/lib/constants";
import { ScrapedGenreAnime } from "@/types/scrapper/animeGenre";

type GenresProps = {
  genresData: ScrapedGenreAnime["genres"];
};

const Genres: React.FC<GenresProps> = ({ genresData }) => {
  const [show, setShow] = React.useState(false);
  const [data, setData] = React.useState<home["genres"]>(
    genresData.slice(0, 24)
  );

  useEffect(() => {
    if (show) {
      setData(genresData);
    } else {
      setData(genresData.slice(0, 24));
    }
  }, [show]);

  const genrewithColor = data.map((genre, idx) => {
    return {
      id: idx + 1,
      genre: genre,
      color: colors[genresData.indexOf(genre)]
        ? colors[genresData.indexOf(genre)]
        : colors[genresData.indexOf(genre) % 7],
      hoverColors: hoverColors[genresData.indexOf(genre)]
        ? hoverColors[genresData.indexOf(genre)]
        : hoverColors[genresData.indexOf(genre) % 7],
    };
  });

  const [hoverId, setHoverId] = React.useState<number>(0);

  useEffect(() => {
    const target = document.getElementById(`${hoverId}`);
    if (target) {
      target.addEventListener("mouseover", (e) => {
        target.style.backgroundColor = `${hoverColors[+`${hoverId - 1}`]}`;
        console.log("hovered");
      });
      target.addEventListener("mouseleave", (e) => {
        target.style.backgroundColor = "transparent";
      });
    }
  }, [hoverId]);

  return (
    <>
      <h3 className="text-2xl  font-bold mt-12 mb-4 text-[#f97316]">Genres</h3>
      <div className=" bg-[#171717] rounded-sm  p-4">
        <div className="grid group grid-cols-3">
          {genrewithColor.map((genre, idx) => (
            <h2
              id={`${genre.id}`}
              className={`rounded-md w-full p-3 cursor-pointer text-start transition-all duration-200 ease-in truncate`}
              style={{
                color: `#${genre.color}`,
              }}
              onMouseEnter={() => setHoverId(genre.id)}
              key={genre.id}
            >
              <span className={`text-sm font-semibold`}>{genre.genre}</span>
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
