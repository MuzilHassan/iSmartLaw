import React, { useState, useEffect } from "react";
import LawyersDashboard from "../components/LawyersDashboard";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertSlice";

import axios from "axios";
import { Table } from "antd";
function LawyersAppointments() {
  const [appointments, setAppointments] = useState([]);
  const dispatch = useDispatch();

  const handleAccept = async () => {
    try {
      dispatch(showLoading());
      var res = await axios.get("/api/bookings/get-appointments", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(hideLoading());
    } catch (error) {}
  };

  const handleReject = async () => {};

  const getAppointmentsData = async () => {
    try {
      dispatch(showLoading());
      const resposne = await axios.get("/api/bookings/get-appointments", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(hideLoading());
      if (resposne.data.success) {
        setAppointments(resposne.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };
  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
    },
    {
      title: "Client",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record?.clientId.name} {console.log(record)}
        </span>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      render: (text, record) => <span>{record?.clientId.phone}</span>,
    },
    {
      title: "Date & Time",
      dataIndex: "createdAt",
      render: (text, record) => <span>{record?.date}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "Pending" && (
            <div className="d-flex">
              <span className="px-2" onClick={() => handleAccept}>
                Approve
              </span>
              <span className="" onClick={() => handleReject}>
                Reject
              </span>
            </div>
          )}
        </div>
      ),
    },
  ];
  useEffect(() => {
    getAppointmentsData();
    console.log(appointments, "p");
  }, []);

  return (
    <LawyersDashboard>
      <h1
        className="page-title"
        style={{
          fontFamily: "sans-serif",
          fontWeight: "bold",
          padding: "1rem",
        }}
      >
        Appointments
      </h1>
      <hr />
      <Table columns={columns} dataSource={appointments} />
    </LawyersDashboard>
  );
}

export default LawyersAppointments;
