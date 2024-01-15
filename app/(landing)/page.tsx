import Particles from "@/components/Particles";
import Link from "next/link";
import React from "react";

const navigation = [{ name: "Go to Home Page", href: "/home" }];

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-black from-black via-zinc-600/20 to-black">
      <nav className="my-16 animate-fade-in z-10">
        <ul className="flex items-center justify-center gap-4">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm duration-500 text-zinc-500 hover:text-zinc-300"
            >
              {item.name}
            </Link>
          ))}
        </ul>
      </nav>
      <div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <Particles className="absolute inset-0 animate-fade-in" quantity={1000} />
      <h1 className="z-10 text-4xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text ">
        Naruto GaminG
      </h1>

      <div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <div className="my-16 text-center animate-fade-in z-10">
        <h2 className="text-sm text-zinc-500 ">
          I'm building a anime streaming website called Naruto Gaming. It's
          still in development, and I'm working on it every day. If you want to contribute, please contact me on{" "}
          <Link
            href="https://twitter.com/Apoorv2711"
            className="text-zinc-300 hover:text-zinc-200"
            target="_blank"
          >
            X/Twitter
          </Link>
        </h2>
        <h2 className="text-sm text-zinc-500">
          Developed By:{" "}
          <Link
            href="https://github.com/Apoorv-2711"
            className="text-zinc-300 hover:text-zinc-200"
            target="_blank"
          >
            Apoorv Jain
          </Link>
          <Link
            href="https://github.com/Codefreak69"
            className="text-zinc-300 hover:text-zinc-200"
            target="_blank"
          >
            {" "}
            &amp; Vikash Kumar
          </Link>
        </h2>
      </div>
    </div>
  );
};

export default LandingPage;
