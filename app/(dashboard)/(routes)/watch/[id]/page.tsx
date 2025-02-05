import { getAnimeEpisodes } from "@/server/narutogaming/scrappers/animeEpisodes";
import { QueryClient } from "@tanstack/react-query";
import React from "react";
import VideoPlayer from "./components/video-player";
import { getEpisodeServers } from "@/server/narutogaming/scrappers/episodeServers";
import { getAnimeEpisodeSources } from "@/server/narutogaming/scrappers/animeEpisodeSrcs";
import { AnimeServers } from "@/types/anime";

type Props = {
  params: {
    id: string;
  };
  searchParams: {
    ep: string;
  };
};

export default async function page({ params, searchParams }: Props) {
  const { id } = params;

  const queryClient = new QueryClient();
  const episodes = await queryClient.fetchQuery({
    queryKey: ["animeWatchInfo", id],
    queryFn: () => getAnimeEpisodes(id),
    staleTime: 0,
  });

  const episodeServer = await queryClient.fetchQuery({
    queryKey: ["episodeServerInfo", searchParams.ep],
    queryFn: () => getEpisodeServers(`${id}?ep=${searchParams.ep}`),
    staleTime: 0,
  });

  const videoSrc = await queryClient.fetchQuery({
    queryKey: ["video-src", searchParams.ep],
    queryFn: () =>
      getAnimeEpisodeSources(
        episodeServer.episodeId,
        episodeServer.sub[0].serverName as AnimeServers,
        "sub"
      ),
    staleTime: 0,
  });

//   console.log(episodeServer);
  console.log(videoSrc);

  return (
    <div className=" text-white">
      <div className="flex mx-auto px-4 sm:px-6 lg:px-32 pt-40">Hello</div>
      <VideoPlayer episodeServer={episodeServer} />
    </div>
  );
}
