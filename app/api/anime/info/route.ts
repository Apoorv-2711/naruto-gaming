// /anime/info?id=${anime-id}

import { getAnimeAboutInfo } from "@/server/narutogaming/scrappers/animeAboutInfo";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
  try {
    const animeId = req.nextUrl.searchParams.get("id");

    // const headersList = headers();
    // const animeId = headersList.get("anime-id");

    if (!animeId)
      return new NextResponse("Anime Id is required..", { status: 400 });

    const animeInfo = await getAnimeAboutInfo(animeId as string);

    return NextResponse.json(animeInfo);
  } catch (err) {
    console.log("[ANIME_ID error]", err);
    return new NextResponse("internal Server Error", { status: 500 });
  }
}
