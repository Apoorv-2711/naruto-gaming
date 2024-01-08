import type {
  Anime,
  Top10Anime,
  MostPopularAnime,
  Top10AnimeTimePeriod,
} from "@/models/anime";
import createHttpError, { type HttpError } from "http-errors";
import type { CheerioAPI, SelectorType } from "cheerio";

export const extractAnimes = (
  $: CheerioAPI,
  selector: SelectorType
): Anime[] | HttpError => {
  try {
    const animes: Anime[] = [];

    $(selector).each((_, el) => {
      /*
        URL looks like this: /jujutsu-kaisen-2nd-season-18413?ref=search
        we want to extract the animeId from the url which is "jujustu-kaisen-2nd-season-18413" in this case

    */

      const animeId =
        $(el)
          .find(".film-detail .film-name .dynamic-name")
          ?.attr("href")
          ?.slice(1)
          .split("?ref=search")[0] || null;

      const animeName = $(el)
        .find(".film-detail .film-name .dynamic-name")
        ?.text()
        ?.trim();

      const animePoster =
        $(el).find(".film-poster .film-poster-img")?.attr("data-src")?.trim() ||
        null;

      const animeDuration =
        $(el)
          .find(".film-detail .fd-infor .fdi-item .fdi-duration")
          ?.text()
          ?.trim() || null;

      const animeType =
        $(el)
          .find(".film-detail .fd-infor .fdi-item:nth-of-type(1)")
          ?.text()
          ?.trim() || null;

      const animeRating =
        $(el).find(".film-poster .tick-rate")?.text()?.trim() || null;

      const animeEpisodeSub =
        Number(
          $(el).find(".film-poster .tick-sub")?.text()?.trim().split(" ").pop()
        ) || null; // <div class="tick-item tick-sub"><i class="fas fa-closed-captioning mr-1"></i>23</div>

      const animeEpisodeDub =
        Number(
          $(el).find(".film-poster .tick-dub")?.text()?.trim().split(" ").pop()
        ) || null; // <div class="tick-item tick-dub"><i class="fas fa-closed-captioning mr-1"></i>23</div>

      animes.push({
        id: animeId,
        name: animeName,
        poster: animePoster,
        duration: animeDuration,
        type: animeType,
        rating: animeRating,
        episodes: {
          sub: animeEpisodeSub,
          dub: animeEpisodeDub,
        },
      });
    });
    return animes;
  } catch (err: any) {
    throw createHttpError.InternalServerError(
      err?.message || "Something went wrong"
    );
  }
};

export const extractTop10Animes = (
  $: CheerioAPI,
  period: Top10AnimeTimePeriod
): Top10Anime[] | HttpError => {
  try {
    const animes: Top10Anime[] = [];
    /*
            In the top10anime div there are 3 divs with ids top-10-day , top-10-week , top-10-month
             so we have to take the day week month from the period which is defined above
        */
    const selector = `#top-viewed-${period} ul li `;

    $(selector).each((_, el) => {
      const animeId =
        $(el)
          .find(".film-detail .dynamic-name")
          ?.attr("href")
          ?.slice(1)
          .trim() || null;

      const animeRank =
        Number($(el).find(".film-number span")?.text()?.trim()) || null;

      const animeName =
        $(el).find(".film-detail .dynamic-name")?.text()?.trim() || null;

      const ainmePoster =
        $(el).find(".film-poster .film-poster-img")?.attr("data-src")?.trim() ||
        null;

      const animeEpisodeSub =
        Number(
          $(el)
            .find(".film-detail .fd-infor .tick-item.tick-sub")
            ?.text()
            ?.trim()
        ) || null;

      const animeEpisodeDub =
        Number(
          $(el)
            .find(".film-detail .fd-infor .tick-item.tick-dub")
            ?.text()
            ?.trim()
        ) || null;

      animes.push({
        id: animeId,
        rank: animeRank,
        name: animeName,
        poster: ainmePoster,
        episodes: {
          sub: animeEpisodeSub,
          dub: animeEpisodeDub,
        },
      });
    });
    return animes;
  } catch (err: any) {
    throw createHttpError.InternalServerError(
      err?.message || "Something went wrong"
    );
  }
};

export const extractMostPopularAnimes = (
  $: CheerioAPI,
  selector: SelectorType
): MostPopularAnime[] | HttpError => {
  try {
    const animes: MostPopularAnime[] = [];

    $(selector).each((_, el) => {
      const animeId =
        $(el)
          .find(".film-detail .dynamic-name")
          ?.attr("href")
          ?.slice(1)
          .trim() || null;

      const animeName =
        $(el).find(".film-detail .dynamic-name")?.text()?.trim() || null;

      const animePoster =
        $(el).find(".film-poster .film-poster-img")?.attr("data-src")?.trim() ||
        null;

      const animeEpisodesSub =
        Number($(el)?.find(".fd-infor .tick .tick-sub")?.text()?.trim()) ||
        null;

      const animeEpisodesDub =
        Number($(el)?.find(".fd-infor .tick .tick-dub")?.text()?.trim()) ||
        null;

      const animeType =
        $(el)
          ?.find(".fd-infor .tick")
          ?.text()
          ?.trim()
          ?.replace(/[\s\n]+/g, " ")
          ?.split(" ")
          ?.pop() || null;

      const animeJName =
        $(el)
          .find(".film-detail .film-name .dynamic-name")
          .attr("data-jname")
          ?.trim() || null;

      animes.push({
        id: animeId,
        name: animeName,
        poster: animePoster,
        episodes: {
          sub: animeEpisodesSub,
          dub: animeEpisodesDub,
        },
        type: animeType,
        jname: animeJName,
      });
    });

    return animes;
  } catch (err: any) {
    throw createHttpError.InternalServerError(
      err?.message || "Something went wrong"
    );
  }
};

export function retrieveServerId(
  $: CheerioAPI,
  index: number,
  category: "sub" | "dub"
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
