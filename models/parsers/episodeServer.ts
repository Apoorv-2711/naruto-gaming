import { SubEpisodeSchema } from "../anime";
import * as z from "zod";

const DubEpisodeSchema = SubEpisodeSchema;

export const ScrapedEpisodeServerSchema = z.object({
  sub: z.array(SubEpisodeSchema),
  dub: z.array(DubEpisodeSchema),
  episodeNo: z.number(),
  episodeId: z.string(),
});

export type ScrapedEpisodeServer = z.infer<typeof ScrapedEpisodeServerSchema>;
