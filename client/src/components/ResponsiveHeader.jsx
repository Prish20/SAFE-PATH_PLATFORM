import useWindowSize from "../Hooks/useWindowSize";
import Header from "./HeaderDash.jsx";

const ResponsiveHeader = () => {
  const size = useWindowSize();

  return (
    <>
      {size.width < 768 && <Header />} {/* Tailwind's sm breakpoint is 640px */}
      {/* Other components or content */}
    </>
  );
};

export default ResponsiveHeader;

