import CarouselItems from "@/components/CarouselItems";
import CommentSection from "@/components/CommentSection";
import RecentSection from "@/components/RecentSection";
import ShareSection from "@/components/ShareSection";
import TopSection from "@/components/TopSection";
import Trending from "@/components/Trending";

const dataForHome = async () => {
  const res = await fetch("http://localhost:3000/api/home", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-cache",
  });
  const data = await res.json();

  if (res.ok) {
    return data;
  } else {
    throw new Error("Error while Fetching carousel Data..");
  }
};

const home = async () => {
  const carouselDataMain = await dataForHome();
  const carouselData = carouselDataMain.spotlightAnimes;
  const trendingData = carouselDataMain.trendingAnimes;

  return (
    <div className="h-full">
      <CarouselItems carouselData={carouselData} />
      <Trending trendingData={trendingData} />
      <ShareSection />
      {/* <RecentSection /> */}
      <CommentSection />
      <TopSection />
    </div>
  );
};

export default home;
