import React, { useState } from "react";
import LawyersDashboard from "./LawyersDashboard";
import { Box, Tabs, Tab, Typography } from "@mui/material/";
import { Link as Link1 } from "react-router-dom";
import { padding } from "@mui/system";

function Notifications() {
  const [value, setValue] = useState(0);
  const handleTab = (e, val) => {
    setValue(val);
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
                  <Typography sx={{ textDecoration: "underline" }}>
                    Delete all
                  </Typography>
                </Link1>
              </div>
              <div className="card p-2 mt-2">
                <p1>my name is khan</p1>
              </div>
              <div className="card p-2 mt-2">
                <p1>appointment date is 12-9-2022</p1>
              </div>
              <div className="card p-2 mt-2">
                <p1>delete account</p1>
              </div>
            </>
          )}
          {value === 1 && (
            <>
              <div className="d-flex justify-content-end">
                <Link1 to="#">
                  <Typography sx={{ textDecoration: "underline" }}>
                    Mark all as seen
                  </Typography>
                </Link1>
              </div>
              <div className="card p-2 mt-2">
                <p1>my name is khan</p1>
              </div>
              <div className="card p-2 mt-2">
                <p1>appointment date is 12-9-2022</p1>
              </div>
              <div className="card p-2 mt-2">
                <p1>delete account</p1>
              </div>
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
