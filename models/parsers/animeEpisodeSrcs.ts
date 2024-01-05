import * as z from "zod";
import {
  Intro,
  Subtitle,
  Video,
  IntroSchema,
  VideoSchema,
  SubtitleSchema,
} from "@/models/extractor";

export const ScrapedAnimeEpisodesSourcesSchema = z.object({
  headers: z.record(z.string()).optional(),
  intro: IntroSchema.optional(),
  subtitles: z.array(SubtitleSchema).optional(),
  sources: z.array(VideoSchema),
  download: z.string().optional(),
  embedURL: z.string().optional(),
});

export type ScrapedAnimeEpisodesSources = z.infer<
  typeof ScrapedAnimeEpisodesSourcesSchema
>;
