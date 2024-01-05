import { type AnimeServer } from "../anime";

export type AnimeEpisodeSrcsQueryParams = {
  id?: string;
  server?: AnimeServer;
  category?: "sub" | "dub";
};
