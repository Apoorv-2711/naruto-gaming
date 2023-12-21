import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const getHome = await fetch("https://api.anime-dex.workers.dev/home", {
    cache: "no-cache",
  });
  const home = await getHome.json();
  const data = home;
  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "s-maxage=1, stale-while-revalidate",
    },
  });
}
