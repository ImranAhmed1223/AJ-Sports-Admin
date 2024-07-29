import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React from "react";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "examples/Footer";
import { Formik, Form } from "formik";
import FormInput from "components/FormInput/FormInput";
import MDButton from "components/MDButton";
import * as Yup from "yup";
import "./Table.css";
import {
  UpdateBasekitBallFixture,
  GetBasketBallFeatureById,
  clearErrors,
  clearMessages,
} from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

function EditAdvertisement() {
  const navigate = useNavigate();
  const { id } = useParams();
  const updateValidation = Yup.object({
    category: Yup.string(),
  });
  const dispatch = useDispatch();
  const { singleBasekitbalFixture, errors, message, loading } = useSelector(
    (state) => state.authReducer
  );

  useEffect(() => {
    if (errors.length > 0) {
      toast.error(errors);
      dispatch(clearErrors());
    }
    if (message != "") {
      toast.success(message);
      dispatch(clearMessages());
      setTimeout(() => navigate("/basketball-fixture"), 2000);
    }
  }, [errors, message]);

  useEffect(() => {
    dispatch(GetBasketBallFeatureById(id));
  }, []);
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
            Edit BasekitBall Fixture Category
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <Formik
            initialValues={{
              category: singleBasekitbalFixture.category
                ? singleBasekitbalFixture.category
                : "",
            }}
            validationSchema={updateValidation}
            onSubmit={(values, { resetForm }) => {
              dispatch(UpdateBasekitBallFixture(id, values));
              resetForm();
            }}
            enableReinitialize
          >
            {(formik) => (
              <Form>
                <FormInput label="Category" name="category" type="text" />
                <center style={{ marginTop: "1rem" }}>
                  <MDButton
                    type="submit"
                    variant="gradient"
                    color="info"
                    fullWidth
                  >
                    {loading ? "Updating..." : "Update"}
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

export default EditAdvertisement;
