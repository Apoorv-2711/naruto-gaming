import { ScrapedAnimeCategorySchema } from "./animeCategory";

import { ScrapedHomePageSchema } from "./homePage";

import * as z from "zod";

export const ScrapedGenreAnimeSchema = ScrapedAnimeCategorySchema.pick({
  genres: true,
})
  .merge(
    ScrapedHomePageSchema.pick({
      topAiringAnimes: true,
    })
  )
  .merge(
    z.object({
      genreName: z.string(),
    })
  );

export type ScrapedGenreAnime = z.infer<typeof ScrapedGenreAnimeSchema>;
