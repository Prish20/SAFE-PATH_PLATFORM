import { useState } from "react";
import { SiHomebridge } from "react-icons/si";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { TiThMenuOutline } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import { Button } from "flowbite-react";
import { signoutSuccess } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";

export default function Header() {
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
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
              {isMenuOpen && <ImCross />}
              {!isMenuOpen && <TiThMenuOutline className="w-6 h-6" />}
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
              <div className="flex flex-col items-center mt-3">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-full"
                >
                  <Link
                    to={currentUser ? "/dashboard?tab=profile" : "/sign-in"}
                    onClick={toggleMenu}
                  >
                    <Button className="w-32 mx-auto">Dashboard</Button>
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
                    <Button className="w-32 mx-auto">Report Incident</Button>
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
                    <Button className="w-32 mx-auto">Education Posts</Button>
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
                    <Button className="w-32 mx-auto">Users</Button>
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
                    <Button className="w-32 mx-auto">Incidents</Button>
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
                    <Button className="w-32 mx-auto">Learning</Button>
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-full"
                >
                  <Link className="block py-2 text-center hover:underline">
                    <Button
                      onClick={() => {
                        handleSignout();
                        toggleMenu();
                      }}
                      className="w-32 mx-auto"
                    >
                      Sign Out
                    </Button>
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
