import type { AZListSortOptions } from "../anime.js";
import {
  CommonAnimeScrapeTypes,
  ScrapedAnimeCategory,
} from "./animeCategory.js";

export type ScrapedAnimeAZList = Pick<
  ScrapedAnimeCategory,
  CommonAnimeScrapeTypes
> & {
  sortOption: AZListSortOptions;
};
