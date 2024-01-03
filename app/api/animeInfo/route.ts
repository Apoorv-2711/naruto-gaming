import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { id } = await request.json();
  const getAnimeId = await fetch(
    `https://api.anime-dex.workers.dev/search/${id}`,
    {
      cache: "no-cache",
    }
  );
  const anime = await getAnimeId.json();
  const animeId = anime.results[0].id;
  const getAnimeInfo = await fetch(
    `https://api.anime-dex.workers.dev/anime/${animeId}`,
    {
      cache: "no-cache",
    }
  );
  const data = await getAnimeInfo.json();

  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "s-maxage=1, stale-while-revalidate",
    },
  });
}
