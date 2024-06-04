import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiArrowSmRight, HiDocumentText, HiUser } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

export default function DashSidebar() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.05 },
  };

  return (
    <div className="flex md:pl-28">
      <Sidebar aria-label="Sidebar with profile and sign-out options">
        <Sidebar.Items>
          <Sidebar.ItemGroup className="flex flex-col gap-3 self-center">
            <Link to="/dashboard?tab=profile">
              <motion.div
                initial="hidden"
                animate="visible"
                whileHover="hover"
                variants={itemVariants}
                transition={{ duration: 0.5 }}
              >
                <Sidebar.Item
                  active={tab === "profile"}
                  icon={HiUser}
                  className="flex items-center space-x-2 outline hover:text-red-500"
                  as="div"
                >
                  <span>Profile</span>
                  {currentUser.isAdmin && (
                    <span className="rounded bg-black ml-10 text-sm text-white ">Admin</span>
                  )}
                  {!currentUser.isAdmin && (
                    <span className="border ml-2 text-sm text-gray-500 ">User</span>
                  )}
                </Sidebar.Item>
              </motion.div>
            </Link>
            <Link to="/dashboard?tab=posts">
              {currentUser.isAdmin && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  variants={itemVariants}
                  transition={{ duration: 0.5 }}
                >
                  <Sidebar.Item
                    active={tab === "posts"}
                    icon={HiDocumentText}
                    className="flex items-center space-x-1 cursor-pointer hover:text-red-500 outline"
                    as="div"
                  >
                    <span>Euducation Posts</span>
                  </Sidebar.Item>
                </motion.div>
              )}
            </Link>
            <motion.div
              initial="hidden"
              animate="visible"
              whileHover="hover"
              variants={itemVariants}
              transition={{ duration: 0.5 }}
            >
              <Sidebar.Item
                icon={HiArrowSmRight}
                className="flex items-center space-x-1 cursor-pointer hover:text-red-500 outline"
              >
                <span>Sign Out</span>
              </Sidebar.Item>
            </motion.div>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
}
