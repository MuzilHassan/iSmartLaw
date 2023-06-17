import axios from "axios";
import React, { useEffect, useState } from "react";
import AdminDashobard from "../components/AdminDashobard";
import Navbar from "../components/Navbar";
import ScheduleCard from "../components/Card";
import { AuthContext } from "../context/authContext";
import { useContext } from "react";
function JudgeSchedule() {
  const [data, setData] = useState([]);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/judge/weeklyCases/${user._id}`); // Update the API endpoint to match your backend route
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <AdminDashobard>
      <Navbar />
      <h3>Week Schedule</h3>
      {data.map((item) => (
        <ScheduleCard
          key={item._id}
          caseNo={item.caseNumber}
          lawyerName={item?.lawyerId?.name}
          ProsName={item.clientId.name}
          date={new Date(item.date).toLocaleDateString()}
          time={new Date(item.date).toLocaleTimeString()}
          court={item.judgeId.court}
        />
      ))}
    </AdminDashobard>
  );
}

export default JudgeSchedule;
