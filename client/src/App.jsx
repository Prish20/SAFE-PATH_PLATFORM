import { Routes, Route, BrowserRouter } from "react-router-dom";
// import Sidebar from "./components/Sidebar";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
const App = () => {
  return (
    <BrowserRouter>
      {/* <Sidebar/> */}
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
