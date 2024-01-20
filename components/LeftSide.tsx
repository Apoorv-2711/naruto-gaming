import scrapeHomePage from "@/parser/homePage";
import LatestEpisodes from "./LatestEpisodes";
import NewOnNarutoWatch from "./NewOnNarutoWatch";
import TopUpcoming from "./TopUpcoming";
import EstimateSchedule from "./EstimateSchedule";
import { currentDate, generateDateList } from "@/util/generateDate";

const LeftSide = async () => {
  const dateList = generateDateList();
  const date = currentDate();
  const estimateSchedule = await fetch(
    `https://api-aniwatch.onrender.com/anime/schedule?date=${date}`
  );
  const data = await scrapeHomePage();
  const estimateScheduleData = await estimateSchedule.json();
  const latestEpisodeData = data.latestEpisodeAnimes;
  const newOnNarutoWatchData = data.latestEpisodeAnimes;
  const topUpcomingData = data.topUpcomingAnimes;

  return (
    <div className="xl:w-3/4 w-full px-4">
      <LatestEpisodes latestEpisodeData={latestEpisodeData} />
      <NewOnNarutoWatch newOnNarutoWatchData={newOnNarutoWatchData} />
      <EstimateSchedule
        estimateScheduleData={estimateScheduleData}
        dateList={dateList}
        currentDate={date}
      />
      <TopUpcoming topUpcomingData={topUpcomingData} />
    </div>
  );
};

export default LeftSide;
