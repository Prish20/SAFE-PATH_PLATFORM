import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import MainLayout from "./components/MainLayout";
import Dashboard from "./pages/Dashboard";
import Overview from "./pages/Overview";
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";
import OnlyAdminPrivateRoute from "./components/OnlyADminPrivateRoute";
import EducationContent from "./pages/EducationContent";
import UpdatePost from "./pages/updatePost";
import IncidentsPage from "./pages/Incidents";

const App = () => {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/overview" />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/overview" element={<Overview />} />
          <Route element={<PrivateRoute />}>
            <Route path="/incidents" element={<IncidentsPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route element={<OnlyAdminPrivateRoute />}>
            <Route path="/education-content" element={<EducationContent />} />
            <Route path="/update-post/:postId" element={<UpdatePost />} />
          </Route>
          <Route path="/home" element={<Home />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
};

export default App;
