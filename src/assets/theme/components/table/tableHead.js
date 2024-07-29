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
import borders from "assets/theme/base/borders";

// AJ Admin Panel React helper functions
import pxToRem from "assets/theme/functions/pxToRem";

const { borderRadius } = borders;

const tableHead = {
  styleOverrides: {
    root: {
      display: "block",
      padding: `${pxToRem(16)} ${pxToRem(16)} 0  ${pxToRem(16)}`,
      borderRadius: `${borderRadius.xl} ${borderRadius.xl} 0 0`,
    },
  },
};

export default tableHead;
