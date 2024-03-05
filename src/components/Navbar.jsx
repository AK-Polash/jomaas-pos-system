import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import Container from "./Container";

const Navbar = () => {
  const navItems = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "POS",
      path: "/pos",
    },
  ];

  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleResizeWindow = () => {
      if (window.innerWidth < 1024) {
        setShow(false);
      } else {
        setShow(true);
      }
    };
    handleResizeWindow();
    window.addEventListener("resize", handleResizeWindow);
    () => {
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, []);

  return (
    <nav className="sticky left-0 top-0 z-50 w-full bg-green-400 py-3.5 lg:py-2">
      <Container>
        <div className="flex items-center justify-between">
          <div>Jomma's Pizza</div>

          {show ? (
            <RxCross1
              className="text-primary sticky z-50 block cursor-pointer text-2xl lg:hidden"
              onClick={() => setShow((prev) => !prev)}
            />
          ) : (
            <RxHamburgerMenu
              className="text-primary sticky z-50 block cursor-pointer text-2xl lg:hidden"
              onClick={() => setShow((prev) => !prev)}
            />
          )}

          <ul
            className={`fixed left-0 top-[52px] flex max-h-screen w-full flex-col items-center justify-between gap-x-4 bg-green-300 lg:static lg:h-auto lg:w-auto lg:flex-row lg:bg-inherit ${show ? "block" : "hidden"}`}
          >
            {navItems.map((item, index) => (
              <li key={index} className="py-3">
                <NavLink
                  to={item.path}
                  onClick={() => {
                    if (window.innerWidth < 1024) setShow((prev) => !prev);
                  }}
                  className={({ isActive }) =>
                    isActive ? "text-black" : "text-white"
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
