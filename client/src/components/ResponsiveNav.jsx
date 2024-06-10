import { useState } from "react";
import { SiHomebridge } from "react-icons/si";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { TiThMenuOutline } from "react-icons/ti";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <div>
      {/* Header */}
      <header className="bg-[#0e0e0e] text-white py-4 rounded-md">
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
              <TiThMenuOutline className="w-6 h-6" />
            </button>
          </div>
        </div>
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden bg-[#0e0e0e] text-white px-4 pt-2 pb-4"
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
                    onClick={toggleMenu}
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
                  onClick={toggleMenu}
                    to="/dashboard?tab=reportincident"
                    className="block py-2 text-center hover:underline"
                  >
                    Report Incidents
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-full"
                >
                  <Link
                    to="/dashboard?tab=posts"
                    onClick={toggleMenu}
                    className="block py-2 text-center hover:underline"
                  >
                    Education Posts
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-full"
                >
                  <Link
                    to="/dashboard?tab=users"
                    onClick={toggleMenu}
                    className="block py-2 text-center hover:underline"
                  >
                    Users
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-full"
                >
                  <Link
                    to="/incidents"
                    onClick={toggleMenu}
                    className="block py-2 text-center hover:underline"
                  >
                    Incidents
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-full"
                >
                  <Link
                    to="/learning"
                    onClick={toggleMenu}
                    className="block py-2 text-center hover:underline"
                  >
                    Learning
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-full"
                >
                  <Link
                    to="/incidents"
                    className="block py-2 text-center hover:underline"
                  >
                    Sign Out
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
