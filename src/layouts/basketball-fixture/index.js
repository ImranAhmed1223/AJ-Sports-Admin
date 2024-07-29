import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Puff } from "react-loader-spinner";
import Footer from "examples/Footer";
import EditIcon from "@mui/icons-material/Edit";
import "./Table.css";
import {
  BasekitBallFixture,
  clearErrors,
  clearMessages,
} from "./../../store/actions";
import Pagination from "@mui/material/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

function Tables() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const { basekitballFixture, totalPages, errors, message, loading } =
    useSelector((state) => state.authReducer);

  useEffect(() => {
    if (errors.length > 0) {
      toast.error(errors);
      dispatch(clearErrors());
    }
    if (message != "") {
      toast.success(message);
      dispatch(clearMessages());
    }
  }, [errors, message]);

  useEffect(() => {
    if (basekitballFixture.length <= 0) {
      dispatch(BasekitBallFixture(page));
    }
  }, []);

  const handlePage = (value) => {
    setPage(value);
    dispatch(BasekitBallFixture(page));
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <br />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  NFL Team Table
                </MDTypography>
              </MDBox>

              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Type</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Category</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td>
                          <Puff
                            height="50"
                            width="50"
                            radius="6"
                            color="#1a73e8"
                            ariaLabel="loading"
                          />
                        </td>
                      </tr>
                    ) : basekitballFixture.length > 0 ? (
                      basekitballFixture.map((data, ind) => {
                        return (
                          <tr key={ind}>
                            <td className="data-label">{data.league.name}</td>
                            <td className="data-label">{data.league.type}</td>
                            <td className="data-label">{data.status.long}</td>
                            <td className="data-label">{data.date}</td>
                            <td className="data-label">{data.time}</td>
                            <td className="data-label">{data.category}</td>
                            <td>
                              <span className="action-edit-btn">
                                <EditIcon
                                  fontSize="medium"
                                  style={{
                                    cursor: "pointer",
                                  }}
                                  onClick={() =>
                                    navigate(
                                      `/edit-basketball-fixture/${data.id}`
                                    )
                                  }
                                />
                              </span>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td>No Data Found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "1.5rem",
                  }}
                >
                  <Pagination
                    count={totalPages}
                    page={page}
                    variant="outlined"
                    color="secondary"
                    size="large"
                    showFirstButton
                    showLastButton
                    onChange={(e, value) => handlePage(value)}
                  />
                </div>
              </div>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
