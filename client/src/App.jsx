import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import MainLayout from './components/MainLayout';
import Dashboard from './pages/Dashboard';
import Overview from './pages/Overview';
import Home from './pages/Home';

const App = () => {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/overview" />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
};

export default App;
