import { SRC_AJAX_URL, SRC_BASE_URL, USER_AGENT_HEADER } from "@/lib/constants";

import { retrieveServerId } from "@/lib/cheerio-methods";
import axios, { AxiosError } from "axios";
import { load, type CheerioAPI } from "cheerio";
import createHttpError, { type HttpError } from "http-errors";

import { type AnimeServer, Servers } from "@/models/anime";

import RapidCloud from "@/extractors/rapidcloud";
import StreamSB from "@/extractors/streamsb";
import StreamTape from "@/extractors/streamtape";

import { type ScrapedAnimeEpisodesSources } from "@/models/parsers/animeEpisodeSrcs";
import { chalkStderr } from "chalk";

//  -> /anime/episode-srcs?id=${episodeId}&server=${serverName}&category=${category (sub | dub)}

async function scrapeAnimeEpisodeSources(
  episodeId: string,
  server: AnimeServer = Servers.Enum.vidstreaming,
  category: "sub" | "dub" = "sub"
): Promise<ScrapedAnimeEpisodesSources | HttpError> {
  if (episodeId.startsWith("http")) {
    const serverUrl = new URL(episodeId);

    switch (server) {
      case Servers.Enum.vidstreaming:
      case Servers.Enum.vidcloud:
        return {
          ...(await new RapidCloud().extract(serverUrl)),
        };
      case Servers.Enum.streamsb:
        return {
          headers: {
            Referer: serverUrl.href,
            watchsb: "streamsb",
            "User-Agent": USER_AGENT_HEADER,
          },
          sources: await new StreamSB().extract(serverUrl, true),
        };
      case Servers.Enum.streamtape:
        return {
          headers: { Referer: serverUrl.href, "User-Agent": USER_AGENT_HEADER },
          sources: await new StreamTape().extract(serverUrl),
        };
      default: // ---> VIDCLOUD
        return {
          headers: { Referer: serverUrl.href },
          ...(await new RapidCloud().extract(serverUrl)),
        };
    }
  }
  const epId = new URL(`/watch/${episodeId}`, SRC_BASE_URL).href;
  console.log(epId, " -> Epidsode ID");

  try {
    console.log(chalkStderr.bgMagenta("Ep ID -> ", epId.split("?ep=")));
    const res = await axios.get(
      `${SRC_AJAX_URL}/v2/episode/servers?episodeId=${epId.split("?ep=")[1]}`,
      {
        headers: {
          Referer: epId,
          "User-Agent": USER_AGENT_HEADER,
          "X-Requested-With": "XMLHttpRequest",
        },
      }
    );
    // console.log(chalkStderr.greenBright(res?.data?.html), " -> HTML");
    console.log(
      chalkStderr.greenBright(JSON.stringify(res.data, null, 2)),
      " -> All Data"
    );

    const $: CheerioAPI = load(res.data.html);

    let serverId: string | null = null;

    try {
      console.log("  SERVER->", server);

      switch (server) {
        case Servers.Enum.vidcloud: {
          serverId = retrieveServerId($, 1, category);
          if (!serverId) throw new Error("RapidCloud not found");
          break;
        }
        case Servers.Enum.vidstreaming: {
          serverId = retrieveServerId($, 4, category);
          console.log("SERVER_ID -> ", serverId);
          if (!serverId) throw new Error("VidStreaming not found");
          break;
        }
        case Servers.Enum.streamsb: {
          serverId = retrieveServerId($, 5, category);
          if (!serverId) throw new Error("StreamSB not found");
          break;
        }
        case Servers.Enum.streamtape: {
          serverId = retrieveServerId($, 3, category);
          if (!serverId) throw new Error("StreamTape not found");
          break;
        }
      }
    } catch (err) {
      throw createHttpError.NotFound("Could not find server id");
    }

    const {
      data: { link },
    } = await axios.get(`${SRC_AJAX_URL}/v2/episode/sources?id=${serverId}`);
    console.log("Link ->", link);

    return await scrapeAnimeEpisodeSources(link, server);
  } catch (err: any) {
    console.log(err);
    if (err instanceof AxiosError) {
      throw createHttpError(
        err?.response?.status || 500,
        err?.response?.statusText || "Something went wrong"
      );
    }
    throw createHttpError.InternalServerError(err?.message);
  }
}

export default scrapeAnimeEpisodeSources;
