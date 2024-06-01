import { useState, useMemo } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdHomeMax } from "react-icons/md";
import MenuItems from "./MenuItems";
import Profile from "./Profile";

const Sidebar = () => {
  const [open, setOpen] = useState(true);

  const menus = useMemo(
    () => [
      { name: "Home", link: "/home", icon: MdHomeMax },
      { name: "Dashboard", link: "/dashboard", icon: MdHomeMax },

    ],
    []
  );

  return (
    <section className="flex gap-6">
      <div
        className={`bg-[#0e0e0e] ml-2 mt-5 mb-5 min-h-screen relative rounded-3xl ${
          open ? "w-72" : "w-16"
        } duration-500 text-gray-100 px-4`}
      >
        <div className="py-3 flex justify-end">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <MenuItems menus={menus} open={open} />
        <Profile open={open} />
      </div>
    </section>
  );
};

export default Sidebar;
