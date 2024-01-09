import { NextResponse } from "next/server";

// export async function POST(request: Request) {
//   const { id } = await request.json();
//   const getAnimeInfo = await fetch(
//     `http://localhost:3000/anime/info?id=${id}`,
//     {
//       cache: "no-cache",
//     }
//   );
//   const data = await getAnimeInfo.json();

//   return NextResponse.json(data, {
//     headers: {
//       "Cache-Control": "s-maxage=1, stale-while-revalidate",
//     },
//   });
// }
