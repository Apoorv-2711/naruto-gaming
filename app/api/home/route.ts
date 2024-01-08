import { NextRequest, NextResponse } from "next/server";
import scrapeHomePage from "@/parser/homePage";
import { NextApiRequest, NextApiResponse } from "next";
import { ScrapedHomePage } from "@/models/parsers/homePage";

export async function GET(
  req: NextRequest,
  res: NextResponse<ReturnType<typeof scrapeHomePage>>
) {
  try {
    const data = await scrapeHomePage();

    console.log(data, "Data from api..");
    return new Response(JSON.stringify(data), {
      headers: { "content-type": "application/json" },
    });
  } catch (err: any) {
    console.error(err);

    return new Response(JSON.stringify(err));
  }
}
