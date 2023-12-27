"use client";

import { gogoPopular } from "@/types/types";
import Image from "next/image";
import React, { FC } from "react";
import { Button } from "@/components/ui/button";
import {
  FacebookIcon,
  InstagramIcon,
  RedditIcon,
  ShareSvg,
  TelegramIcon,
  TwitterXIcon,
} from "./icons/icons";
import { TwitterLogoIcon } from "@radix-ui/react-icons";

type ShareSectionProps = {};

const ShareSection: FC<ShareSectionProps> = ({}) => {
  return (
    <div className="bg-[#1a1a1a] p-4 flex  items-center justify-start space-x-10">
      <div className="flex items-center space-x-2">
        <Image
          alt="Avatar"
          className="h-10 w-10 rounded-full"
          height="40"
          src="/share-icon.gif"
          style={{
            aspectRatio: "40/40",
            objectFit: "cover",
          }}
          width="40"
        />
        <div>
          <p className="text-white text-sm">
            <span className=" sm:text-base md:text-lg font-bold text-orange-500">
              Share Naruto Gaming
            </span>
            <br />
            to your friends
          </p>
          <p className="text-gray-400 text-xs">87.9k Shares</p>
        </div>
      </div>
      {/* TODO make changes to grid to make it more responsive........ */}
      <div className="sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-1 items-center space-x-2">
        <Button className="bg-[#2AABEE] text-white rounded-full hover:bg-[#2AABEE]/80 hover:transform hover:-translate-y-1 hover:shadow-md hover:shadow-[#2AABEE] transition duration-200 ease-in-out ">
          <TelegramIcon className="h-5 w-5 mr-2  fill-white" />
          Share
        </Button>
        <Button className="text-white bg-black hover:bg-black/80 rounded-full  hover:transform hover:-translate-y-1 hover:shadow-md hover:shadow-black transition duration-200 ease-in-out ">
          <TwitterXIcon className="h-5 w-5 mr-2  fill-white " />
          Tweet
        </Button>
        <Button className=" text-white bg-[#4267B2] hover:bg-[#4267B2]/80 rounded-full  hover:transform hover:-translate-y-1 hover:shadow-md hover:shadow-[#4267B2] transition duration-200 ease-in-out ">
          <FacebookIcon className="h-5 w-5 mr-2  fill-white " />
          Share
        </Button>
        <Button className=" text-white bg-[#FF4500] hover:bg-[#FF4500]/80 rounded-full  hover:transform hover:-translate-y-1 hover:shadow-md hover:shadow-[#FF4500] transition duration-200 ease-in-out ">
          <RedditIcon className="h-5 w-5 mr-2  fill-white " />
          Share
        </Button>
        <Button className=" text-white rounded-full hover:transform hover:-translate-y-1 hover:shadow-md transition duration-200 ease-in-out instagram-gradient">
          <InstagramIcon className="h-5 w-5 mr-2  fill-white" />
          Share
        </Button>
        <Button className=" text-white bg-[#25D366] hover:bg-[#25D366]/80 rounded-full  hover:transform hover:-translate-y-1 hover:shadow-md hover:shadow-[#25D366] transition duration-200 ease-in-out ">
          <ShareSvg className="h-5 w-5   fill-white" />
        </Button>
      </div>
    </div>
  );
};

export default ShareSection;
