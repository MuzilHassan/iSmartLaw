import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminDashboard from "../components/AdminDashobard";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/authContext";
import { useContext } from "react";
function ClosedCases() {
  const [data, setData] = useState([]);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    fetchClosedCases();
  }, []);

  const fetchClosedCases = async () => {
    try {
      const response = await axios.get(`/judge/closedCases/${user._id}`); // Update the API endpoint with your actual endpoint
      setData(response.data);
    } catch (error) {
      console.error("Error fetching closed cases:", error);
    }
  };

  return (
    <AdminDashboard>
      <Navbar />

      <div className="col-15 p-3 bg-light" style={{ height: "100vh" }}>
        <h3 style={{ fontWeight: "600" }}>Closed Cases</h3>
        <hr />
        <div className="container">
          <div className="row mb-4 mt-4">
            <div className="col-lg-12 col-sm-8">
              {data.length === 0 ? (
                <div className="jumbotron text-center">
                  <h1>No cases available</h1>
                  <p>There are no closed cases at the moment.</p>
                </div>
              ) : (
                <div className="card" style={{ borderRadius: "10px" }}>
                  <div className="card-body">
                    <div className="card-title">
                      <h4 style={{ fontSize: "18px", fontWeight: "400" }}>
                        Closed Cases List
                      </h4>
                    </div>
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>Case Number</th>
                            <th>Case Type</th>
                            <th>Case Description</th>
                            <th>Lawyer Name</th>
                            <th>Prosecution Name</th>
                            <th>Hearings Comments</th>
                            <th>Add Comments</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.map((item) => (
                            <tr key={item._id}>
                              <td>{item.caseNumber}</td>
                              <td>{item.caseType}</td>
                              <td>{item.caseDescription}</td>
                              <td>{item.lawyerId.name}</td>
                              <td>{item.clientId.name}</td>
                              <td>
                                {item.hearingComment.length > 0 ? (
                                  <ul>
                                    {item.hearingComment.map((comment, i) => (
                                      <li key={i}>{comment}</li>
                                    ))}
                                  </ul>
                                ) : (
                                  <p>No comments</p>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminDashboard>
  );
}

export default ClosedCases;
