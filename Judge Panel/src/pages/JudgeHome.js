import React, { useEffect, useState } from "react";
import AdminDashboard from "../components/AdminDashobard";
import Navbar from "../components/Navbar";
import ScheduleCard from "../components/Card";
import { AuthContext } from "../context/authContext";
import { useContext } from "react";

function JudgeHome() {
  const { user } = useContext(AuthContext);
  const [hearings, setHearings] = useState([]);

  useEffect(() => {
    fetchHearings();
  }, []);

  const fetchHearings = async () => {
    try {
      const response = await fetch(`/judge/todaysCases/${user._id}`);
      const data = await response.json();
      setHearings(data);
    } catch (error) {
      console.error("Error fetching hearings:", error);
    }
  };

  return (
    <AdminDashboard>
      <div className="col-15 p-3 bg-light">
        <Navbar />
        <h1>Today Hearings</h1>
        {hearings.length === 0 ? (
          <div className="jumbotron">
            <h2>No hearings today</h2>
            <p>There are no hearings scheduled for today.</p>
          </div>
        ) : (
          hearings.map((hearing) => (
            <ScheduleCard
              key={hearing._id}
              caseNo={hearing.caseNumber}
              lawyerName={hearing?.lawyerId?.name}
              ProsName={hearing.clientId.name}
              date={new Date(hearing.date).toLocaleDateString()}
              time={new Date(hearing.date).toLocaleTimeString()}
              court={hearing.judgeId.court}
            />
          ))
        )}
      </div>
    </AdminDashboard>
  );
}

export default JudgeHome;
