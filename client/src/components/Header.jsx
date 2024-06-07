import { useState } from "react";
import { SiHomebridge } from "react-icons/si";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <div>
      {/* Header */}
      <header className="bg-blue-600 text-white py-4">
        <div className="container mx-auto flex justify-between items-center px-4 md:px-8">
          <div className="text-2xl font-bold">
            <span className="flex gap-2 items-center">
              <SiHomebridge />
              <Link to="/">SafePath</Link>
            </span>
          </div>
          <div className="flex items-center space-x-4 md:hidden">
            {currentUser && (
              <div className="rounded-full overflow-hidden w-8 h-8">
                <img
                  src={currentUser.profilePicture}
                  alt="profile"
                  className="object-cover w-full h-full"
                />
              </div>
            )}
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>
          <nav className="hidden md:flex items-center space-x-4">
            <Link
              to={currentUser ? "/dashboard?tab=profile" : "/sign-in"}
              className="hover:underline"
            >
              Dashboard
            </Link>
            <Link to="/about" className="hover:underline">
              About
            </Link>
            <Link to="/contact" className="hover:underline">
              Contact Us
            </Link>
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {currentUser ? (
                <Link to="/dashboard?tab=profile">
                  <div className="rounded-full overflow-hidden w-8 h-8">
                    <img
                      src={currentUser.profilePicture}
                      alt="profile"
                      className="object-cover w-full h-full"
                    />
                  </div>
                </Link>
              ) : (
                <Link
                  to="/sign-in"
                  className="px-4 py-2 bg-green-500 rounded hover:bg-green-600"
                >
                  Sign In
                </Link>
              )}
            </motion.div>
          </nav>
        </div>
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden bg-blue-600 text-white px-4 pt-2 pb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="flex flex-col items-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-full"
                >
                  <Link
                    to={currentUser ? "/dashboard?tab=profile" : "/sign-in"}
                    className="block py-2 text-center hover:underline"
                  >
                    Dashboard
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-full"
                >
                  <Link
                    to="/about"
                    className="block py-2 text-center hover:underline"
                  >
                    About
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-full"
                >
                  <Link
                    to="/contact"
                    className="block py-2 text-center hover:underline"
                  >
                    Contact
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-full"
                >
                  {!currentUser && (
                    <Link
                      to="/sign-in"
                      className="block py-2 text-center bg-green-500 rounded hover:bg-green-600"
                    >
                      Sign In
                    </Link>
                  )}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </div>
  );
}
