"use client";
import React, { useState } from "react";

function ScrollToTop() {
  const [showScroll, setShowScroll] = useState(false);

  const checkScrollTop = () => {
    if (window.scrollY > 50) {
      setShowScroll(true);
    } else if (window.scrollY <= 50) {
      setShowScroll(false);
    }
  };
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", checkScrollTop);
  }

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      {showScroll ? (
        <button
          className="fixed bottom-2 right-2 bg-black hover:bg-black/80 text-white rounded-full  hover:transform hover:-translate-y-1 hover:shadow-md hover:shadow-black transition duration-200 ease-in-out "
          onClick={scrollTop}
        >
          <a className="flex items-center justify-center w-10 h-10">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              ></path>
            </svg>
          </a>
        </button>
      ) : null}
    </div>
  );
}

export default ScrollToTop;
