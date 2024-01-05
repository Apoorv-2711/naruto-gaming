import {
  type ScrapedAnimeCategory,
  CommonAnimeScrapeTypes,
} from "./animeCategory";
import { type MostPopularAnime } from "../anime";
import { HttpError } from "http-errors";

export interface ScrapedAnimeSearchResult
  extends Pick<ScrapedAnimeCategory, CommonAnimeScrapeTypes> {
  mostPopularAnimes: Array<MostPopularAnime> | HttpError;
}
