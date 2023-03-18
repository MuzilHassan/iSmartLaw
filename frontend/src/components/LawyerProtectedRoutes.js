import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "../redux/userSlice";
import { showLoading, hideLoading } from "../redux/alertSlice";

function LawyerProtectedRoutes(props) {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(user);
  const getUser = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/lawyer/get-Lawyer-info",
        { token: localStorage.getItem("token") },

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(hideLoading());
      if (response.data.success) {
        dispatch(setUser(response.data.data));
      } else {
        localStorage.clear();
        navigate("/lawyerSignIn");
      }
    } catch (error) {
      dispatch(hideLoading());
      localStorage.clear();
      navigate("/lawyerSignIn");
    }
  };

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user]);

  if (localStorage.getItem("token")) {
    return props.children;
  } else {
    return <Navigate to="/" />;
  }
}
export default LawyerProtectedRoutes;