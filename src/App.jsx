import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import Sidebar from "./sidebar/Sidebar";
import LoginPage from "./pages/login/Login";

function App() {
  const location = useLocation();
  return (
    <div className="">
      {location?.pathname === "/login" ? (
        <LoginPage />
      ) : (
        <div className="drawer lg:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content w-full h-full">
            {/* Page content here */}
            <Outlet />

            <label
              htmlFor="my-drawer-2"
              className="btn btn-primary drawer-button lg:hidden"
            >
              Open drawer
            </label>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-2"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>

            <Sidebar />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
