import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";

export default function DashboardLayout() {
  return (
    <div className="wrapper">
      <Sidebar />
       <TopBar />
      <div className="content-page">
       
        <div className="content">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
}
