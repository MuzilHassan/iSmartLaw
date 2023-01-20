import React from "react";
import AdminDashobard from "../components/AdminDashobard";

function AdminClients() {
  return (
    <AdminDashobard>
      <div className="col-10 p-3 bg-light" style={{ height: "100vh" }}>
        <h3 style={{ fontWeight: "600" }}>Clients</h3>
        <hr />
        <div className="container">
          <div className="row mb-4 mt-4">
            <div className="col-lg-12 col-sm-8">
              <div className="float-right-md">
                <div className="input-group">
                  <input
                    type="search"
                    className="form-control rounded"
                    placeholder="Search Client"
                    aria-label="Search"
                    aria-describedby="search-addon"
                  />
                  <button type="button" className="btn btn-outline-primary ">
                    search
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="row mb-4 mt-4">
            <div className="col-lg-12 col-sm-8 ">
              <div
                className="card "
                style={{
                  borderRadius: "10px",
                  marginBottom: "10px",
                  marginTop: "10px",
                  hover: {
                    boxShadow:
                      " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19",
                  },
                }}
              >
                <div className="card-body">
                  <div className="card-title">
                    <h4 style={{ fontSize: "18px", fontWeight: "400" }}>
                      Clients List
                    </h4>
                  </div>
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Phone</th>
                          <th>City</th>
                          <th>Email</th>
                          <th>Address</th>
                          <th>Block Client</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-bottom mb-6">
                          <td>Umar</td>
                          <td>09078654321</td>
                          <td>Banigala</td>
                          <td>umarfarooq@gmail.com</td>
                          <td>house-21 street 5</td>
                          <td>
                            <button className="btn btn-danger btn-sm btn-hover-bg-shade-amount:20%">
                              Block
                            </button>
                          </td>
                        </tr>
                        <tr className="border-bottom mb-6">
                          <td>Umar</td>
                          <td>0349831774</td>
                          <td>Banigala</td>
                          <td>umarfarooq@gmail.com</td>
                          <td>house-21 street 5</td>
                          <td>
                            <button className="btn btn-danger btn-sm">
                              Block
                            </button>
                          </td>
                        </tr>
                        <tr className="border-bottom mb-6">
                          <td>Umar</td>
                          <td>0349831907</td>
                          <td>Banigala</td>
                          <td>umarfarooq@gmail.com</td>
                          <td>house-21 street 5</td>
                          <td>
                            <button className="btn btn-danger btn-sm">
                              Block
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminDashobard>
  );
}

export default AdminClients;
