import React, { useState } from "react";
import LawyersDashboard from "./LawyersDashboard";
import { Box, Tabs, Tab, Typography } from "@mui/material/";
import { Link as Link1 } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertSlice";
import { setUser } from "../redux/userSlice";
function Notifications() {
  const { user } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const handleTab = (e, val) => {
    setValue(val);
  };
  const handleMarkAsRead = async () => {
    try {
      const response = await axios.post(
        "/api/lawyer/mark-all-as-seen",
        { token: localStorage.getItem("token") },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.message, localStorage.getItem("token"));
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(setUser(response.data.data));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };
  const handleDelete = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/lawyer/delete-all-notifications",
        { token: localStorage.getItem("token") },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(setUser(response.data.data));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };
  return (
    <LawyersDashboard>
      <h1
        style={{
          fontFamily: "sans-serif",
          fontWeight: "bold",
          padding: "1rem",
        }}
        className="page-title"
      >
        Notifications
      </h1>
      <>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            aria-label="basic tabs example"
            value={value}
            onChange={handleTab}
            sx={{
              root: {
                textTransform: "none",
              },
            }}
          >
            <Tab label="Seen" />
            <Tab label="unSeen" />
          </Tabs>
        </Box>
        <Box sx={{ padding: 2 }}>
          {value === 0 && (
            <>
              <div className="d-flex justify-content-end">
                <Link1 to="#">
                  <Typography
                    sx={{ textDecoration: "underline" }}
                    onClick={handleDelete}
                  >
                    Delete all
                  </Typography>
                </Link1>
              </div>
              {user?.seenNotification.map((notification) => (
                <div
                  className="card p-2 mt-2"
                  // onClick={() => navigate(notification.onClickPath)}
                >
                  <div className="card-text">{notification.message}</div>
                </div>
              ))}
            </>
          )}
          {value === 1 && (
            <>
              <div className="d-flex justify-content-end">
                <Link1 to="#">
                  <Typography
                    sx={{ textDecoration: "underline" }}
                    onClick={handleMarkAsRead}
                  >
                    Mark all as seen
                  </Typography>
                </Link1>
              </div>
              {user?.unseenNotifications.map((notification) => (
                <div
                  className="card p-2 mt-2"
                  // onClick={() => navigate(notification.onClickPath)}
                >
                  <div className="card-text">{notification.message}</div>
                </div>
              ))}
            </>
          )}
        </Box>
      </>
    </LawyersDashboard>
  );
}

function TabPanel(props) {
  const children = props;
  return (
    <div>
      <h1>{children}</h1>
    </div>
  );
}

export default Notifications;
