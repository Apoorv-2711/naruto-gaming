import scrapeHomePage from "@/parser/homePage";
import Genres from "./Genres";
import Top10 from "./Top10";

const RightSide = async () => {
  const data = await scrapeHomePage();
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
