import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { animeInfo } from "@/types/types";

type Props = {
  animeData: animeInfo;
};

export default function Info({ animeData }: Props) {
  
  return (
    <div className=" text-white">
      <div className="flex mx-auto px-4 sm:px-6 lg:px-32 pt-40">
        <div className="flex-none">
          <img
            alt="Rurouni Kenshin: Meiji Kenkaku Romantan (2023)"
            className="w-[200px] h-[300px] rounded-lg shadow-lg"
            height="300"
            src={animeData.anime.info.poster}
            style={{
              aspectRatio: "200/300",
              objectFit: "cover",
            }}
            width="200"
          />
        </div>
        <div className="flex-grow ml-8">
          <h1 className="text-4xl font-bold mb-2">
            {animeData.anime.info.name}
          </h1>
          <div className="flex items-center space-x-2 my-4">
            <Badge variant="secondary">PG-13</Badge>
            <Badge variant="default">HD</Badge>
            <Badge variant="default">24</Badge>
            <Badge variant="default">11</Badge>
            <div className="text-gray-400">TV</div>
            <div className="text-gray-400">22m</div>
          </div>
          <div className="flex space-x-4 my-4">
            <Button variant="default">Watch now</Button>
            <Button variant="secondary">Add to List</Button>
          </div>
          <p className="text-gray-400 leading-loose">
            {animeData.anime.info.description}
          </p>
        </div>
        <div className="flex-none w-[350px] ml-8">
          <div className="text-gray-400">
            Japanese: るろうに剣心 -明治剣客浪漫譚-
          </div>
          <div className="my-4">
            <div className="text-gray-400">
              Aired: Jul 7, 2023 to Dec 15, 2023
            </div>
            <div className="text-gray-400">Premiered: Summer 2023</div>
            <div className="text-gray-400">Duration: 22m</div>
            <div className="text-gray-400">Status: Finished Airing</div>
            <div className="text-gray-400">MAL Score: 7.9</div>
          </div>
          <div className="my-4">
            <div className="text-gray-400">Genres:</div>
            <div className="flex flex-wrap space-x-2">
              <Badge variant="default">Action</Badge>
              <Badge variant="default">Historical</Badge>
              <Badge variant="default">Martial Arts</Badge>
              <Badge variant="default">Romance</Badge>
              <Badge variant="default">Shounen</Badge>
            </div>
          </div>
          <div className="my-4">
            <div className="text-gray-400">Studios: LIDENFILMS</div>
            <div className="text-gray-400">
              Producers: Aniplex, Shueisha, Dentsu, Fuji TV
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
