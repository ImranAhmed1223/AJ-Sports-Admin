import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "examples/Footer";
import { Formik, Form } from "formik";
import FormInput from "components/FormInput/FormInput";
import MDButton from "components/MDButton";
import * as Yup from "yup";
import "./Table.css";
import {
  GetChannelById,
  UpdateChannel,
  clearErrors,
  clearMessages,
} from "./../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

function EditChannel() {
  const navigate = useNavigate();
  const { id } = useParams();
  const updateValidation = Yup.object({
    name: Yup.string(),
    link: Yup.string().url(),
  });
  const dispatch = useDispatch();
  const { singleChannel, errors, message, loading } = useSelector(
    (state) => state.channelReducer
  );
  useEffect(() => {
    dispatch(GetChannelById(id));
  }, []);

  useEffect(() => {
    if (errors.length > 0) {
      toast.error(errors);
      dispatch(clearErrors());
    }
    if (message != "") {
      toast.success(message);
      dispatch(clearMessages());
      setTimeout(() => navigate("/channels"), 2000);
    }
  }, [errors, message]);

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
            Edit Channel
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <Formik
            initialValues={{
              name: singleChannel ? singleChannel.name : "",
              link: singleChannel ? singleChannel.link : "",
            }}
            validationSchema={updateValidation}
            onSubmit={(values, { resetForm }) => {
              dispatch(UpdateChannel(id, values));
              // resetForm();
            }}
            enableReinitialize
          >
            {(formik) => (
              <Form>
                <FormInput label="Channel Name" name="name" type="text" />
                <FormInput label="Link" name="link" type="text" />
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

export default EditChannel;
