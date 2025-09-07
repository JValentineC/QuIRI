import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { User, LogOut, LogIn, UserPlus, Bell, Search } from "lucide-react";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

function NavBar() {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  return (
    <>
      <div className="navbar bg-base-100/95 backdrop-blur-md shadow-lg border-b border-base-300/50 sticky top-0 z-50">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle hover:bg-primary/10 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100/95 backdrop-blur-md rounded-xl z-[1] mt-3 w-60 p-3 shadow-2xl border border-base-300/50"
            >
              {isAuthenticated ? (
                <>
                  <li>
                    <a className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 transition-colors">
                      <User size={18} />
                      Dashboard
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={handleProfileClick}
                      className="cursor-pointer flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 transition-colors"
                    >
                      <User size={18} />
                      My Profile
                    </a>
                  </li>
                  <li>
                    <a className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 transition-colors">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        ></path>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        ></path>
                      </svg>
                      Settings
                    </a>
                  </li>
                  <li>
                    <a className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 transition-colors">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                      Help & Support
                    </a>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <a
                      onClick={() => setShowLoginModal(true)}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 transition-colors cursor-pointer"
                    >
                      <LogIn size={18} />
                      Sign In
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => setShowRegisterModal(true)}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 transition-colors cursor-pointer"
                    >
                      <UserPlus size={18} />
                      Join QuIRI
                    </a>
                  </li>
                  <li>
                    <a className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 transition-colors">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                      Help & Support
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <Link
            to="/"
            className="btn btn-ghost text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent hover:scale-105 transition-transform"
          >
            QuIRI Network
          </Link>
        </div>
        <div className="navbar-end space-x-2">
          <button className="btn btn-ghost btn-circle hover:bg-primary/10 transition-colors">
            <Search size={22} />
          </button>

          {isAuthenticated ? (
            <>
              <button className="btn btn-ghost btn-circle hover:bg-primary/10 transition-colors">
                <div className="indicator">
                  <Bell size={22} />
                  <span className="badge badge-xs badge-primary indicator-item animate-pulse"></span>
                </div>
              </button>

              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full bg-primary text-primary-content flex items-center justify-center">
                    {user?.profileImage ? (
                      <img
                        alt="Profile"
                        src={user.profileImage}
                        className="w-10 h-10 rounded-full"
                      />
                    ) : (
                      <span className="font-medium">
                        {user?.firstName?.[0]}
                        {user?.lastName?.[0]}
                      </span>
                    )}
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <div className="text-sm font-medium px-2 py-1">
                      {user?.firstName} {user?.lastName}
                      <br />
                      <span className="text-xs opacity-60">{user?.email}</span>
                    </div>
                  </li>
                  <div className="divider my-1"></div>
                  <li>
                    <a>
                      <User size={16} />
                      Profile
                    </a>
                  </li>
                  <li>
                    <a>Settings</a>
                  </li>
                  <li>
                    <a onClick={handleLogout}>
                      <LogOut size={16} />
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <div className="flex gap-2">
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => setShowLoginModal(true)}
              >
                <LogIn size={16} />
                Sign In
              </button>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => setShowRegisterModal(true)}
              >
                <UserPlus size={16} />
                Join
              </button>
            </div>
          )}
        </div>
      </div>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSwitchToRegister={() => {
          setShowLoginModal(false);
          setShowRegisterModal(true);
        }}
      />

      <RegisterModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onSwitchToLogin={() => {
          setShowRegisterModal(false);
          setShowLoginModal(true);
        }}
      />
    </>
  );
}

export default NavBar;
