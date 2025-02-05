import createHttpError, { type HttpError } from "http-errors";
import type { CheerioAPI, SelectorType } from "cheerio";
import {
  Anime,
  MostPopularAnime,
  Top10Anime,
  Top10AnimeTimePeriod,
} from "@/types/anime";
import { SEARCH_PAGE_FILTERS } from "./constants";
import { FilterKeys } from "@/types/animeSearch";

// scrapper to scrap anime

/**
 * Extracts the anime from the given selector
 * @param $ - CheerioAPI
 * @param selector - SelectorType
 * @param scraperName - string
 * @returns Anime[]
 * @throws HttpError
 * @example
 * extractAnime($, ".film-item", "9anime")
 * // => Anime[]
 * @example
 * extractAnime($, ".film-item", "gogoanime")
 * // => Anime[]
 * @example
 * extractAnime($, ".film-item", "kissanime")
 * // => Anime[]

  */
const extractAnimes = (
  $: CheerioAPI,
  selector: SelectorType,
  scraperName: string
): Anime[] => {
  try {
    const animes: Anime[] = [];
    //  finding the anime id

    /* 
anime id is found in the link tag under the film-name class div with link which has /${id}
    eg : 
    <div class="film-name">
    <a href="/one-piece-100" class="dynamic-name" >One Piece</a>
    </div>

*/
    $(selector).each((_, el) => {
      const animeId =
        $(el)
          .find(".film-detail .film-name .dynamic-name")
          ?.attr("href")
          ?.slice(1)
          .split("?ref=search")[0] || null;

      animes.push({
        id: animeId,
        name: $(el)
          .find(".film-detail .film-name .dynamic-name")
          ?.text()
          ?.trim(),
        jname:
          $(el)
            .find(".film-detail .film-name .dynamic-name")
            ?.attr("data-jname")
            ?.trim() || null,
        poster:
          $(el)
            .find(".film-poster .film-poster-img")
            ?.attr("data-src")
            ?.trim() || null,
        duration: $(el)
          .find(".film-detail .fd-infor .fdi-item.fdi-duration")
          ?.text()
          ?.trim(),
        type: $(el)
          .find(".film-detail .fd-infor .fdi-item:nth-of-type(1)")
          ?.text()
          ?.trim(),
        rating: $(el).find(".film-poster .tick-rate")?.text()?.trim() || null,
        episodes: {
          sub:
            Number(
              $(el)
                .find(".film-poster .tick-sub")
                ?.text()
                ?.trim()
                .split(" ")
                .pop()
            ) || null,
          dub:
            Number(
              $(el)
                .find(".film-poster .tick-dub")
                ?.text()
                ?.trim()
                .split(" ")
                .pop()
            ) || null,
        },
      });
    });
    return animes;
  } catch (err) {
    throw createHttpError(500, `Failed to scrap ${scraperName} ${err}`);
  }
};

/**
 * Extracts the top 10 animes from the given selector
 * @param $ - CheerioAPI
 * @param period - Top10AnimeTimePeriod
 * @param scraperName - string
 
 * @returns Top10Anime[]
 * @throws HttpError
 * @example
 * extractTop10Animes($, "9anime")
 * // => Top10Anime[]
 * @example
 * extractTop10Animes($, "gogoanime")
 * // => Top10Anime[]
 *
 */

const extractTop10Animes = (
  $: CheerioAPI,
  period: Top10AnimeTimePeriod,
  scraperName: string
): Top10Anime[] => {
  try {
    const animes: Top10Anime[] = [];
    const selector = `#top-viewed-${period} ul li`;

    $(selector).each((_, el) => {
      animes.push({
        id:
          $(el)
            .find(".film-detail .dynamic-name")
            ?.attr("href")
            ?.slice(1)
            .trim() || null,
        rank: Number($(el).find(".film-number span")?.text()?.trim()) || null,
        name: $(el).find(".film-detail .dynamic-name")?.text()?.trim() || null,
        jname:
          $(el)
            .find(".film-detail .dynamic-name")
            ?.attr("data-jname")
            ?.trim() || null,
        poster:
          $(el)
            .find(".film-poster .film-poster-img")
            ?.attr("data-src")
            ?.trim() || null,
        episodes: {
          sub:
            Number(
              $(el)
                .find(".film-detail .fd-infor .tick-item.tick-sub")
                ?.text()
                ?.trim()
            ) || null,
          dub:
            Number(
              $(el)
                .find(".film-detail .fd-infor .tick-item.tick-dub")
                ?.text()
                ?.trim()
            ) || null,
        },
      });
    });

    return animes;
  } catch (err) {
    throw createHttpError(500, `Failed to scrap ${scraperName} ${err}`);
  }
};

/**
 * 
 * @param $ - CheerioAPI
 * @param selector - SelectorType
 * @param scraperName - string
 * 
 * @returns MostPopularAnime[]
 * @throws HttpError
 * @example
 * extractMostPopularAnimes($, ".film-item", "9anime")
  * // => MostPopularAnime[]
  
 */

