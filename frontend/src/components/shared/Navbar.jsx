import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { setUser } from "@/redux/authSlice";
import { USER_API_ENDPOINT } from "@/utils/constants";
import { MoveRight, Menu, X } from "lucide-react";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const logoutHandle = async () => {
    try {
      const res = await axios.get(`${USER_API_ENDPOINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  // helper to check active route
  const isActive = (path) =>
    location.pathname === path
      ? "bg-red-500 text-white px-3 py-1 rounded-3xl transition-all duration-300"
      : "hover:text-red-500 transition-all duration-300";

  return (
    <div className="bg-white shadow-md  top-0 z-50">
      <div className="flex items-center justify-between mx-auto px-6 max-w-7xl h-16">
        {/* LEFT: Hamburger + Logo */}
        <div className="flex items-center gap-3">
          {/* Hamburger (mobile only) */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>

          {/* Logo */}
          <h1 className="text-2xl font-bold">
            Job<span className="text-red-500">portal</span>
          </h1>
        </div>

        {/* CENTER/RIGHT: Desktop Menu */}
        <div className="hidden md:flex items-center gap-9">
          <ul  className="flex gap-5 font-medium items-center cursor-pointer">
            {user && user.role === "recruiter" ? (
              <>
                <Link to="/admin/companies">
                  <li className={isActive("/admin/companies")}>Companies</li>
                </Link>
                <Link to="/admin/jobs">
                  <li className={isActive("/admin/jobs")}>Jobs</li>
                </Link>
              </>
            ) : (
              <>
                <Link to="/">
                  <li className={isActive("/")}>Home</li>
                </Link>
                <Link to="/job">
                  <li className={isActive("/job")}>Jobs</li>
                </Link>
                <Link to="/browse">
                  <li className={isActive("/browse")}>Browse</li>
                </Link>
              </>
            )}
          </ul>
        </div>

        {/* RIGHT: Profile or Get Started (both desktop + mobile) */}
        <div className="flex items-center">
          {!user ? (
            <Link to="/signup">
              <button className="px-3 flex gap-2 cursor-pointer py-2 rounded-full border bg-red-500 hover:border-red-500 text-white hover:bg-white hover:text-black transition-colors duration-300">
                Get started <MoveRight className="hidden sm:inline" />
              </button>
            </Link>
          ) : (
            <div className="relative group" tabIndex={0}>
              <div className="h-10 w-10 rounded-full cursor-pointer overflow-hidden border">
                <img
                  src={
                    user?.profile?.profilePhoto ||
                    "https://images.icon-icons.com/1378/PNG/512/avatardefault_92824.png"
                  }
                  alt="profile"
                  className="h-full w-full object-cover"
                />
              </div>
              {/* Dropdown */}
              <div
                className="absolute right-0 mt-2 w-56 rounded-lg bg-white p-4 text-sm shadow-lg z-50
                opacity-0 invisible translate-y-2 pointer-events-none
                transition-all duration-200 ease-out
                group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:pointer-events-auto
                group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:pointer-events-auto"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={
                      user?.profile?.profilePhoto ||
                      "https://images.icon-icons.com/1378/PNG/512/avatardefault_92824.png"
                    }
                    alt="profile"
                    className="h-12 w-12 rounded-full object-cover border"
                  />
                  <div>
                    <h2 className="font-semibold">{user?.fullname}</h2>
                    <p className="text-gray-500 text-xs">
                      {user?.profile?.bio || "Full Stack Developer"}
                    </p>
                  </div>
                </div>
                <hr className="my-2" />
                <ul className="space-y-2">
                  <li>
                    <Link to="/profile" className="block hover:text-red-500">
                      View Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={logoutHandle}
                      className="w-full text-left hover:text-red-500"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Dropdown Menu (for nav links) */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg px-6 py-4 space-y-4">
          <ul className="flex flex-col gap-4 font-medium">
            {user && user.role === "recruiter" ? (
              <>
                <Link to="/admin/companies">
                  <li className={isActive("/admin/companies")}>Companies</li>
                </Link>
                <Link to="/admin/jobs">
                  <li className={isActive("/admin/jobs")}>Jobs</li>
                </Link>
              </>
            ) : (
              <>
                <Link to="/">
                  <li className={isActive("/")}>Home</li>
                </Link>
                <Link to="/job">
                  <li className={isActive("/job")}>Jobs</li>
                </Link>
                <Link to="/browse">
                  <li className={isActive("/browse")}>Browse</li>
                </Link>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
