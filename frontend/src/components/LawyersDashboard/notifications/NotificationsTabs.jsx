import { Link as Link1 } from "react-router-dom";
import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../../redux/userSlice";
import { hideLoading,showLoading } from "../../../redux/alertSlice";
import axios from "axios";
import toast from "react-hot-toast";
const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  "& .MuiTabs-indicatorSpan": {
    maxWidth: 40,
    width: "100%",
    backgroundColor: "#635ee7",
  },
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(20),
    marginRight: theme.spacing(1),
    color: "#141414",
    fontWeight: "400",
    "&.Mui-selected": {
      color: "#0c828f",
    },
    "&.Mui-focusVisible": {
      backgroundColor: "#30c1d1",
    },
  })
);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function NotificationsTabs() {
  const [value, setValue] = React.useState(0);
  const { user } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
 
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
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "white",
        height: "85vh",
        borderRadius: "5px",
        boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.25)",
      }}
    >
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          backgroundColor: "#FFFFFF",
          borderRadius: "10px 10px 0 0",
        }}
      >
        <StyledTabs
          sx={{ p: "10px" }}
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <StyledTab label="Seen Notifications" {...a11yProps(0)} />
          <StyledTab label="UnSeen Notifications" {...a11yProps(1)} />
        </StyledTabs>
      </Box>
      <TabPanel value={value} index={0}>
      <>
              <div className="d-flex justify-content-end">
                <Link1 to="#">
                  <Typography
                    sx={{ textDecoration: "underline" }}
                    onClick={handleDelete}
                    className="text-red-500"
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
      </TabPanel>
      <TabPanel value={value} index={1}>
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
      </TabPanel>
    </Box>
  );
}
