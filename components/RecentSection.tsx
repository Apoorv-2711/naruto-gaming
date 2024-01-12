import scrapeHomePage from "@/parser/homePage";
import Genres from "./Genres";
import LatestEpisodes from "./LatestEpisodes";

const RecentSection = async () => {
  const data = await scrapeHomePage();
  const latestEpisodeData = data.latestEpisodeAnimes;

  return (
    <div className="flex xl:flex-row flex-col">
      <LatestEpisodes latestEpisodeData={latestEpisodeData} />
      <Genres />
    </div>
  );
};

export default RecentSection;
