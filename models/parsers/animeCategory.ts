import * as z from "zod";
import { AnimeSchema, Top10AnimeSchema } from "../anime.js";
import { HttpError } from "http-errors";

export const ScrapedAnimeCategorySchema = z.object({
  animes: z.array(AnimeSchema).or(z.instanceof(HttpError)),
  genres: z.array(z.string()),
  top10Animes: z.object({
    today: z.array(Top10AnimeSchema).or(z.instanceof(HttpError)),
    week: z.array(Top10AnimeSchema).or(z.instanceof(HttpError)),
    month: z.array(Top10AnimeSchema).or(z.instanceof(HttpError)),
  }),
  category: z.string(),
  totalPages: z.number(),
  currentPage: z.number(),
  hasNextPage: z.boolean(),
});

export type ScrapedAnimeCategory = z.infer<typeof ScrapedAnimeCategorySchema>;

export const CommonAnimeScrapeTypesSchema = z.union([
  z.literal("animes"),
  z.literal("totalPages"),
  z.literal("hasNextPage"),
  z.literal("currentPage"),
]);

export type CommonAnimeScrapeTypes = z.infer<
  typeof CommonAnimeScrapeTypesSchema
>;
