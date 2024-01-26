import React, { useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutAsync } from "../redux/authSlice.js";
import batang183 from "../assets/batang183.png";
import hamburger from "../assets/menu.svg";
import x from "../assets/x.svg";

const NavMenu = ({ src, alt, to, title }) => {
  const location = useLocation();

  // Check if the current location matches the NavMenu item's 'to' prop
  const isActive = location.pathname === to;

  return (
    <li
      className={`p-2 uppercase cursor-pointer flex gap-4 items-center rounded-lg ${
        isActive ? "bg-green-500" : ""
      }`}
    >
      <img src={src} alt={alt} className="w-8 h-8" />
      <Link to={to}>{title}</Link>
    </li>
  );
};

const UserComponents = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const handleLogout = async () => {
    try {
      await dispatch(logoutAsync(token));
      window.location.reload();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  const navMenuList = [
    { src: "", alt: "", to: "/dashboard", title: "Dashboard" },
    { src: "", alt: "", to: "/account", title: "Account Setting" },
  ];

  return (
    <>
      <header className="bg-[#004643] text-white py-2">
        <div className="container mx-auto flex justify-between">
          <div className="flex px-2 gap-1">
            <img src={batang183} alt="" className="w-12 h-12" />
            <h1 className="text-2xl font-semibold p-2">Batang 183</h1>
          </div>
          <div className="p-2 flex justify-center items-center">
            <div className="relative inline-block text-left">
              <div>
                <button
                  type="button"
                  onClick={toggleMenu}
                  className="inline-flex w-full justify-center gap-x-1.5 rounded-md  px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-white hover:bg-green-800"
                  id="menu-button"
                  aria-expanded={isMenuOpen}
                  aria-haspopup="true"
                >
                  {isMenuOpen ? (
                    <img src={x} alt="Close" className="w-5 h-5" />
                  ) : (
                    <>
                      <img src={hamburger} alt="Open" className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
              {isMenuOpen && (
                <div
                  className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                  tabIndex="-1"
                >
                  <div className="py-1" role="none">
                    <Link
                      to="/dashboard"
                      className="text-gray-700 block px-4 py-2 text-sm"
                      role="menuitem"
                      tabIndex="-1"
                      id="menu-item-0"
                      onClick={toggleMenu}
                    >
                      Users
                    </Link>
                    <Link
                      to="/account"
                      className="text-gray-700 block px-4 py-2 text-sm"
                      role="menuitem"
                      tabIndex="-1"
                      id="menu-item-1"
                      onClick={toggleMenu}
                    >
                      Account Settings
                    </Link>
                    <form method="POST" action="#" role="none">
                      <button
                        type="submit"
                        className="text-gray-700 block w-full px-4 py-2 text-left text-sm"
                        role="menuitem"
                        tabIndex="-1"
                        id="menu-item-2"
                        onClick={handleLogout}
                      >
                        Sign out
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      {/* main content */}
      <main className="container mx-auto mt-8 flex flex-col-reverse md:flex-row">
        <div className="w-full md:w-1/4 md:block">
          <aside className="md:block hidden">
            <nav className="flex justify-center items-center p-2">
              <ul className="flex flex-col mt-6 w-full">
                {navMenuList.map((menuItem, index) => (
                  <NavMenu
                    key={index}
                    src={menuItem.src}
                    alt={menuItem.alt}
                    to={menuItem.to}
                    title={menuItem.title}
                  />
                ))}
              </ul>
            </nav>
          </aside>
        </div>
        <div className="w-full md:w-3/4 bg-white md:p-8">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default UserComponents;
