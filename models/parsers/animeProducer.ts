import { type ScrapedHomePage, ScrapedHomePageSchema } from "./homePage";
import {
  type ScrapedAnimeCategory,
  ScrapedAnimeCategorySchema,
} from "./animeCategory";

import * as z from "zod";

const ScrapedProducerAnimeSchema = ScrapedAnimeCategorySchema.omit({
  genres: true,
  category: true,
})
  .merge(
    ScrapedHomePageSchema.pick({
      topAiringAnimes: true,
    })
  )
  .merge(
    z.object({
      producerName: z.string(),
    })
  );
export type ScrapedProducerAnime = z.infer<typeof ScrapedProducerAnimeSchema>;
