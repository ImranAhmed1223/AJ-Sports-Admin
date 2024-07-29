import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
// AJ Admin Panel React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import {
  AdminRegister,
  clearErrors,
  clearMessages,
} from "./../../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";

function Cover() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { errors, message, loading } = useSelector(
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
      setTimeout(() => navigate("/dashboard"), 2000);
    }
  }, [errors, message]);

  const handleSignup = () => {
    const result = { email, password, firstName, lastName };
    dispatch(AdminRegister(result));
  };
  return (
    <CoverLayout image={bgImage}>
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
            Create New Admin
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter admin email and password to register
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="firstName"
                variant="standard"
                fullWidth
                onChange={(e) => setFirstName(e.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="lastName"
                variant="standard"
                fullWidth
                onChange={(e) => setLastName(e.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Email"
                variant="standard"
                fullWidth
                onChange={(e) => setEmail(e.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                variant="standard"
                fullWidth
                onChange={(e) => setPassword(e.target.value)}
              />
            </MDBox>
            <MDBox mt={4} mb={1} onClick={() => handleSignup()}>
              <MDButton variant="gradient" color="info" fullWidth>
                {loading ? "Creating..." : "Create"}
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Go To Dashboard?{" "}
                <MDTypography
                  component={Link}
                  to="/dashboard"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Click Here
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
