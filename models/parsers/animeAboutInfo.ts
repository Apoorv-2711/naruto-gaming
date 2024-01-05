import type {
  Season,
  RelatedAnime,
  RecommendedAnime,
  AnimeGeneralAboutInfo,
} from "../anime";

import type { ScrapedAnimeSearchResult } from "./animeSearch";

export interface ScrapedAnimeAboutInfo
  extends Pick<ScrapedAnimeSearchResult, "mostPopularAnimes"> {
  anime: {
    info: AnimeGeneralAboutInfo;
    moreInfo: Record<string, string | string[]>;
  };
  seasons: Season[];
  relatedAnimes: RelatedAnime[] | Error;
  recommendedAnimes: RecommendedAnime[] | Error;
}
