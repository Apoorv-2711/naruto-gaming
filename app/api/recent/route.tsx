import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { page } = await request.json();
  const getHome = await fetch(
    `https://api.anime-dex.workers.dev/recent/${page}`,
    {
      cache: "no-cache",
    }
  );
  const recent = await getHome.json();
  const data = recent.results;
  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "s-maxage=1, stale-while-revalidate",
    },
  });
}
