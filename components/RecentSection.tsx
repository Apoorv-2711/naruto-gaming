"use client";
import { gogoRecent } from "@/types/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { useIntersection } from "@mantine/hooks";

type RecentSectionProps = {};

const getRecent = async (page: number) => {
  const res = await fetch("http://localhost:3000/api/recent", {
    method: "POST",
    cache: "no-cache",
    body: JSON.stringify({ page }),
  });
  const data = await res.json();

  if (res.ok) {
    return data;
  } else {
    throw new Error("Error while Fetching Data...");
  }
};

const RecentSection: React.FC<RecentSectionProps> = ({}) => {
  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["recent"],
    queryFn: async ({ pageParam }) => {
      const response = await getRecent(pageParam);
      return response;
    },
    initialPageParam: 1,
    getNextPageParam: (_, pages) => {
      return pages.length + 1;
    },
  });

  const lastPostRef = useRef<HTMLElement>(null);
  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage();
    }
  }, [entry]);

  const _getRecent = data?.pages?.flatMap((page) => page);

  return (
    <div className="mx-auto">
      <h3 className="text-2xl font-bold mt-12 mb-4 ml-4 text-white">
        Recent Releases
      </h3>
      <div className="flex flex-wrap w-full items-center justify-center px-auto p-6 pb-8">
        {/* {data?.pages.map((page, i) => (
          <div
            key={i}
            className="flex pb-8 flex-wrap p-6 justify-start items-center"
          >
            {page?.map((post: any) => (
              <img
                key={post.id}
                alt="New Release 1"
                className="w-40 h-60 rounded-md mr-4 mb-4"
                height="300"
                src={post.image}
                style={{
                  aspectRatio: "200/300",
                  objectFit: "cover",
                }}
                width="200"
              />
            ))}
          </div>
        ))} */}
        {_getRecent?.map((post: gogoRecent, i: number) => {
          if (i === _getRecent.length - 1)
            return (
              <div
                ref={ref}
                key={i}
                className="flex pb-8 p-6 justify-start items-center"
              ></div>
            );
          return (
            <div key={i} className="flex pb-8  justify-start items-center">
              <img
                alt="New Release 1"
                className="w-40 h-60 rounded-md mr-4 mb-4"
                height="300"
                src={post.image}
                style={{
                  aspectRatio: "200/300",
                  objectFit: "cover",
                }}
                width="200"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentSection;
