"use client";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, PlayCircle } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { animeInfo } from "@/types/types";
import { useQuery } from "@tanstack/react-query";

type InsideHoverCardProps = {
  id: string;
};

const InsideHoverCard: FC<InsideHoverCardProps> = ({ id }) => {
  const getData = async () => {
    const res = await fetch(`https://api-aniwatch.onrender.com/anime/info?id=${id}`);
    const data = await res.json();
    console.log(data);
    return data as animeInfo;
  };

  const { data, isLoading } = useQuery({
    queryKey: [id],
    queryFn: getData,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <Card className="w-[350px] bg-[#49494929] text-white rounded-lg border-none bg-opacity-60 backdrop-blur-lg">
        <div className="flex flex-row justify-center items-center h-full p-4">
          <Loader2 className="animate-spin text-[#f97316]" size={40} />
        </div>
      </Card>
    );
  }

  return (
    <Card className="w-[350px] bg-[#49494929] text-white rounded-lg border-none bg-opacity-60 backdrop-blur-lg">
      <CardHeader>
        <CardTitle className="text-base font-bold">
          {data?.anime.info.name}
        </CardTitle>
        <div className="flex items-center space-x-2 my-2">
          <Badge variant="secondary">{data?.anime.moreInfo.malscore}</Badge>
          <Badge variant="secondary">{data?.anime.info.stats.quality}</Badge>
          <Badge variant="secondary">
            {data?.anime.info.stats.episodes.sub}
          </Badge>
          <Badge variant="secondary">
            {data?.anime.info.stats.episodes.dub}
          </Badge>
          <Badge variant="secondary">{data?.anime.info.stats.type}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-xs text-gray-400">
          {data?.anime?.info?.description
            ?.replace(/(<([^>]+)>)/gi, "")
            .substring(0, 120)}
          {data?.anime?.info?.description?.length &&
            data?.anime?.info?.description?.length > 120 &&
            "..."}
        </p>
        <p className="text-xs my-4 whitespace-break-spaces">
          {data?.anime.moreInfo.japanese &&
            `Japanese: ${data?.anime.moreInfo.japanese}`}
          <br />
          {data?.anime.moreInfo.synonyms &&
            `Synonyms: ${data?.anime.moreInfo.synonyms}`}
          <br />
          {data?.anime.moreInfo.aired && `Aired: ${data?.anime.moreInfo.aired}`}
          <br />
          {data?.anime.moreInfo.status &&
            `Status: ${data?.anime.moreInfo.status}`}
          <br />
          {data?.anime.moreInfo.genres &&
            `Genres: ${data?.anime.moreInfo.genres}`}
        </p>
        <Button className="bg-[#f97316] hover:bg-[#f97431] text-black w-full flex flex-row justify-center">
          <PlayCircle size={15} className="mr-1" />
          <span>Watch Now</span>
        </Button>
      </CardContent>
    </Card>
  );
};

export default InsideHoverCard;
