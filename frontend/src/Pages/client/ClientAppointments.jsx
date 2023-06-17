import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import { showLoading, hideLoading } from "../../redux/alertSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ButtonBase from '@mui/material/ButtonBase';

const formatDate = (dateTimeString) => {
  const options = {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  const date = new Date(dateTimeString);
  return date.toLocaleString("en-US", options);
};

export default function ClientAppointments() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [rows, setAppointments] = useState([]);
  const dispatch = useDispatch();
  const history = useNavigate();
  const handleCall = () => {
    window.open(
      "https://muziljohn.github.io/video_chat/videochat.html",
      "_blank"
    );
  };

  const isWithinTimeRange = (dateTimeString) => {
    const appointmentTime = new Date(dateTimeString);
    const currentTime = new Date();

    const startTime = new Date(appointmentTime.getTime() - 5 * 60000); // 5 minutes before appointment time
    const endTime = new Date(appointmentTime.getTime() + 20 * 60000); // 20 minutes after appointment time

    return currentTime >= startTime && currentTime <= endTime;
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getAppointmentsData = async () => {
    try {
      dispatch(showLoading());
      const resposne = await axios.get(
        "/api/bookings/get-client-appointments",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (resposne.data.success) {
        setAppointments(resposne.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getAppointmentsData();
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
     
      p={2}
      bgcolor="#f2f2f2"
      height="100vh"
    >
      <Box mb={2}>
        <ButtonBase
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => history(-1)}
          sx={{
            backgroundColor: '#f2f2f2',
            borderRadius: '8px',
            padding: '12px 24px',
            fontWeight: 'bold',
            fontSize: '16px',
            color: '#333',
            border: 'none',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            transition: 'background-color 0.3s ease',
            outline:'none',
            '&:hover': {
              backgroundColor: '#e0e0e0',
            },
          }}
        >
          Go Back
        </ButtonBase>
      </Box>

      <Typography variant="h5" component="h2" align="center" mb={2} style={{ color: '#333', fontWeight: 'bold' }}>
        Client Appointments
      </Typography>

      <Paper elevation={3} style={{ borderRadius: '8px', width: '100%' }}>
        <TableContainer style={{ maxHeight: '400px' }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="left" style={{ fontWeight: 'bold' }}>Lawyer Name</TableCell>
                <TableCell align="left" style={{ fontWeight: 'bold' }}>Phone Number</TableCell>
                <TableCell align="left" style={{ fontWeight: 'bold' }}>Email</TableCell>
                <TableCell align="left" style={{ fontWeight: 'bold' }}>Date and Time</TableCell>
                <TableCell align="left" style={{ fontWeight: 'bold' }}>status</TableCell>
                <TableCell align="left" style={{ fontWeight: 'bold' }}>Video Call</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    <TableCell align="left">{row.lawyerId.name}</TableCell>
                    <TableCell align="left">{row.lawyerId.phone}</TableCell>
                    <TableCell align="left">{row.lawyerId.email}</TableCell>
                    <TableCell align="left">
                      {formatDate(row.date)}
                    </TableCell>
                    <TableCell align="left">{row.status}</TableCell>
                    <TableCell align="left">
                      <Stack spacing={2} direction="row">
                        <VideoCallIcon
                          style={{
                            fontSize: "20px",
                            color: isWithinTimeRange(row.date)  && row.status=="Accepted"
                              ? "darkred"
                              : "gray",
                            cursor: isWithinTimeRange(row.date)
                              ? "pointer"
                              : "default",
                          }}
                          onClick={
                             handleCall 
                          }
                        />
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
