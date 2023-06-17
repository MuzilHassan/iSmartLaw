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

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import { showLoading, hideLoading } from "../../../redux/alertSlice";
import { useDispatch } from "react-redux";

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

export default function PendingCases() {
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
      const response = await axios.get("/api/lawyer/cases/Accepted", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(hideLoading());

      setAppointments(response.data);

      console.log(rows, response.data);
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
  useEffect(() => {
    getAppointmentsData();
  }, []);

  return (
    <>
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
              getOptionLabel={(rows) => rows.caseNumber || ""}
              renderInput={(params) => (
                <TextField {...params} size="small" label="Search Cases" />
              )}
            />
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            ></Typography>
          </Stack>
          <Box height={10} />
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="left" style={{ minWidth: "100px" }}>
                    Judge Name
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: "100px" }}>
                    Court
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: "100px" }}>
                    Case Description
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: "100px" }}>
                    Case Number
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: "100px" }}>
                    Client Name
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: "100px" }}>
                    Hearing Comments
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
                        key={row._id}
                      >
                        <TableCell align="left">{row.judgeId.name}</TableCell>
                        <TableCell align="left">{row.judgeId.court}</TableCell>
                        <TableCell align="left">
                          {row.caseDescription}
                        </TableCell>
                        <TableCell align="left">{row.caseNumber}</TableCell>
                        <TableCell align="left">{row.clientId.name}</TableCell>
                        <TableCell align="left">
                          {row.hearingComment &&
                            row.hearingComment.map((comment, index) => (
                              <div key={index}>
                                {index + 1} : {comment}
                              </div>
                            ))}
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
