import scrapeHomePage from "@/parser/homePage";
import LatestEpisodes from "./LatestEpisodes";
import NewOnNarutoWatch from "./NewOnNarutoWatch";
import TopUpcoming from "./TopUpcoming";

const LeftSide = async () => {
  const data = await scrapeHomePage();
  const latestEpisodeData = data.latestEpisodeAnimes;
  const newOnNarutoWatchData = data.latestEpisodeAnimes;
  const topUpcomingData = data.topUpcomingAnimes;
  return (
    <div className="xl:w-3/4 w-full px-4">
      <LatestEpisodes latestEpisodeData={latestEpisodeData} />
      <NewOnNarutoWatch newOnNarutoWatchData={newOnNarutoWatchData} />
      <TopUpcoming topUpcomingData={topUpcomingData} />
    </div>
  );
};

export default LeftSide;
