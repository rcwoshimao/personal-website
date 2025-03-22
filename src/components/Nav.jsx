import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Collapse, Typography, IconButton } from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export function Nav() {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener("resize", () => window.innerWidth >= 960 && setOpenNav(false));
  }, []);

  const navItems = [
    { id: 1, text: "Home", path: "/" },
    { id: 2, text: "Projects", path: "/projects" },
    { id: 3, text: "Misc", path: "/misc" },
  ];

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {navItems.map((item) => (
        <Typography key={item.id} as="li" variant="small" className="p-1 font-medium text-gray-600">
          <Link to={item.path} className="flex items-center">{item.text}</Link>
        </Typography>
      ))}
    </ul>
  );

  return (
    <Navbar className="mx-auto max-w-screen-xl px-4 py-2 lg:px-8 lg:py-4">
      <div className="container mx-auto flex flex-wrap items-center justify-between text-blue-gray-900">
        <Typography as="a" href="#" className="mr-4 cursor-pointer py-1.5 font-bold text-[#00df9a] text-3xl">
          RC
        </Typography>
        <div className="hidden lg:flex">{navList}</div>

        <IconButton variant="text" className="lg:hidden" onClick={() => setOpenNav(!openNav)}>
          {openNav ? <XMarkIcon className="h-6 w-6" strokeWidth={2} /> : <Bars3Icon className="h-6 w-6" strokeWidth={2} />}
        </IconButton>

        <Collapse open={openNav}>
          <div className="container mx-auto">{navList}</div>
        </Collapse>
      </div>
    </Navbar>
  );
}

export default Nav;