const extractMostPopularAnimes = (
  $: CheerioAPI,
  selector: SelectorType,
  scraperName: string
): MostPopularAnime[] => {
  try {
    const animes: MostPopularAnime[] = [];

    $(selector).each((_, el) => {
      animes.push({
        id:
          $(el)
            .find(".film-detail .dynamic-name")
            ?.attr("href")
            ?.slice(1)
            .trim() || null,
        name: $(el).find(".film-detail .dynamic-name")?.text()?.trim() || null,
        jname:
          $(el)
            .find(".film-detail .film-name .dynamic-name")
            .attr("data-jname")
            ?.trim() || null,
        poster:
          $(el)
            .find(".film-poster .film-poster-img")
            ?.attr("data-src")
            ?.trim() || null,
        episodes: {
          sub:
            Number($(el)?.find(".fd-infor .tick .tick-sub")?.text()?.trim()) ||
            null,
          dub:
            Number($(el)?.find(".fd-infor .tick .tick-dub")?.text()?.trim()) ||
            null,
        },
        type:
          $(el)
            ?.find(".fd-infor .tick")
            ?.text()
            ?.trim()
            ?.replace(/[\s\n]+/g, " ")
            ?.split(" ")
            ?.pop() || null,
      });
    });

    return animes;
  } catch (err: any) {
    throw createHttpError(500, `Failed to scrap ${scraperName} ${err}`);
  }
};

/**
 * Function to retrieve the server Id
 * @param $ - CheerioAPI
 * @param index - number
 * @param category - "sub" | "dub" | "raw"
 * @returns string | null
 */

function retrieveServerId(
  $: CheerioAPI,
  index: number,
  category: "sub" | "dub" | "raw"
) {
  return (
    $(`.ps_-block.ps_-block-sub.servers-${category} > .ps__-list .server-item`)
      ?.map((_, el) =>
        $(el).attr("data-server-id") == `${index}` ? $(el) : null
      )
      ?.get()[0]
      ?.attr("data-id") || null
  );
}

/**
 * function to get the genres filter value
 * @param genreNames - string[]
 *
 * @returns string | undefined
 */

function getGenresFilterVal(genreNames: string[]): string | undefined {
  if (genreNames.length < 1) {
    return undefined;
  }
  return genreNames
    .map((name) => SEARCH_PAGE_FILTERS["GENRES_ID_MAP"][name])
    .join(",");
}

/**
 * function to get the search filter value
 * @param key - FilterKeys
 * @param rawValue - string
 * @returns string | undefined
 */
function getSearchFilterValue(
  key: FilterKeys,
  rawValue: string
): string | undefined {
  rawValue = rawValue.trim();
  if (!rawValue) return undefined;

  switch (key) {
    case "genres": {
      return getGenresFilterVal(rawValue.split(","));
    }
    case "type": {
      const val = SEARCH_PAGE_FILTERS["TYPE_ID_MAP"][rawValue] ?? 0;
      return val === 0 ? undefined : `${val}`;
    }
    case "status": {
      const val = SEARCH_PAGE_FILTERS["STATUS_ID_MAP"][rawValue] ?? 0;
      return val === 0 ? undefined : `${val}`;
    }
    case "rated": {
      const val = SEARCH_PAGE_FILTERS["RATED_ID_MAP"][rawValue] ?? 0;
      return val === 0 ? undefined : `${val}`;
    }
    case "score": {
      const val = SEARCH_PAGE_FILTERS["SCORE_ID_MAP"][rawValue] ?? 0;
      return val === 0 ? undefined : `${val}`;
    }
    case "season": {
      const val = SEARCH_PAGE_FILTERS["SEASON_ID_MAP"][rawValue] ?? 0;
      return val === 0 ? undefined : `${val}`;
    }
    case "language": {
      const val = SEARCH_PAGE_FILTERS["LANGUAGE_ID_MAP"][rawValue] ?? 0;
      return val === 0 ? undefined : `${val}`;
    }
    case "sort": {
      return SEARCH_PAGE_FILTERS["SORT_ID_MAP"][rawValue] ?? undefined;
    }
    default:
      return undefined;
  }
}

/**
 *  function to get the search date filter value
 * @param isStartDate - boolean
 * @param rawValue -  string
 * @returns string[] | undefined
 *
 * @example
 * getSearchDateFilterValue(true, "2023-10-11")
 * // => [sy=2023, sm=10, sd=11]
 */
function getSearchDateFilterValue(
  isStartDate: boolean,
  rawValue: string
): string[] | undefined {
  rawValue = rawValue.trim();
  if (!rawValue) return undefined;

  const dateRegex = /^\d{4}-([0-9]|1[0-2])-([0-9]|[12][0-9]|3[01])$/;
  const dateCategory = isStartDate ? "s" : "e";
  const [year, month, date] = rawValue.split("-");

  if (!dateRegex.test(rawValue)) {
    return undefined;
  }

  // sample return -> [sy=2023, sm=10, sd=11]
  return [
    Number(year) > 0 ? `${dateCategory}y=${year}` : "",
    Number(month) > 0 ? `${dateCategory}m=${month}` : "",
    Number(date) > 0 ? `${dateCategory}d=${date}` : "",
  ].filter((d) => Boolean(d));
}

export {
  extractAnimes,
  extractTop10Animes,
  extractMostPopularAnimes,
  retrieveServerId,
  getSearchFilterValue,
  getSearchDateFilterValue,
};
