import * as z from "zod";
import { ScrapedAnimeCategorySchema } from "./animeCategory";
import {
  TrendingAnimeSchema,
  SpotlightAnimeSchema,
  AnimeSchema,
  MostPopularAnimeSchema,
} from "@/models/anime";

const LatestEpisodeAnimeSchema = AnimeSchema.extend({});

const TopUpcomingAnime = AnimeSchema.extend({});

const TopAiringAnime = MostPopularAnimeSchema.extend({});

export const ScrapedHomePageSchema = ScrapedAnimeCategorySchema.pick({
  genres: true,
  top10Animes: true,
}).merge(
  z.object({
    spotlightAnimes: z.array(SpotlightAnimeSchema).or(z.instanceof(Error)),
    trendingAnimes: z.array(TrendingAnimeSchema).or(z.instanceof(Error)),
    latestEpisodeAnimes: z
      .array(LatestEpisodeAnimeSchema)
      .or(z.instanceof(Error)),
    topUpcomingAnimes: z.array(TopUpcomingAnime).or(z.instanceof(Error)),
    topAiringAnimes: z.array(TopAiringAnime).or(z.instanceof(Error)),
  })
);

export interface ScrapedHomePage
  extends z.TypeOf<typeof ScrapedHomePageSchema> {}
