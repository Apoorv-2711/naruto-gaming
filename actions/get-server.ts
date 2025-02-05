"use server";

import { getAnimeEpisodeSources } from "@/server/narutogaming/scrappers/animeEpisodeSrcs";
import { AnimeServers } from "@/types/anime";
import { ScrapedEpisodeServers } from "@/types/scrapper/episodeServers";

export const getEpisodeServers = async (
  episodeServer: string,
  selectedServer: AnimeServers
) => {
  const res = await getAnimeEpisodeSources(
    episodeServer,
    selectedServer,
    "sub"
  );
  return res;
};
