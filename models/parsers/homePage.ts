import * as z from "zod";
import { ScrapedAnimeCategorySchema } from "./animeCategory";
import {
  TrendingAnimeSchema,
  SpotlightAnimeSchema,
  AnimeSchema,
  MostPopularAnimeSchema,
} from "@/models/anime";
import { HttpError } from "http-errors";
const LatestEpisodeAnimeSchema = AnimeSchema;

const TopUpcomingAnime = AnimeSchema;

const TopAiringAnime = MostPopularAnimeSchema;

export const ScrapedHomePageSchema = ScrapedAnimeCategorySchema.pick({
  genres: true,
  top10Animes: true,
}).merge(
  z.object({
    spotlightAnimes: z.array(SpotlightAnimeSchema).or(z.instanceof(HttpError)),
    trendingAnimes: z.array(TrendingAnimeSchema).or(z.instanceof(HttpError)),
    latestEpisodeAnimes: z
      .array(LatestEpisodeAnimeSchema)
      .or(z.instanceof(HttpError)),
    topUpcomingAnimes: z.array(TopUpcomingAnime).or(z.instanceof(HttpError)),
    topAiringAnimes: z.array(TopAiringAnime).or(z.instanceof(HttpError)),
  })
);

export interface ScrapedHomePage
  extends z.TypeOf<typeof ScrapedHomePageSchema> {}
