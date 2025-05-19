"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const rotatingTexts = [
  "Ai & ML",
  "Software Engineering",
  "Cloud Architecture",
  "Full-Stack Dev",
];

export default function Header() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % rotatingTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="fixed w-full top-0 bg-gray-900/80 backdrop-blur-sm z-50 border-b border-gray-800">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="relative h-8 w-72 overflow-hidden">
            {" "}
            {/* Increased height and fixed width */}
            {rotatingTexts.map((text, index) => (
              <div
                key={text}
                className={`absolute left-0 w-full transition-all duration-500 ${
                  index === currentIndex
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-6"
                }`}
                style={{
                  transform: `translateY(${
                    index === currentIndex ? 0 : -24
                  }px)`,
                  transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  {text}
                </h1>
              </div>
            ))}
          </div>

          <div className="hidden md:flex space-x-8">
            {["Home", "Projects", "Blog", "Archive"].map((item) => (
              <Link
                key={item}
                href={item === "Home" ? `/` : `/${item.toLowerCase()}`}
                className="text-gray-300 hover:text-emerald-400 transition-colors duration-300"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
