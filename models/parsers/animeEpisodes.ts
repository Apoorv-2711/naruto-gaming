import { type AnimeEpisode, AnimeEpisodeSchema } from "../anime";
import * as z from "zod";

export const ScrapedAnimeEpisodesSchema = z.object({
  totalEpisodes: z.number(),
  episodes: z.array(AnimeEpisodeSchema),
});

export type ScrapedAnimeEpisodes = z.infer<typeof ScrapedAnimeEpisodesSchema>;
