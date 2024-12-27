"use client";

import { useState, useEffect } from "react";
import type { JSX } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";

const links: {
  href: string;
  label: string;
}[] = [
  {
    href: "/products",
    label: "Products",
  },
  {
    href: "/submit",
    label: "Submit Product",
  },
  {
    href: "/about",
    label: "About",
  },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-xl shadow-sm" : "bg-background"
      }`}
    >
      <nav className="flex items-center justify-between p-4 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center space-x-3">
          <div className="relative w-8 h-8 text-primary">
            <Image 
              src="/logo.svg" 
              alt="Top ShipFast Logo" 
              width={32} 
              height={32}
              className="dark:invert"
            />
          </div>
          <span className="text-xl font-bold">Top ShipFast</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {label}
            </Link>
          ))}
          <Button asChild>
            <Link href="/signin">Sign In</Link>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </Button>
        </div>
      </nav>
    </header>
  );
}
