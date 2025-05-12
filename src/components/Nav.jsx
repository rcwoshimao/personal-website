import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Collapse, Typography, IconButton } from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Icon from "../assets/icon-color.png"; 
import "./Nav.css";

export function Nav() {
  const [openNav, setOpenNav] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const navRef = useRef(null);

  // Close the navbar when resizing
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) setOpenNav(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [openNav]);

  // Close navbar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        console.log("Clicked outside navbar");
        setOpenNav(false);
      }
    };

    if (openNav) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openNav]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const scrollDifference = Math.abs(prevScrollPos - currentScrollPos); // Get the absolute difference
      // Only close navbar if the scroll difference is greater than a threshold (e.g., 10px) and scrolling down
      if (scrollDifference > 20 && openNav) {
        console.log("Scrolling down, closing navbar");
        setOpenNav(false); // Close navbar when scrolling down
      }
      setPrevScrollPos(currentScrollPos);
    };
  
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos, openNav]);
  

  const navItems = [
    { id: 1, text: "Home", path: "/" },
    { id: 2, text: "Projects", path: "/projects" },
    { id: 3, text: "Misc", path: "/misc" },
  ];

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {navItems.map((item) => (
        <Typography key={item.id} as="li" variant="small" className="nav-items h-12 p-1 font-mono font-medium text-white hover:text-lg">
          <Link to={item.path} className="flex items-center p-2 text-white rounded-md hover:bg-black">
            {item.text}
          </Link>
        </Typography>
      ))}
    </ul>
  );

  const handleNavToggle = () => {
    console.log("Toggling nav", !openNav);
    setOpenNav(!openNav);
  };

  return (
    <Navbar
      ref={navRef}
      className="nav-bar border-none max-w-full px-4 py-2 lg:px-8 lg:py-4 sticky top-0 shadow-md rounded-none z-50"
    >
      <div className="flex flex-wrap items-center justify-between text-white">
      <a href="/">
        <img className="nav-icon" src={Icon} alt="icon"/>  
        </a>
        <div className="hidden lg:flex">{navList}</div>

        <IconButton variant="text" color="white" className="lg:hidden" onClick={handleNavToggle}>
          {openNav ? <XMarkIcon color="white" className="h-6 w-6" strokeWidth={2} /> : <Bars3Icon className="h-6 w-6" strokeWidth={2} />}
        </IconButton>

        <Collapse className="mobile-nav" open={openNav}>
          <div>{navList}</div>
        </Collapse>
      </div>
    </Navbar>
  );
}

export default Nav;
