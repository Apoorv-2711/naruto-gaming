import scrapeHomePage from "@/parser/homePage";
import LatestEpisodes from "./LatestEpisodes";
import NewOnNarutoWatch from "./NewOnNarutoWatch";

const LeftSide = async () => {
  const data = await scrapeHomePage();
  const latestEpisodeData = data.latestEpisodeAnimes;
  const newOnNarutoWatchData = data.latestEpisodeAnimes;
  return (
    <div className="xl:w-3/4 w-full px-4">
      <LatestEpisodes latestEpisodeData={latestEpisodeData} />
      <NewOnNarutoWatch newOnNarutoWatch={newOnNarutoWatchData} />
    </div>
  );
};

export default LeftSide;
