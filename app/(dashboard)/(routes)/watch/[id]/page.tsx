import { getAnimeEpisodes } from "@/server/narutogaming/scrappers/animeEpisodes";
import { QueryClient } from "@tanstack/react-query";
import React from "react";
import VideoPlayer from "./components/video-player";
import { getEpisodeServers } from "@/server/narutogaming/scrappers/episodeServers";
import { getAnimeEpisodeSources } from "@/server/narutogaming/scrappers/animeEpisodeSrcs";
import { AnimeServers } from "@/types/anime";
import Episodes from "./components/episodes";

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
    queryKey: ["animeWatchInfo", id, searchParams.ep],
    queryFn: async () => await getAnimeEpisodes(id),
    staleTime: 0,
  });

  const episodeServer = await queryClient.fetchQuery({
    queryKey: ["episodeServerInfo", searchParams.ep, id],
    queryFn: async () => await getEpisodeServers(`${id}?ep=${searchParams.ep}`),
    staleTime: 0,
  });

  const videoSrc = (await queryClient.fetchQuery({
    queryKey: [
      "video-src",
      searchParams.ep,
      episodeServer.sub[0].serverName,
      id,
    ],
    queryFn: async () =>
      await getAnimeEpisodeSources(
        episodeServer.episodeId,
        episodeServer.sub[0].serverName as AnimeServers,
        "sub"
      ),
    staleTime: 0,
  })) as {
    sources: { url: string; type: string }[];
    tracks: { file: string; label: string; kind: string; default?: boolean }[];
    intro: { start: number; end: number };
    outro: { start: number; end: number };
  };

  //   console.log(episodeServer);
  console.log(videoSrc);

  return (
    <div className=" text-white">
      <div className="flex mx-auto px-4 sm:px-6 lg:px-32 pt-40">Hello</div>
      <VideoPlayer episodeServer={episodeServer} videoSrc={videoSrc} />
      <Episodes episodes={episodes} />
    </div>
  );
}
