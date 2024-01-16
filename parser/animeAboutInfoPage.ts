import {
  SRC_HOME_URL,
  ACCEPT_HEADER,
  USER_AGENT_HEADER,
  ACCEPT_ENCODING_HEADER,
  SRC_BASE_URL,
} from "@/lib/constants";

import { extractAnimes, extractMostPopularAnimes } from "@/lib/cheerio-methods";

import axios, { AxiosError } from "axios";
import createHttpError, { type HttpError } from "http-errors";
import { load, type CheerioAPI, type SelectorType } from "cheerio";
import { type ScrapedAnimeAboutInfo } from "@/models/parsers/animeAboutInfo";

//anime/info?id=${anime-id}

async function scrapeAnimeAboutInfo(
  id: string
): Promise<ScrapedAnimeAboutInfo | HttpError> {
  const result: ScrapedAnimeAboutInfo = {
    anime: {
      info: {
        id: null,
        name: null,
        poster: null,
        description: null,
        stats: {
          rating: null,
          quality: null,
          episodes: {
            sub: null,
            dub: null,
          },
          type: null,
          duration: null,
        },
      },
      moreInfo: {},
    },
    seasons: [],
    mostPopularAnimes: [],
    relatedAnimes: [],
    recommendedAnimes: [],
  };

  try {
    const animeUrl: URL = new URL(id, SRC_BASE_URL);
    const mainPage = await axios.get(animeUrl.href, {
      headers: {
        "User-Agent": USER_AGENT_HEADER,
        "Accept-Encoding": ACCEPT_ENCODING_HEADER,
        Accept: ACCEPT_HEADER,
      },
    });

    const $: CheerioAPI = load(mainPage.data);

    const selector: SelectorType = "#ani_detail .container .anis-content";

    const animeInfoId =
      $(selector)
        ?.find(".anisc-detail .film-buttons .btn-play")
        ?.attr("href")
        ?.split("/")
        ?.pop() || null;
    // for getting Japanes name search for data-janame attr (data-janame="name") ===> FOR Futuure USE (VK)
    const animeInfoName =
      $(selector)
        ?.find(".anisc-detail .film-name .dynamic-name")
        ?.text()
        ?.trim() || null;

    const animeInfoPoster =
      $(selector)?.find(".film-poster .film-poster-img")?.attr("src")?.trim() ||
      null;

    const animeInfoDescription =
      $(selector)
        ?.find(".anisc-detail .film-description .text")
        ?.text()
        ?.split("[")
        ?.shift()
        ?.trim() || null;

    const animeStatsRating =
      $(selector)
        ?.find(".anisc-detail .film-stats .tick .tick-pg")
        ?.text()
        ?.trim() || null;

    const animeStatsQuality =
      $(selector)
        ?.find(".anisc-detail .film-stats .tick .tick-quality")
        ?.text()
        ?.trim() || null;

    const animeStatsEpisodesSub =
      $(selector)
        ?.find(".anisc-detail .film-stats .tick .tick-sub")
        ?.text()
        ?.trim() || null;
    const animeStatsEpisodesDub =
      $(selector)
        ?.find(".anisc-detail .film-stats .tick .tick-dub")
        ?.text()
        ?.trim() || null;

    const animeInfoStatsType =
      $(selector)
        ?.find(".anisc-detail .film-stats .tick ")
        ?.text()
        ?.trim()
        ?.replace(/[\s\n]+/g, " ")
        ?.split(" ")
        ?.at(-2) || null;

    const animeInfoStatsDuration =
      $(selector)
        ?.find(".anisc-detail .film-stats .tick ")
        ?.text()
        ?.trim()
        ?.replace(/[\s\n]+/g, " ")
        ?.split(" ")
        ?.pop() || null;

    result.anime.info.id = animeInfoId;
    result.anime.info.name = animeInfoName;
    result.anime.info.poster = animeInfoPoster;
    result.anime.info.description = animeInfoDescription;
    result.anime.info.stats.rating = animeStatsRating;
    result.anime.info.stats.quality = animeStatsQuality;
    result.anime.info.stats.episodes = {
      sub: Number(animeStatsEpisodesSub),
      dub: Number(animeStatsEpisodesDub),
    };
    result.anime.info.stats.type = animeInfoStatsType;
    result.anime.info.stats.duration = animeInfoStatsDuration;

    //More Info

    $(`${selector} .anisc-info-wrap .anisc-info .item:not(.w-hide)`).each(
      (i, el) => {
        let key = $(el)
          .find(".item-head")
          .text()
          .toLowerCase()
          .replace(":", "")
          .trim();
        key = key.includes(" ") ? key.replace(" ", "") : key;

        const value = [
          ...$(el)
            .find("*:not(.item-head)")
            .map((i, el) => $(el).text().trim()),
        ]
          .map((i) => `${i}`)
          .toString()
          .trim();

        if (key === "genres") {
          result.anime.moreInfo[key] = value.split(",").map((i) => i.trim());
          return;
        }
        if (key === "producers") {
          result.anime.moreInfo[key] = value.split(",").map((i) => i.trim());
          return;
        }
        result.anime.moreInfo[key] = value;
      }
    );

    //   Seasons
    const seasonSelector: SelectorType = "#main-content .os-list a.os-item";
    $(seasonSelector).each((_, el) => {
      const seasonId = $(el)?.attr("href")?.slice(1)?.trim() || null;
      const seasonName = $(el)?.attr("title")?.trim() || null;
      const seasonTitle = $(el)?.find(".title")?.text()?.trim();
      const seasonPoster =
        $(el)
          ?.find(".season-poster")
          ?.attr("style")
          ?.split(" ")
          ?.pop()
          ?.split("(")
          ?.pop()
          ?.split(")")[0] || null;
      const isCurrentSeason = $(el).hasClass("active");

      result.seasons.push({
        id: seasonId,
        name: seasonName,
        title: seasonTitle,
        poster: seasonPoster,
        isCurrent: isCurrentSeason,
      });
    });
    const relatedAnimeSelector: SelectorType =
      "#main-sidebar .block_area .block_area_sidebar .block_area-realtime:nth-of-type(1) .anif-block-ul ul li";
    result.relatedAnimes = extractMostPopularAnimes($, relatedAnimeSelector);

    const mostPopularSelector: SelectorType =
      "#main-sidebar .block_area.block_area_sidebar.block_area-realtime:nth-of-type(2) .anif-block-ul ul li";
    result.mostPopularAnimes = extractMostPopularAnimes($, mostPopularSelector);

    const recommendedAnimeSelector: SelectorType =
      "#main-content .block_area.block_area_category .tab-content .flw-item";
    result.recommendedAnimes = extractAnimes($, recommendedAnimeSelector);

    return result;
  } catch (err: any) {
    if (err instanceof AxiosError) {
      throw createHttpError(
        err.response?.status || 500,
        err.response?.statusText || "Something went wrong"
      );
    }
    throw createHttpError(500, "Internal Server Error");
  }
}

export default scrapeAnimeAboutInfo;
