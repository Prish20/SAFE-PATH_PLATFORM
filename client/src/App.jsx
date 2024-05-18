import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Sidebar />} />
      </Routes>
    </div>
  );
};

export default App;
