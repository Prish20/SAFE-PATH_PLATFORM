import  { useState, useMemo } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { SiHomebridge } from "react-icons/si";
import MenuItems from "./MenuItems";

const Sidebar = () => {
  const [open, setOpen] = useState(true);

  const menus = useMemo(
    () => [
      { name: "Home", link: "/", icon: SiHomebridge},
    ],
    []
  );

  return (
    <section className="flex gap-6">
      <div
        className={`bg-[#0e0e0e] min-h-screen ${
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
      </div>
      <div className="m-3 text-xl text-gray-900 font-semibold">
       SafePath
      </div>
    </section>
  );
};

export default Sidebar;
