"use client";

import { getEpisodeServers } from "@/actions/get-server";
import { getAnimeEpisodeSources } from "@/server/narutogaming/scrappers/animeEpisodeSrcs";
import { AnimeServers } from "@/types/anime";
import { ScrapedAnimeEpisodesSources } from "@/types/scrapper/animeEpisodeSrcs";
import { ScrapedEpisodeServers } from "@/types/scrapper/episodeServers";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Player from "./Player";

type Props = {
  episodeServer: ScrapedEpisodeServers;
  videoSrc: ScrapedAnimeEpisodesSources;
};

export default function VideoPlayer({ episodeServer, videoSrc }: Props) {
  // {
  //     sub: [
  //       { serverName: 'hd-1', serverId: 4 },
  //       { serverName: 'hd-2', serverId: 1 }
  //     ],
  //     dub: [
  //       { serverName: 'hd-1', serverId: 4 },
  //       { serverName: 'hd-2', serverId: 1 }
  //     ],
  //     raw: [],
  //     episodeId: 'one-piece-100?ep=2142',
  //     episodeNo: 1
  //   }
  //   const [selectedServer, setSelectedServer] = useState<AnimeServers>(
  //     episodeServer.sub[0].serverName as AnimeServers
  //   );
  // //   const videoSrc = useQuery({
  // //     queryKey: ["videoSrc", episodeServer.episodeId, selectedServer],
  // //     queryFn: async () =>
  // //       await getEpisodeServers(episodeServer.episodeId, selectedServer),
  // //   });
  // const videoSrc = await getEpisodeServers(episodeServer.episodeId, selectedServer);

  //   console.log(videoSrc, "videoSrc");
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full max-w-5xl">
        <div className="mb-4 text-center">
          <h1 className="text-2xl font-bold mb-2">Advanced Video Player</h1>
          <p className="text-sm text-gray-600">
            Tip: Double-tap on the left or right side of the video to skip
            backward or forward by 10 seconds.
          </p>
        </div>
        <Player
          sources={videoSrc.sources}
          tracks={videoSrc.tracks}
          intro={videoSrc.intro}
          outro={videoSrc.outro}
        />
      </div>
    </main>
  );
}
