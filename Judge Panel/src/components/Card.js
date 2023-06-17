import React from "react";

export default function ScheduleCard({
  caseNo,
  lawyerName,
  ProsName,
  date,
  time,
  comments,
  status,
  court,
}) {
  return (
    <div>
      <div
        className="card"
        style={{ marginBottom: "2rem", border: "2px solid black" }}
      >
        <h5 className="card-header">{court}</h5>
        <div className="card-body">
          <h5 className="card-title">Case Number: {caseNo}</h5>
          <p className="card-text">Lawyer Name: {lawyerName}</p>
          <p className="card-text">Prosecution Lawyer Name: {ProsName}</p>
          <p className="card-text">Date: {date}</p>
          <p className="card-text">Time: {time}</p>
        </div>
      </div>
    </div>
  );
}
