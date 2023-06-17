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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import { showLoading, hideLoading } from "../../../redux/alertSlice";
import { useDispatch } from "react-redux";
import AddAppointment from "./AddAppointment";
import EditAppointment from "./EditAppointment";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
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
export default function AppointmentsList() {
  const handleCall = () => {
    window.open(
      "https://muziljohn.github.io/video_chat/videochat.html",
      "_blank"
    );
  };
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const [editOpen, setEditOpen] = useState(false);
  const handleEditOpen = (bookingId, appointmentDate) => {
    setBookingId(bookingId);
    setAppointmentDate(appointmentDate);
    setEditOpen(true);
  };

  const handleEditClose = () => setEditOpen(false);
  const [rows, setAppointments] = useState([]);

  const [bookingId, setBookingId] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");

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
        "/api/bookings/get-booked-appointments",
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
  const filterData = (v) => {
    if (v) {
      setAppointments([v]);
    } else {
      setAppointments([]);
      getAppointmentsData();
    }
  };
  const deleteUser = () => {};
  useEffect(() => {
    getAppointmentsData();
    console.log(rows, "p");
  }, []);
  return (
    <>
      <div>
        <Modal
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <AddAppointment closeEvent={handleClose} />
          </Box>
        </Modal>
      </div>
      <div>
        <Modal
          open={editOpen}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <EditAppointment
              closeEvent={handleEditClose}
              bookingId={bookingId}
              appointmentDate={appointmentDate}
            />
          </Box>
        </Modal>
      </div>
      {rows.length >= 0 && (
        <Paper
          sx={{
            width: "98%",
            overflow: "hidden",
            padding: "12px",
            border: "none",
            boxShadow: "none",
          }}
        >
          <Box height={10} />
          <Stack direction="row" spacing={2} className="my-2 mb-2">
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={rows}
              sx={{ width: 300 }}
              onChange={(e, v) => filterData(v)}
              getOptionLabel={(rows) => formatDate(rows.date) || ""}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  label="Search Appointment"
                />
              )}
            />
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            ></Typography>
            <Button
              variant="contained"
              endIcon={<AddCircleIcon />}
              onClick={handleOpen}
            >
              Add
            </Button>
          </Stack>
          <Box height={10} />
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="left" style={{ minWidth: "100px" }}>
                    Clients Name
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: "100px" }}>
                    Phone Number
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: "100px" }}>
                    Email
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: "100px" }}>
                    Date and Time
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: "100px" }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
                      >
                        <TableCell align="left">{row.clientId.name}</TableCell>
                        <TableCell align="left">{row.clientId.phone}</TableCell>
                        <TableCell align="left">{row.clientId.email}</TableCell>
                        <TableCell align="left">
                          {formatDate(row.date)}
                        </TableCell>
                        <TableCell align="left">
                          <Stack spacing={2} direction="row">
                            <EditIcon
                              style={{
                                fontSize: "20px",
                                color: "blue",
                                cursor: "pointer",
                              }}
                              className="cursor-pointer"
                              // onClick={() => editUser(row.id)}
                              onClick={() => handleEditOpen(row._id, row.date)}
                            />
                            <DeleteIcon
                              style={{
                                fontSize: "20px",
                                color: "darkred",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                deleteUser(row.id);
                              }}
                            />
                            <VideoCallIcon
                              style={{
                                fontSize: "20px",
                                color: "darkred",
                                cursor: "pointer",
                              }}
                              onClick={handleCall}
                            />
                          </Stack>
                        </TableCell>
                      </TableRow>
                    );
                  })}
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
      )}
    </>
  );
}
