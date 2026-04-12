"use client";

import useTheme from "../../Hooks/useTheme";

const Footer = () => {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();
  const isLight = theme === "light";

  return (
    <div
      className={`p-2 border-t transition-colors duration-300 ${
        isLight
          ? "bg-gray-50 border-gray-200 text-gray-800"
          : "bg-zinc-900 border-zinc-700 text-gray-100"
      }`}
    >
      <p className="text-center text-sm sm:text-base">Copyright © {currentYear} - All rights reserved</p>
    </div>
  );
};

export default Footer;
