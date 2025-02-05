import { getHomePage } from "@/server/narutogaming/scrappers/homepage";
import Genres from "./Genres";
import Top10 from "./Top10";
import { QueryClient } from "@tanstack/react-query";

const RightSide = async () => {
  const queryClient = new QueryClient();
  const data = await queryClient.fetchQuery({
    queryKey: ["homePage"],
    queryFn: () => getHomePage(),
  });
  const genresData = data.genres;
  const top10Data = data.top10Animes;
  return (
    <div className="xl:w-1/4 w-full px-4 h-fit">
      <Genres genresData={genresData} />
      <Top10 top10Data={top10Data} />
    </div>
  );
};

export default RightSide;
