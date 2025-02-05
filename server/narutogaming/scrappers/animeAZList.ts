import { extractAnimes } from "@/lib/cheerio-methods";
import { AZ_LIST_SORT_OPTIONS, SRC_BASE_URL } from "@/lib/constants";
import { client } from "@/server/config/client";
import { AZListSortOptions } from "@/types/anime";
import { ScrapedAnimeAZList } from "@/types/scrapper/animeAZList";
import { load, type CheerioAPI, type SelectorType } from "cheerio";
import createHttpError from "http-errors";

export async function getAZList(
  sortOption: AZListSortOptions,
  page: number
): Promise<ScrapedAnimeAZList> {
  const res: ScrapedAnimeAZList = {
    sortOption: sortOption.trim() as AZListSortOptions,
    animes: [],
    totalPages: 0,
    hasNextPage: false,
    currentPage: (Number(page) || 0) < 1 ? 1 : Number(page),
  };
  sortOption = res.sortOption;
  page = res.currentPage;

  try {
    if (
      sortOption === ("" as AZListSortOptions) ||
      !Boolean(AZ_LIST_SORT_OPTIONS[sortOption])
    ) {
      throw createHttpError(400, `Invalid sort option ${sortOption}`);
    }

    switch (sortOption) {
      case "all":
        sortOption = "" as AZListSortOptions;
        break;
      case "other":
        sortOption = "other";
        break;
      default:
        sortOption = sortOption.toUpperCase() as AZListSortOptions;
    }

    const azURL: URL = new URL(
      `/az-list/${sortOption}?page=${page}`,
      SRC_BASE_URL
    );

    const resp = await client.get<string>(azURL.href);
    const $: CheerioAPI = load(resp.data);

    const selector: SelectorType =
      "#main-wrapper .tab-content .film_list-wrap .flw-item";

    res.hasNextPage =
      $(".pagination > li").length > 0
        ? $(".pagination li.active").length > 0
          ? $(".pagination > li").last().hasClass("active")
            ? false
            : true
          : false
        : false;

    res.totalPages =
      Number(
        $('.pagination > .page-item a[title="Last"]')
          ?.attr("href")
          ?.split("=")
          .pop() ??
          $('.pagination > .page-item a[title="Next"]')
            ?.attr("href")
            ?.split("=")
            .pop() ??
          $(".pagination > .page-item.active a")?.text()?.trim()
      ) || 1;

    res.animes = extractAnimes($, selector, getAZList.name);

    if (res.animes.length === 0 && !res.hasNextPage) {
      res.totalPages = 0;
    }

    return res;
  } catch (err: any) {
    throw new Error(`Failed to scrap az-list ${err} at ${getAZList.name}`);
  }
}
