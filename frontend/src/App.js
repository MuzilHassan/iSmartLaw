import "./App.css";

import { Helmet } from "react-helmet";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import ClientSignUp from "./Pages/ClientSignupScreen";
import ClientSignIn from "./Pages/ClientLoginScreen";
import LawyerSignUp from "./Pages/LawyerSignupScreen";
import LawyerLogin from "./Pages/LawyerLoginScreen";
import Landing from "./Pages/Landing";
import SideNav from "./components/LawyersDashboard/SideNav";
import LawyerProtectedRoutes from "./components/LawyerProtectedRoutes";
import LawyerHome from "./Pages/LawyerHome";
//import Notifications from "./components/Notifications";

import LawyersAppointments from "./Pages/LawyersAppointments";
//lawyers
import LawyerDashboard from "./Pages/lawyer/LawyerDashboard";
import Settings from "./Pages/lawyer/Settings";
import Appointments from "./Pages/lawyer/Appointments";
import Chat from "./Pages/lawyer/Chat";
import Cases from "./Pages/lawyer/Cases";
import Notifications from "./Pages/lawyer/Notifications";

//clients
import ClientChat from "./Pages/client/ClientChat";
import ProtectedRoute from "./components/ProtectedRoutes";
import ClientAppointments from "./Pages/client/ClientAppointments";
function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <div className="App">
      <BrowserRouter>
        <Helmet>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Khula:wght@400;600;800&display=swap"
            rel="stylesheet"
          />
        </Helmet>
        {loading && (
          <div className="spinner-parent">
            <div class="spinner-border" role="status"></div>
          </div>
        )}
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          <Route path="/lawyerSignup" element={<LawyerSignUp />} />
          <Route path="/lawyerSignIn" element={<LawyerLogin />} />
          <Route path="/clientSignup" element={<ClientSignUp />} />
          <Route path="/clientSignIn" element={<ClientSignIn />} />
          <Route
            path="/clientChat"
            element={
              <ProtectedRoute>
                <ClientChat />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ClientAppointment"
            element={
              <ProtectedRoute>
                <ClientAppointments />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Landing />} />
          <Route
            path="/LawyerDashboard"
            element={
              <LawyerProtectedRoutes>
                <LawyerDashboard />
              </LawyerProtectedRoutes>
            }
          />
          <Route
            path="/LawyerSettings"
            element={
              <LawyerProtectedRoutes>
                <Settings />
              </LawyerProtectedRoutes>
            }
          />
          <Route
            path="/LawyerAppointments"
            element={
              <LawyerProtectedRoutes>
                <Appointments />
              </LawyerProtectedRoutes>
            }
          />
          <Route
            path="/LawyerChats"
            element={
              <LawyerProtectedRoutes>
                <Chat />
              </LawyerProtectedRoutes>
            }
          />
          <Route
            path="/LawyerCases"
            element={
              <LawyerProtectedRoutes>
                <Cases />
              </LawyerProtectedRoutes>
            }
          />
          <Route
            path="/LawyerNotifications"
            element={
              <LawyerProtectedRoutes>
                <Notifications />
              </LawyerProtectedRoutes>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
