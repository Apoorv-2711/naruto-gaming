import CarouselItems from "@/components/CarouselItems";
import Trending from "@/components/Trending";

const dataForHome = async () => {
  const res = await fetch("http://localhost:3000/api/home");
  const data = await res.json();

  if (res.ok) {
    return data.results;
  } else {
    throw new Error("Error while Fetching carousel Data..");
  }
};

const home = async () => {
  const carouselDataMain = await dataForHome();
  const carouselData = carouselDataMain.anilistTrending;
  const trendingData = carouselDataMain.gogoPopular;

  return (
    <div>
      <CarouselItems carouselData={carouselData} />
      {/* <Separator className="my-2 bg-[#2d29294b] h-1" /> */}
      <Trending trendingData={trendingData} />
    </div>
  );
};

export default home;
