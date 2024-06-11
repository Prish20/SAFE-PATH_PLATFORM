import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import MainLayout from "./components/MainLayout";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";
import OnlyAdminPrivateRoute from "./components/OnlyADminPrivateRoute";
import EducationContent from "./pages/EducationContent";
import UpdatePost from "./pages/updatePost";
import IncidentsPage from "./pages/Incidents";
import LearningPage from "./pages/Learning";
import AboutUs from "./pages/AboutUs";
import ContactForm from "./pages/ContactForm";
import IncidentList from "./components/IncidentLIst";
import { useState } from "react";

const App = () => {
  const [selectedIncident, setSelectedIncident] = useState(null);
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactForm />} />
          <Route element={<PrivateRoute />}>
            <Route path="/incidents" element={<IncidentsPage />} />
            <Route path="/learning" element={<LearningPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/incidents"
              element={<IncidentsPage selectedIncident={selectedIncident} />}
            />
            <Route
              path="/incident-list"
              element={
                <IncidentList setSelectedIncident={setSelectedIncident} />
              }
            />
          </Route>
          <Route element={<OnlyAdminPrivateRoute />}>
            <Route path="/education-content" element={<EducationContent />} />
            <Route path="/update-post/:postId" element={<UpdatePost />} />
          </Route>
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
};

export default App;
