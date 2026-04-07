"use client";

import useTheme from "../../Hooks/useTheme";

const Footer = () => {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`p-4 footer footer-center bg-base-300 text-base-content ${
        theme === "light" ? "bg-base-100 text-black" : "bg-zinc-900 text-white"
      }`}
    >
      <aside>
        <p>Copyright © {currentYear} - All rights reserved</p>
      </aside>
    </footer>
  );
};

export default Footer;
