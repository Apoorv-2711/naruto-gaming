import {
  type ScrapedAnimeCategory,
  CommonAnimeScrapeTypes,
} from "./animeCategory";
import { type MostPopularAnime } from "../anime";

export interface ScrapedAnimeSearchResult
  extends Pick<ScrapedAnimeCategory, CommonAnimeScrapeTypes> {
  mostPopularAnimes: Array<MostPopularAnime> | Error;
}
