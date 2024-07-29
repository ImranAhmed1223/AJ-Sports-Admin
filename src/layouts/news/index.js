import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useEffect } from "react";
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
  CreateNews,
  GetAllNews,
  DeleteNEWS,
  clearErrors,
  clearMessages,
} from "./../../store/actions";
import Pagination from "@mui/material/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

function Tables() {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const imageInputRef = React.useRef();
  const createValidation = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
  });
  const dispatch = useDispatch();
  const { news, totalPages, errors, message, createLoading, loading } =
    useSelector((state) => state.newsReducer);

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
    if (news.length <= 0) {
      dispatch(GetAllNews(page));
    }
  }, []);

  const handleDeleteNews = (id) => {
    let value = window.confirm("Are u Sure You Want To Delete This?");
    if (value) {
      dispatch(DeleteNEWS(id));
    }
  };

  const handlePage = (value) => {
    setPage(value);
    dispatch(GetAllNews(page));
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
            Create News
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <Formik
            initialValues={{
              title: "",
              description: "",
            }}
            validationSchema={createValidation}
            onSubmit={(values, { resetForm }) => {
              const { title, description } = values;
              const result = new FormData();
              result.append("title", title);
              result.append("description", description);
              result.append("photoPath", image);
              dispatch(CreateNews(result));
              resetForm();
              imageInputRef.current.value = "";
            }}
            enableReinitialize
          >
            {(formik) => (
              <Form>
                <FormInput label="Enter News Title" name="title" type="text" />
                <FormInput
                  label="Enter Description"
                  name="description"
                  type="text"
                />
                <p>Enter Image</p>
                <input
                  ref={imageInputRef}
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                />
                <br />
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
                  News Table
                </MDTypography>
              </MDBox>

              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>News Title</th>
                      <th>Description</th>
                      <th>Image</th>
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
                    ) : news.length > 0 ? (
                      news.map((data, ind) => {
                        return (
                          <tr key={ind}>
                            <td className="data-label">{data.title}</td>
                            <td className="data-label">{data.description}</td>
                            <td className="data-label">
                              <img
                                crossOrigin="true"
                                src={
                                  data.photoPath
                                    ? data.photoPath
                                    : "https://www.google.com/imgres?imgurl=https%3A%2F%2Fcdn.pixabay.com%2Fphoto%2F2019%2F03%2F28%2F22%2F23%2Flink-4088190_1280.png&imgrefurl=https%3A%2F%2Fpixabay.com%2Fvectors%2Flink-hyperlink-external-link-chain-4088190%2F&tbnid=b0JKnhSDPuwOsM&vet=12ahUKEwjLv_voy-37AhW6gc4BHQzkCYoQMygDegUIARDEAQ..i&docid=pg0fPHRTbpqi-M&w=1280&h=1280&q=link%20of%20image&ved=2ahUKEwjLv_voy-37AhW6gc4BHQzkCYoQMygDegUIARDEAQ"
                                }
                                height="30"
                                width="30"
                                style={{ borderRadius: "50%" }}
                                alt="image"
                              />
                            </td>
                            <td>
                              <span className="action-edit-btn">
                                <EditIcon
                                  fontSize="medium"
                                  style={{
                                    cursor: "pointer",
                                  }}
                                  onClick={() =>
                                    navigate(`/editNews/${data.id}`)
                                  }
                                />
                              </span>
                              <span className="action-delete-btn">
                                <DeleteIcon
                                  onClick={() => handleDeleteNews(data.id)}
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
