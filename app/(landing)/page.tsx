import Particles from "@/components/Particles";
import { Button } from "@/components/ui/button";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import Link from "next/link";
import React from "react";

const navigation = [{ name: "Go to Home Page", href: "/home" }];

const words = [
  {
    text: "Naruto",
    className:
      "z-10 text-4xl duration-1000 text-white cursor-default  animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap ",
  },
  {
    text: "GaminG",
    className:
      "z-10 text-4xl duration-1000 text-white cursor-default  animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap ",
  },
];

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-black from-black via-zinc-600/20 to-black">
      <nav className="my-16 animate-fade-in z-10">
        <ul className="flex items-center justify-center gap-4">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="">
              <Button
                variant={"link"}
                className="text-sm duration-500 text-zinc-500 hover:text-zinc-300 p-0"
              >
                {item.name}
              </Button>
            </Link>
          ))}
        </ul>
      </nav>
      <div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <Particles className="absolute inset-0 animate-fade-in" quantity={100} />

      {/* <TypewriterEffectSmooth words={words} /> */}

      <div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <div className="my-16 text-center animate-fade-in z-10">
        <h2 className="text-sm text-zinc-500 ">
          We are building a anime streaming website called Naruto Gaming.
          It&apos;s still in development, and We are making progress on it every
          day. If you want to contribute, please contact us on{" "}
          <Link href="https://twitter.com/Apoorv2711" target="_blank">
            <Button
              variant={"link"}
              className="text-zinc-300 animate-fade-in hover:text-zinc-200 p-0"
            >
              Twitter
            </Button>
          </Link>
        </h2>
        <h2 className="text-sm animate-fade-in text-zinc-500 absolute bottom-10 left-0 right-0 mx-auto ">
          Developed By:{" "}
          <Link
            href="https://github.com/Apoorv-2711"
            className=""
            target="_blank"
          >
            <Button
              variant={"link"}
              className="text-zinc-300 hover:text-zinc-200 p-0"
            >
              Apoorv Jain
            </Button>
          </Link>{" "}
          &amp;{" "}
          <Link
            href="https://github.com/Codefreak69"
            className="text-zinc-300 hover:text-zinc-200"
            target="_blank"
          >
            <Button
              variant={"link"}
              className="text-zinc-300 hover:text-zinc-200 p-0"
            >
              Vikash Kumar
            </Button>
          </Link>
        </h2>
      </div>
    </div>
  );
};

export default LandingPage;
