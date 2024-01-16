// /anime/info?id=${anime-id}

import scrapeAnimeAboutInfo from "@/parser/animeAboutInfoPage";
import { headers } from "next/headers";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
export async function GET(req: NextApiRequest) {
  try {
    // const animeId = req.url?.split("?id=")[1];
    // const headers =
    const headersList = headers();
    const animeId = headersList.get("anime-id");

    if (!animeId)
      return new NextResponse("Anime Id is required..", { status: 400 });

    const animeInfo = await scrapeAnimeAboutInfo(animeId as string);

    return NextResponse.json(animeInfo);
  } catch (err) {
    console.log("[ANIME_ID error]", err);
    return new NextResponse("internal Server Error", { status: 500 });
  }
}
