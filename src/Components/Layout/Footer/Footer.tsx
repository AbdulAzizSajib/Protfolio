"use client";

import { Icon } from "@iconify/react";
import useTheme from "../../Hooks/useTheme";

const Footer = () => {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();
  const isLight = theme === "light";

  return (
    <div
      className={`p-2  transition-colors duration-300 flex items-center justify-center ${
        isLight
          ? "  text-gray-800"
          : "  text-gray-100"
      }`}
    >
      <p className="text-center text-sm sm:text-base">Copyright © {currentYear} - All rights reserved</p>
      <p className="mx-2">|</p>
      <a 
        href="https://stacksymbols.vercel.app/" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-center text-sm sm:text-base hover:underline"
      >
        Stack Symbols
        <Icon icon="mdi:open-in-new" className="inline-block ml-1" />
      </a>
    </div>
  );
};

export default Footer;
