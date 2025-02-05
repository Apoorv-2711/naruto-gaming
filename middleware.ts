import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getAnimeEpisodes } from "./server/narutogaming/scrappers/animeEpisodes";

export async function middleware(request: NextRequest) {
  const animeId = request.nextUrl.pathname.split("/")[2];
  if (!animeId) {
    return;
  }
  const data = await getAnimeEpisodes(animeId);
  if (!request.nextUrl.searchParams.has("ep")) {
    return NextResponse.redirect(
      new URL(`/watch/${data.episodes[0].episodeId}`, request.url)
    );
  }
  if (
    request.nextUrl.searchParams.has("ep") &&
    !data.episodes.find(
      (e) =>
        e.episodeId?.split("=")[1] === request.nextUrl.searchParams.get("ep")
    )
  ) {
    return NextResponse.redirect(
      new URL(`/watch/${data.episodes[0].episodeId}`, request.url)
    );
  }
}

export const config = {
  matcher: "/watch/:id*",
};
