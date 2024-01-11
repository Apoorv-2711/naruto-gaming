import CarouselItems from "@/components/CarouselItems";
import CommentSection from "@/components/CommentSection";
import RecentSection from "@/components/RecentSection";
import ShareSection from "@/components/ShareSection";
import TopAiringSection from "@/components/TopAiringSection";
import Trending from "@/components/Trending";
import scrapeHomePage from "@/parser/homePage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Naruto Gaming | Home",
  description: "Watch all your favourite anime for free on Naruto Gaming",
};

const home = async () => {
  const data = await scrapeHomePage();
  const carouselData = data.spotlightAnimes;
  const trendingData = data.trendingAnimes;
  const topAiringAnimes = data.topAiringAnimes;

  return (
    <div className="h-full">
      <CarouselItems carouselData={carouselData} />
      <Trending trendingData={trendingData} />
      <ShareSection />
      {/* <RecentSection /> */}
      <CommentSection />
      <TopAiringSection topAiringAnimes={topAiringAnimes} />
    </div>
  );
};

export default home;
