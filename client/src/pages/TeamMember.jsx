import PropTypes from "prop-types";

const TeamMember = ({ name, position, image, description }) => {
  return (
    <>
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 text-center">
      <img
        src={image}
        alt={name}
        className="w-32 h-32 rounded-full mx-auto mb-4"
      />
      <h3 className="text-xl font-bold mb-2">{name}</h3>
      <p className="text-gray-500 dark:text-gray-400 mb-2">{position}</p>
      <p className="text-gray-700 dark:text-gray-300">{description}</p>
    </div>
    </>
  );
};

TeamMember.propTypes = {
  name: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default TeamMember;
