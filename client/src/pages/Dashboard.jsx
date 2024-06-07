import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";
import DashPosts from "../components/DashPosts";
import DashUsers from "../components/DashUsers";
import IncidentReport from "./IncidentReport";
import useWindowSize from "../Hooks/useWindowSize";
import ResponsiveNav from "../components/ResponsiveNav";
import { useSelector } from "react-redux";
import ResponsiveHeader from "../components/ResponsiveHeader";

export default function Dashboard() {
  const { currentUser } = useSelector((state) => state.user);
  const size = useWindowSize();
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <>
      <div className="ml-5 mr-5 mt-5">
        {size.width < 768 && (currentUser.isAdmin ? <ResponsiveNav /> : <ResponsiveHeader />)}
      </div>

      <div className="flex flex-col md:flex-row self-center mt-6">
        <div className="flex justify-center md:justify-start">
          {size.width > 768 && <DashSidebar />}
        </div>
        {/* Tabs */}
        {tab === "profile" && <DashProfile />}
        {tab === "posts" && <DashPosts />}
        {tab === "users" && <DashUsers />}
        {tab === "reportincident" && <IncidentReport />}
      </div>
    </>
  );
}
