import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "examples/Footer";
import { Formik, Form } from "formik";
import FormInput from "components/FormInput/FormInput";
import MDButton from "components/MDButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import * as Yup from "yup";
import "./Table.css";
import {
  CreateBoxingFixture,
  GetAllNflTeam,
  DeleteNflTeam,
  clearErrors,
  clearMessages,
} from "./../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

function Tables() {
  const navigate = useNavigate();

  const [awayTeam, setAwayTeam] = useState("");
  const [homeTeam, setHomeTeam] = useState("");
  const [winnerTeam, setWinnerTeam] = useState("");
  const createValidation = Yup.object({
    date: Yup.date().required("Date is required"),
    category: Yup.string().required("Category is required"),
  });
  const dispatch = useDispatch();
  const { nflTeam } = useSelector((state) => state.nflTeamReducer);
  const { errors, message, loading } = useSelector(
    (state) => state.boxingPlayerReducer
  );
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
    if (nflTeam.length <= 0) {
      dispatch(GetAllNflTeam());
    }
  }, []);

  const handleDeletenflTeam = (id) => {
    let value = window.confirm("Are u Sure You Want To Delete This?");
    if (value) {
      dispatch(DeleteNflTeam(id));
    }
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
            Create Boxing Fixture
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <Formik
            initialValues={{
              date: "",
              category: "",
              name: "",
              city: "",
              long: "",
              elapsed: "",
              winner: "",
            }}
            validationSchema={createValidation}
            onSubmit={(values, { resetForm }) => {
              const {
                date,
                name,
                category,
                city,
                long,
                elapsed,
                awayGoal,
                homeGoal,
              } = values;

              const result = {
                date,
                category,
                venue: { name, city },
                status: { long, elapsed },
                teams: { challenger: awayTeam, defnender: homeTeam },
                winner: winnerTeam,
              };
              dispatch(CreateBoxingFixture(result));
              // resetForm();
            }}
            enableReinitialize
          >
            {(formik) => (
              <Form>
                <FormInput label="Enter Date" name="date" type="date" />
                <FormInput label="Enter Category" name="category" type="text" />
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ width: "50%", marginRight: "1rem" }}>
                    <FormInput
                      label="Enter Venu Name"
                      name="name"
                      type="text"
                    />
                  </div>
                  <div style={{ width: "50%", marginRight: "1rem" }}>
                    <FormInput
                      label="Enter Venu City"
                      name="city"
                      type="text"
                    />
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ width: "50%", marginRight: "1rem" }}>
                    <FormInput
                      label="Enter Status Long"
                      name="long"
                      type="text"
                    />
                  </div>
                  <div style={{ width: "50%", marginRight: "1rem" }}>
                    <FormInput
                      label="Enter Status Elapsed"
                      name="elapsed"
                      type="number"
                    />
                  </div>
                </div>
                <p>Select challenger Team</p>
                <br />
                <Box>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Select
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={awayTeam}
                      label="Age"
                      onChange={(e) => setAwayTeam(e.target.value)}
                      style={{ padding: ".7rem" }}
                    >
                      {nflTeam.length > 0 ? (
                        nflTeam.map((data, ind) => {
                          return (
                            <MenuItem value={data.id} key={ind}>
                              {data.name}
                            </MenuItem>
                          );
                        })
                      ) : (
                        <MenuItem>No Data Found</MenuItem>
                      )}
                    </Select>
                  </FormControl>
                </Box>

                <p>Select defnender Team</p>
                <br />
                <Box>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Select
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={homeTeam}
                      label="Age"
                      onChange={(e) => setHomeTeam(e.target.value)}
                      style={{ padding: ".7rem" }}
                    >
                      {nflTeam.length > 0 ? (
                        nflTeam.map((data, ind) => {
                          return (
                            <MenuItem value={data.id} key={ind}>
                              {data.name}
                            </MenuItem>
                          );
                        })
                      ) : (
                        <MenuItem>No Data Found</MenuItem>
                      )}
                    </Select>
                  </FormControl>
                </Box>
                <p>Select Winner Team</p>
                <br />
                <Box>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Select
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={winnerTeam}
                      label="Age"
                      onChange={(e) => setWinnerTeam(e.target.value)}
                      style={{ padding: ".7rem" }}
                    >
                      {nflTeam.length > 0 ? (
                        nflTeam.map((data, ind) => {
                          return (
                            <MenuItem value={data.id} key={ind}>
                              {data.name}
                            </MenuItem>
                          );
                        })
                      ) : (
                        <MenuItem>No Data Found</MenuItem>
                      )}
                    </Select>
                  </FormControl>
                </Box>
                <br />
                <center style={{ marginTop: "1rem" }}>
                  <MDButton
                    type="submit"
                    variant="gradient"
                    color="info"
                    fullWidth
                  >
                    {loading ? "Creating..." : "Create"}
                  </MDButton>
                </center>
              </Form>
            )}
          </Formik>
        </MDBox>
      </Card>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
