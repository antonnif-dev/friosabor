import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import TopBar from "../components/TopBar";

function MainLayout() {
    return (
        <div className="min-h-screen bg-slate-50">

            <TopBar />

            <main className="px-4 py-8 sm:px-6 lg:px-8 mb-15">
                <Outlet />
            </main>

            <Navbar />

        </div>
    );
}

export default MainLayout;