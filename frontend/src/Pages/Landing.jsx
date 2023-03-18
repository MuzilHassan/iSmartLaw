import React from "react";
// Sections
import TopNavbar from "../components/Nav/TopNavbar";
import Header from "../components/Sections/Header";
import Services from "../components/Sections/Services";
import Projects from "../components/Sections/Lawyers";
import Contact from "../components/Sections/Contact";
import Footer from "../components/Sections/Footer"
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/userSlice";
import { showLoading, hideLoading } from "../redux/alertSlice";
import { useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
export default function Landing() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getUser = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/client/get-user-info",
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
      }
    } catch (error) {
      dispatch(hideLoading());
      localStorage.clear();
    }
  };

  useEffect(() => {
    (function(d, m){
      var kommunicateSettings = 
          {"appId":"23a98ceeb93d0d5e648b00a9909d73593","popupWidget":true,"automaticChatOpenOnNavigation":true};
      var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
      s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
      var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
      window.kommunicate = m; m._globals = kommunicateSettings;
  })(document, window.kommunicate || {});
/* NOTE : Use web server to view HTML files as real-time update will not work if you directly open the HTML file in the browser. */
    if (!user) {
      getUser();
    }
  }, [user]);
  return (
    <>
      <TopNavbar />
      <Header />
      <Services />
     
      <Projects />
       
      <Contact />
      <Footer />
      </>
  );
}


