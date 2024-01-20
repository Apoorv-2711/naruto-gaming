"use client";
import React, { useEffect, useState } from "react";

type Props = {};

export default function CurrentTime({}: Props) {
  const [currentTime, setCurrentTime] = useState(
    `(GMT+05:30) ${new Date().toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
      hour12: true,
      
    })}`
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      const options = { timeZone: "Asia/Kolkata", hour12: true };
      const str = date.toLocaleString("en-US", options);
      const gmt = `(GMT+05:30) ${str}`;
      setCurrentTime(gmt);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return <div className="font-bold text-sm mx-1" suppressHydrationWarning>{currentTime}</div>;
}
