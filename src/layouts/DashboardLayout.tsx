import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";




    export default function DashboardLayout() {
      return (
        <div className='wrapper'>
                <TopBar />
                <Sidebar />
                <Outlet />
    
                <Footer />
        </div>
      )
    }