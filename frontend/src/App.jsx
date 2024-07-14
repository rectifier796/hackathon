import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/Login";
import Registration from "./pages/Registration/Registration";
import Home from "./pages/Home/Home";
import UserDashBoard from "./pages/Dashboards/Userdashboard/UserDashBoard";
import DashboardLayout from "./components/DashboardLayout";
import Hotspot from "./pages/Dashboards/Userdashboard/Hotspot";
import RequestPickup from "./pages/Dashboards/Userdashboard/RequestPickup";
import Otp from "./pages/OTP/Otp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />

        <Route path="/user-dashboard" element={<UserDashBoard />} />
        <Route
          path="/add-hotspot"
          element={
            <DashboardLayout>
              <Hotspot />
            </DashboardLayout>
          }
        />
        <Route
          path="/request-pickup"
          element={
            <DashboardLayout>
              <RequestPickup />
            </DashboardLayout>
          }
        />

        <Route path="/verification" element={<Otp />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
