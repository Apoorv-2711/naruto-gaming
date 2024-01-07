"use client";
import { FC, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { Switch } from "./ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import Image from "next/image";

type CommentSectionProps = {};

const CommentSection: FC<CommentSectionProps> = ({}) => {
  const [showComments, setShowComments] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>("newest_comment");

  const cardData = [
    {
      avatar: "/placeholder.svg?height=40&width=40",
      avatarFallback: "AK",
      name: "Arika",
      description: "- 4 minutes ago",
      comment: "Don't show this episode to hancock 😳",
      badge: "One Piece",
    },
    {
      avatar: "/placeholder.svg?height=40&width=40",
      avatarFallback: "LS",
      name: "Lost soul",
      description: "ANGELFISH - 4 minutes ago",
      comment: "rate the animation 🔥 or 💩",
      badge: "One Piece",
    },
    {
      avatar: "/placeholder.svg?height=40&width=40",
      avatarFallback: "AK",
      name: "Arika",
      description: "- 4 minutes ago",
      comment: "Don't show this episode to hancock 😳",
      badge: "One Piece",
    },
    {
      avatar: "/placeholder.svg?height=40&width=40",
      avatarFallback: "AK",
      name: "Arika",
      description: "- 4 minutes ago",
      comment: "Don't show this episode to hancock 😳",
      badge: "One Piece",
    },
  ];

  const handleShowComments = () => {
    setShowComments((prev) => !prev);
  };

  if (!showComments) {
    return (
      <div className="bg-[#262525] p-6 h-[100px]">
        <div className="flex justify-center items-center h-full">
          <div className="flex flex-row  justify-center items-center gap-x-2 border border-gray-500 p-3 rounded-xl">
            <Label className="text-white" htmlFor="show-comments">
              Show Comments
            </Label>
            <Switch
              checked={showComments}
              id="show-comments"
              onClick={handleShowComments}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={"bg-[#262525] flex flex-row h-[300px]"}>
      <div className="w-[300px] h-[300px] flex flex-col justify-end">
        <Image
          alt="comment"
          className="relative h-[300px] min-w-[300px] rounded-xl"
          height="1080"
          src="https://aniwatch.to/images/discussion.png"
          width="1080"
        />
      </div>
      <div className="p-6 absolute left-[300px]">
        <div className="flex justify-between items-center mb-4">
          <Tabs defaultValue={activeTab}>
            <TabsList className="bg-transparent">
              <TabsTrigger
                value="newest_comment"
                className="text-white hover:text-gray-300 transition-colors duration-200 data-[state=active]:bg-transparent  data-[state=active]:border-2 data-[state=active]:border-[#f97316] data-[state=active]:text-[#f97316] rounded-3xl"
                onClick={() => setActiveTab("newest_comment")}
              >
                Newest Comments
              </TabsTrigger>
              <TabsTrigger
                value="top_comment"
                className="text-white hover:text-gray-300 transition-colors duration-200 data-[state=active]:bg-transparent data-[state=active]:border-2 data-[state=active]:border-[#f97316] data-[state=active]:text-[#f97316] rounded-3xl"
                onClick={() => setActiveTab("top_comment")}
              >
                Top Comments
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="flex flex-row  justify-center items-center gap-x-2">
            <Label className="text-white" htmlFor="show-comments">
              Show Comments
            </Label>
            <Switch
              checked={showComments}
              id="show-comments"
              onClick={handleShowComments}
            />
          </div>
        </div>
        <div className="flex overflow-x-auto py-4 space-x-6">
          {cardData.map((item, idx) => {
            return (
              <Card className="flex flex-col justify-between w-[300px] hover:bg-[#525252] transition-colors duration-200 rounded-lg shadow-lg border-none bg-gradient-to-t to-[#414040] from-[#262525]">
                <CardHeader className="space-y-4">
                  <div className="flex items-center justify-start space-x-2">
                    <Avatar>
                      <AvatarImage alt={item.name} src={item.avatar} />
                      <AvatarFallback>{item.avatarFallback}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-white font-semibold">
                        {item.name}
                      </CardTitle>
                      <CardDescription className="text-gray-400">
                        {item.description}
                      </CardDescription>
                    </div>
                  </div>
                  <p className="text-white text-sm">{item.comment}</p>
                </CardHeader>
                <CardContent className="p-4">
                  <Badge className="mt-2" variant="secondary">
                    {item.badge}
                  </Badge>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
