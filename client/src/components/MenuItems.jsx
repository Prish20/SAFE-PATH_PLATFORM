import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const MenuItems = ({ menus, open }) => {
  return (
    <div className="mt-4 flex flex-col gap-4 relative">
      {menus.map((menu, i) => (
        <Link
          to={menu.link}
          key={i}
          className={`${
            menu.margin && "mt-5"
          } group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
        >
          <div>{React.createElement(menu.icon, { size: "20" })}</div>
          <h2
            style={{
              transitionDelay: `${i + 3}00ms`,
            }}
            className={`whitespace-pre duration-500 ${
              !open && "opacity-0 translate-x-28 overflow-hidden"
            }`}
          >
            {menu.name}
          </h2>
          <h2
            className={`${
              open && "hidden"
            } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
          >
            {menu.name}
          </h2>
        </Link>
      ))}
    </div>
  );
};

MenuItems.propTypes = {
  menus: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      icon: PropTypes.elementType.isRequired,
      margin: PropTypes.bool,
    })
  ).isRequired,
  open: PropTypes.bool.isRequired,
};

export default MenuItems;
