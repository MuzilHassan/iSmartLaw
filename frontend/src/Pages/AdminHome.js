import React from "react";
import AdminDashobard from "../components/AdminDashobard";
function AdminHome() {
  return (
    <AdminDashobard>
      <div className="col-10 p-3 bg-light " style={{ height: "100vh" }}>
        <h1>This is Home Page</h1>
      </div>
    </AdminDashobard>
  );
}

export default AdminHome;
