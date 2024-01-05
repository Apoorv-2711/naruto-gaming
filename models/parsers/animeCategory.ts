import * as z from "zod";
import { AnimeSchema, Top10AnimeSchema } from "../anime.js";

export const ScrapedAnimeCategorySchema = z.object({
  animes: z.array(AnimeSchema).or(z.instanceof(Error)),
  genres: z.array(z.string()),
  top10Animes: z.object({
    today: Top10AnimeSchema,
    week: Top10AnimeSchema,
    month: Top10AnimeSchema,
  }),
  category: z.string(),
  totalPages: z.number(),
  currentPage: z.number(),
  hasNextPage: z.boolean(),
});
export interface ScrapedAnimeCategory
  extends z.infer<typeof ScrapedAnimeCategorySchema> {}

export const CommonAnimeScrapeTypesSchema = z.union([
  z.literal("animes"),
  z.literal("totalPages"),
  z.literal("hasNextPage"),
  z.literal("currentPage"),
]);

export type CommonAnimeScrapeTypes = z.infer<
  typeof CommonAnimeScrapeTypesSchema
>;
