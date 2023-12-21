import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const LandingPage = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center w-full h-screen">
        <h1 className="text-6xl font-bold">Welcome to </h1>
        <p className="mt-3 text-2xl">
          Get started by editing{" "}
          <code className="p-3 font-mono text-lg bg-gray-100 rounded-md">
            pages/index.js
          </code>
        </p>
        <Link href="/home">
          <Button className="mt-8">Go to Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
