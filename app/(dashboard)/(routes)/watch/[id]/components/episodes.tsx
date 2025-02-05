import { Button } from "@/components/ui/button";
import { ScrapedAnimeEpisodes } from "@/types/scrapper/animeEpisodes";
import Link from "next/link";
import React from "react";

type Props = {
  episodes: ScrapedAnimeEpisodes;
};

export default function Episodes({ episodes }: Props) {
//   console.log(episodes);
  return (
    <div className="flex space-x-2">
      {episodes.episodes.map((episode) => (
        <Link href={`/watch/${episode.episodeId}`}>
          <Button key={episode.episodeId} variant="secondary">
            {episode.number}
          </Button>
        </Link>
      ))}
    </div>
  );
}
