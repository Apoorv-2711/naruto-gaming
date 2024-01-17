"use client";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, PlayCircle } from "lucide-react";
import { FC } from "react";

import { useQuery } from "@tanstack/react-query";
import Balancer from "react-wrap-balancer";

type InsideHoverCardProps = {
  id: string;
};

const InsideHoverCard: FC<InsideHoverCardProps> = ({ id }) => {
  const getData = async () => {
    const res = await fetch(`/api/anime/info`, {
      headers: {
        "anime-id": id,
      },
      cache: "no-cache",
    });
    const data = await res.json();

    return data;
  };

  const { data, isLoading } = useQuery({
    queryKey: [id],
    queryFn: getData,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <Card className="bg-transparent dark border-none w-full">
        <div className="flex flex-row justify-center items-center h-full p-4">
          <Loader2 className="animate-spin text-[#f97316]" size={40} />
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-transparent dark border-none w-full">
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
        <p className="text-xs my-4 w-full">
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
