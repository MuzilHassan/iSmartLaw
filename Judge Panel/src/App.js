import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import JudgeHome from "./pages/JudgeHome";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./context/authContext";

import AdminClients from "./pages/JudgeSchedule";
import HotelBooking from "./pages/ClosedCases";
import LoginForm from "./pages/LoginForm";
import Transport from "./pages/OpenedCases";

function App() {
  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    console.log(user);
    if (!user) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <JudgeHome />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="/Schedule"
            element={
              <ProtectedRoute>
                <AdminClients />
              </ProtectedRoute>
            }
          />

          <Route
            path="/closedCases"
            element={
              <ProtectedRoute>
                <HotelBooking />
              </ProtectedRoute>
            }
          />
          <Route
            path="/OpenedCases"
            element={
              <ProtectedRoute>
                <Transport />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
