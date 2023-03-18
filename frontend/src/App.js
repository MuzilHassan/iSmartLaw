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
import LawyersDashboard from "./components/LawyersDashboard";
import LawyerProtectedRoutes from "./components/LawyerProtectedRoutes";
import LawyerHome from "./Pages/LawyerHome";
import Notifications from "./components/Notifications";
import AdminDashobard from "./components/AdminDashobard";
import AdminClients from "./Pages/AdminClients";
import AdminLawyer from "./Pages/AdminLawyer";
import AdminJudge from "./Pages/AdminJudge";
import AddAdmin from "./Pages/AddAdmin";
import AdminHome from "./Pages/AdminHome";
import ProtectedRoute from "./components/ProtectedRoutes";

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
          <Route path="/" element={<Landing />} />
          <Route
            path="/LawyerHome"
            element={
              <LawyerProtectedRoutes>
                <LawyerHome />
              </LawyerProtectedRoutes>
            }
          />
          <Route path="/admin" element={<AdminDashobard />} />
          <Route
            path="/notifications"
            element={
              <LawyerProtectedRoutes>
                <Notifications />
              </LawyerProtectedRoutes>
            }
          />
          <Route path="/AdminClient" element={<AdminClients />} />
          <Route path="/AdminLawyer" element={<AdminLawyer />} />
          <Route path="/AdminJudge" element={<AdminJudge />} />
          <Route path="/AddAdmin" element={<AddAdmin />} />
          <Route path="/AdminHome" element={<AdminHome />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
