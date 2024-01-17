import LeftSide from "./LeftSide";
import RightSide from "./RightSide";

const RecentSection = async () => {

  return (
    <div className="flex xl:flex-row flex-col">
      <LeftSide />
      <RightSide />
      {/* <LatestEpisodes latestEpisodeData={latestEpisodeData} />
      <Genres genresData={genresData} /> */}
    </div>
  );
};

export default RecentSection;
