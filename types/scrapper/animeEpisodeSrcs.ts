import { Intro, Subtitle, Video } from "../extractors";

export type ScrapedAnimeEpisodesSources = {
  headers?: {
    [k: string]: string;
  };
  intro?: Intro;
  subtitles?: Subtitle[];
  sources: Video[];
  download?: string;
  embedURL?: string;
};
