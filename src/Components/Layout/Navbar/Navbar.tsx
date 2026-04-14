"use client";

import { Link } from "react-scroll";
import { motion } from "framer-motion";
import SliderToggle from "../../Toggle/SliderToggle";
import useTheme from "../../Hooks/useTheme";
// import Eyes from "../../Eyes/Eyes";


const Navbar = () => {
  const { theme } = useTheme();

  const navLink = (
    <>
      <li>
        <Link
          to="experiance"
          smooth
          duration={500}
        >
          Work Experiance
        </Link>
      </li>
      <li>
        <Link
          to="projects"
          smooth
          duration={500}
          offset={-90}
        >
          Projects
        </Link>
      </li>
      <li>
        <Link
          to="contact"
          smooth
          duration={500}
        >
          Contact
        </Link>
      </li>
    </>
  );

  return (
    <div
      className={`sticky top-0 z-50  flex items-center justify-between w-full navbar max-w-4xl mx-auto ${
        theme === "light" ? "bg-white text-black" : "bg-zinc-900 text-white"
      }`}
    >
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className={`menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52 ${
              theme === "light" ? "bg-white text-black" : "bg-zinc-900 text-white"
            }`}
          >
            {navLink}
          </ul>
        </div>

        <Link
          to="home"
          smooth
          duration={500}
          offset={-200}
          className="flex items-center gap-2 text-xl font-[jost] capitalize font-bold tracking-widest cursor-pointer"
        >
          SAJIB
          {/* <Eyes size={24} /> */}
        </Link>
      </div>
      <div className="hidden navbar-center lg:flex">
        <motion.ul
          layoutId="pill-tab"
          transition={{ type: "spring", duration: 0.5 }}
          className={`px-1 menu menu-horizontal ${theme === "light" ? "text-black bg-white" : "text-white"}`}
        >
          {navLink}
          <SliderToggle />
        </motion.ul>
      </div>
     
    </div>
  );
};

export default Navbar;
