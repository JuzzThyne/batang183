import React, { useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutAsync } from "../redux/authSlice.js";

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
          <h1 className="text-2xl font-semibold p-2">Josephine Yarning</h1>
          <button onClick={handleLogout} className="px-6">Logout</button>
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
        <div className="w-full md:w-3/4 bg-white p-4 md:p-8">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default UserComponents;
