/**
=========================================================
* AJ Admin Panel React - v2.1.0
=========================================================

* Product Page: https://www.eliteitteam.com/product/material-dashboard-react
* Copyright 2022 Elite IT (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// AJ Admin Panel React base styles
import typography from "assets/theme/base/typography";
import colors from "assets/theme/base/colors";

// AJ Admin Panel React helper functions
// import pxToRem from "assets/theme/functions/pxToRem";

const { size } = typography;
const { text } = colors;

const dialogContentText = {
  styleOverrides: {
    root: {
      fontSize: size.md,
      color: text.main,
    },
  },
};

export default dialogContentText;
