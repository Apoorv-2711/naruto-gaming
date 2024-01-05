import {
  AnimeSearchSuggestionSchema,
  type AnimeSearchSuggestion,
} from "../anime";
import * as z from "zod";

export const ScrapedAnimeSearchSuggestionSchema = z.object({
  suggestions: z.array(AnimeSearchSuggestionSchema).or(z.instanceof(Error)),
});

export type ScrapedAnimeSearchSuggestion = z.infer<
  typeof ScrapedAnimeSearchSuggestionSchema
>;
