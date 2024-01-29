// /anime/episode-srcs?id=${episodeId}&server=${serverName}&category=${category (sub | dub)}
import chalk from "chalk";
type AnilistID = number | null;
type MalID = number | null;

import { SRC_BASE_URL, USER_AGENT_HEADER } from "@/lib/constants";
import { AnimeServer, Servers } from "@/models/anime";
import scrapeAnimeEpisodeSources from "@/parser/animeEpisodeSrcs";
import axios from "axios";
import { CheerioAPI, load } from "cheerio";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const episodeId = req.nextUrl.searchParams.get("id")
      ? decodeURIComponent(req.nextUrl.searchParams.get("id") as string)
      : null;

    const server = (
      req.nextUrl.searchParams.get("server")
        ? decodeURIComponent(req.nextUrl.searchParams.get("server") as string)
        : Servers.Enum.vidstreaming
    ) as AnimeServer;

    const category = (
      req.nextUrl.searchParams.get("category")
        ? decodeURIComponent(req.nextUrl.searchParams.get("category") as string)
        : "sub"
    ) as "sub" | "dub";

    if (!episodeId)
      return new NextResponse("Episode ID is required..", { status: 400 });

    let malID: MalID;
    let anilistID: AnilistID;

    const animeURL = new URL(episodeId?.split("?ep=")[0], SRC_BASE_URL)?.href;

    console.log(chalk.blue(episodeId, " -> Episode ID"));
    console.log(chalk.greenBright(server, " -> Server"));
    console.log(chalk.bgMagenta.blackBright(category, " -> Category"));
    const [episodeSrcData, animeSrc] = await Promise.all([
      scrapeAnimeEpisodeSources(episodeId, server, category),
      axios.get(animeURL, {
        headers: {
          Referer: SRC_BASE_URL,
          "User-Agent": USER_AGENT_HEADER,
          "X-Requested-With": "XMLHttpRequest",
        },
      }),
    ]);
    console.log(chalk.blue(animeSrc?.data, " -> Anime Src"));

    const $: CheerioAPI = load(animeSrc?.data);

    try {
      anilistID = Number(
        JSON.parse($("body")?.find("#syncData")?.text())?.anilist_id
      );
      malID = Number(JSON.parse($("body")?.find("#syncData")?.text())?.mal_id);
    } catch (err) {
      anilistID = null;
      malID = null;
    }

    return NextResponse.json(
      {
        ...episodeSrcData,
        anilistID,
        malID,
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    console.log(chalk.redBright("[EPISODE-SRC error]", err));
    return new NextResponse("internal Server Error", { status: 500 });
  }
}
