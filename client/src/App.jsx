import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./components/Home";
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
        <Route path="/home" element={<Home />} />
        
      </Routes>
    </BrowserRouter>
  );
};

export default App;
