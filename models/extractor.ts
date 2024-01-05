import * as z from "zod";

export const VideoSchema = z
  .object({
    url: z.string(),
    quality: z.string().optional(),
    isM3U8: z.boolean().optional(),
    size: z.number().optional(),
  })
  .catchall(z.unknown());

type Video = z.infer<typeof VideoSchema>;

export const SubtitleSchema = z.object({
  id: z.string().optional(),
  url: z.string(),
  lang: z.string(),
});

type Subtitle = z.infer<typeof SubtitleSchema>;

export const IntroSchema = z.object({
  start: z.number(),
  end: z.number(),
});

type Intro = z.infer<typeof IntroSchema>;

export type { Video, Subtitle, Intro };
