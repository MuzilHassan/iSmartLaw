import React from "react";
import AdminDashobard from "../components/AdminDashobard";
function AddAdmin() {
  return (
    <AdminDashobard>
      <div class="col-10 p-3 bg-light " style={{ height: "100vh" }}>
        <h3>Add a new Admin</h3>
        <hr />
        <div class="container">
          <div class="row mb-4 mt-4">
            <div class="col-lg-12 col-sm-7 col-md-9 col-5">
              <div class="card">
                <div class="card-body">
                  <div class="center">
                    <form
                      id="add_admin_form"
                      action="#"
                      method="post"
                      class="form-group"
                    >
                      <table class="center table table-borderless">
                        <tbody>
                          <tr>
                            <td align="right">
                              <label for="firstname">First Name:</label>
                            </td>
                            <td>
                              <input
                                id="firstname"
                                type="text"
                                name="firstname"
                                value=""
                                class="form-control validity"
                              />
                              <small class="form-text text-muted error"></small>
                            </td>
                          </tr>
                          <tr>
                            <td align="right">
                              <label for="lastname">Last Name:</label>
                            </td>
                            <td>
                              <input
                                id="lastname"
                                type="text"
                                name="lastname"
                                value=""
                                class="form-control validity"
                              />
                              <small class="form-text text-muted error"></small>
                            </td>
                          </tr>
                          <tr>
                            <td align="right">
                              <label for="username">Username:</label>
                            </td>
                            <td>
                              <input
                                id="username"
                                type="text"
                                name="username"
                                value=""
                                class="form-control validity"
                              />
                              <small class="form-text text-muted error"></small>
                            </td>
                          </tr>
                          <tr>
                            <td align="right">
                              <label for="email">Email Address:</label>
                            </td>
                            <td>
                              <input
                                id="email"
                                type="text"
                                name="email"
                                class="form-control validity"
                              />
                              <small class="form-text text-muted error"></small>
                            </td>
                          </tr>

                          <tr>
                            <td align="right">
                              <label for="password">Password:</label>
                            </td>
                            <td>
                              <input
                                id="password"
                                type="password"
                                name="password"
                                class="form-control validity"
                              />
                              <small class="form-text text-muted error"></small>
                            </td>
                          </tr>
                          <tr>
                            <td align="right">
                              <label for="confirm_password">
                                Confirm password:
                              </label>
                            </td>
                            <td>
                              <input
                                id="confirm_password"
                                type="password"
                                name="confirm_password"
                                class="form-control validity"
                              />
                              <small class="form-text text-muted error"></small>
                            </td>
                          </tr>
                          <tr>
                            <td align="right">
                              <label
                                for="expiryDate"
                                data-toggle="tooltip"
                                data-placement="right"
                                title="If not Selected, account won't expire until it is deleted mannually."
                              >
                                Expiry Date:
                              </label>
                            </td>
                            <td>
                              <input
                                type="date"
                                class="validity"
                                id="expiryDate"
                                name="expiryDate"
                                for="expiryDate"
                                data-toggle="tooltip"
                                data-placement="right"
                                title="If not Selected, account won't expire until it is deleted mannually."
                              />
                              <small class="form-text text-muted error"></small>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <p>
                        <input
                          type="submit"
                          name="submit"
                          value="Add Admin"
                          class="btn btn-sm btn-primary"
                        />
                      </p>
                    </form>
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

export default AddAdmin;
