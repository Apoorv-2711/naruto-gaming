import CarouselItems from "@/components/CarouselItems";
import CommentSection from "@/components/CommentSection";
import RecentSection from "@/components/RecentSection";
import ShareSection from "@/components/ShareSection";
import TopAiringSection from "@/components/TopAiringSection";
import Trending from "@/components/Trending";
import scrapeHomePage from "@/parser/homePage";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
  useQueryClient,
} from "@tanstack/react-query";
import { Metadata } from "next";
import { Suspense } from "react";

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
  const queryClient = new QueryClient();
  const data = await queryClient.fetchQuery({
    queryKey: ["homePage"],
    queryFn: () => scrapeHomePage(),
    staleTime: 0,
  });
  const carouselData = data.spotlightAnimes;
  const trendingData = data.trendingAnimes;
  const topAiringAnimes = data.topAiringAnimes;

  return (
    <div className="h-full">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CarouselItems carouselData={carouselData} />
        <Trending trendingData={trendingData} />
        <ShareSection />
        <CommentSection />
        <TopAiringSection topAiringAnimes={topAiringAnimes} />
        <RecentSection />
      </HydrationBoundary>
    </div>
  );
};

export default home;
