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
  icons: [
    {
      href: "/logo.png",
      sizes: "512x512",
      type: "image/png",
      url: "/logo.png",
    },
  ],
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
      <CommentSection />
      <TopAiringSection topAiringAnimes={topAiringAnimes} />
      <RecentSection />
    </div>
  );
};

export default home;
