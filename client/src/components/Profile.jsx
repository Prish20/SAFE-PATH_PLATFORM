import { Avatar } from "flowbite-react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
// import { FaSignOutAlt } from "react-icons/fa";

export default function Profile({ open }) {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div
      className={`absolute bottom-0 ${
        open ? "left-0 " : "left-0"
      } ml-3 mr-2 mb-5 transition-all duration-300 flex items-center rounded-full`}
    >
      {currentUser ? (
        <div className="flex items-center space-x-1">
          <Avatar alt="profile" img={currentUser.profilePicture} rounded className="w-10" />
          {open && (
            <div className="text-sm block">
              <p >{currentUser.username}</p>
              <p className="text-gray-400 truncate font-medium">{currentUser.email}</p>
            </div>
          )}
          {/* {open && (
            <div>
              <FaSignOutAlt
              Link to="/logout"
              />
            </div>
          )} */}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

Profile.propTypes = {
  open: PropTypes.bool.isRequired,
};
