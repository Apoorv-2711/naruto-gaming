"use client";
import { Button } from "@/components/ui/button";
import { MenuIcon, SearchIcon } from "./icons/icons";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useState } from "react";


const Navbar = () => {
  const [navbar, setNavbar] = useState<boolean>(false);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", handleScroll);
  }
 

  return (
    <nav
      className={`flex fixed top-0 z-10 items-center justify-between px-6 py-2   w-full transition-colors duration-150 backdrop-filter-none ${
        navbar ? "bg-[#0f0f0f]/60" : "bg-transparent"
      }`}
      style={{
        backdropFilter: `${navbar ? "blur(10px)" : "blur(0px)"}`,
      }}
    >
      <div className="flex items-center space-x-4">
        <Sheet>
          <SheetTrigger>
            <MenuIcon className="text-white w-6 h-6" />
          </SheetTrigger>
          <SheetContent
            side={"left"}
            className="w-[280px] bg-opacity-20 bg-black border-none"
          >
            <div className="flex flex-col space-y-4 mt-10">
              <Button variant={"outline"} className="text-white">
                This is Sidebar
              </Button>
            </div>
          </SheetContent>
        </Sheet>
        <img
          alt="Logo"
          className="object-contain"
          src="logo.png"
          style={{
            height: "50px",
            objectFit: "contain",
          }}
        />
        <div className="relative hidden md:block">
          <input
            className="pl-10 pr-4 py-2 bg-[#333] rounded text-white placeholder-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-opacity-50"
            placeholder="Search anime..."
            type="text"
          />
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <SearchIcon className="text-white w-6 h-6 md:hidden block " />
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
};

export default Navbar;
