import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import PropTypes from 'prop-types';

const MainLayout = ({ children }) => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/home' || location.pathname === '/sign-in' || location.pathname === '/sign-up';

  return (
    <div className="flex">
      {!isAuthPage && <Sidebar />}
      <div className={`flex-grow ${isAuthPage ? 'w-full' : ''}`}>
        {children}
      </div>
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
