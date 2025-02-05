"use client";

import { getEpisodeServers } from "@/actions/get-server";
import { getAnimeEpisodeSources } from "@/server/narutogaming/scrappers/animeEpisodeSrcs";
import { AnimeServers } from "@/types/anime";
import { ScrapedEpisodeServers } from "@/types/scrapper/episodeServers";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

type Props = {
  episodeServer: ScrapedEpisodeServers;
};

export default function VideoPlayer({ episodeServer }: Props) {
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
  return <div>VideoPlayer</div>;
}
