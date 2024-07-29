import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "examples/Footer";
import { Formik, Form } from "formik";
import { Puff } from "react-loader-spinner";
import FormInput from "components/FormInput/FormInput";
import MDButton from "components/MDButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import * as Yup from "yup";
import "./Table.css";
import {
  CreateChannel,
  GetAllChannels,
  DeleteChannel,
  clearErrors,
  clearMessages,
} from "./../../store/actions";
import Pagination from "@mui/material/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

function Tables() {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const createValidation = Yup.object({
    name: Yup.string().required("Name is required"),
    link: Yup.string().url().required("Link is required"),
  });
  const dispatch = useDispatch();
  const { channels, totalPages, errors, message, loading, createLoading } =
    useSelector((state) => state.channelReducer);

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
    if (channels.length <= 0) {
      dispatch(GetAllChannels(page));
    }
  }, []);

  const handleDeleteChannel = (id) => {
    let value = window.confirm("Are u Sure You Want To Delete This?");
    if (value) {
      dispatch(DeleteChannel(id));
    }
  };

  const handlePage = (value) => {
    setPage(value);
    dispatch(GetAllChannels(page));
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <br />
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Create Channels
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <Formik
            initialValues={{
              name: "",
              link: "",
            }}
            validationSchema={createValidation}
            onSubmit={(values, { resetForm }) => {
              dispatch(CreateChannel(values));
              resetForm();
            }}
            enableReinitialize
          >
            {(formik) => (
              <Form>
                <FormInput label="Enter Channel Name" name="name" type="text" />
                <FormInput label="Enter Link" name="link" type="text" />
                <center style={{ marginTop: "1rem" }}>
                  <MDButton
                    type="submit"
                    variant="gradient"
                    color="info"
                    fullWidth
                  >
                    {createLoading ? "Creating..." : "Create"}
                  </MDButton>
                </center>
              </Form>
            )}
          </Formik>
        </MDBox>
      </Card>
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
                  Channel Table
                </MDTypography>
              </MDBox>

              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Channel Name</th>
                      <th>Channel Link</th>
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
                    ) : channels.length > 0 ? (
                      channels.map((data, ind) => {
                        return (
                          <tr key={ind}>
                            <td>{data.name}</td>
                            <td>{data.link}</td>
                            <td>
                              <span className="action-edit-btn">
                                <EditIcon
                                  fontSize="medium"
                                  style={{
                                    cursor: "pointer",
                                  }}
                                  onClick={() =>
                                    navigate(`/editChannel/${data.id}`)
                                  }
                                />
                              </span>
                              <span className="action-delete-btn">
                                <DeleteIcon
                                  onClick={() => handleDeleteChannel(data.id)}
                                  fontSize="medium"
                                  style={{
                                    cursor: "pointer",
                                  }}
                                  sx={{ margin: "0px 3px" }}
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
