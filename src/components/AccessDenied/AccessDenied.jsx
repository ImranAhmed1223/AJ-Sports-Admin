// import React from "react";
// import { Link } from "react-router-dom";

// const AccessDenied = () => {
//   return (
//     <>
//       <section className="page_404">
//         <div className="container">
//           <div className="row">
//             <div className="col-sm-12 ">
//               <center>
//                 <div className="col-sm-10 col-sm-offset-1  text-center">
//                   <div className="heading-for-access-im">
//                     <h1 className="text-center ">Something went wrong</h1>
//                   </div>
//                   <div className="four_zero_four_bg"></div>
//                   <center>
//                     <div
//                       className="contant_box_404"
//                       style={{ fontSize: "4rem" }}
//                     >
//                       <h3 className="h2">Looks like you are lost</h3>

//                       <p style={{ fontSize: "4rem" }}>
//                         The page you are looking for is not available
//                       </p>

//                       <Link to="/" className="link_404">
//                         Go to Home
//                       </Link>
//                     </div>
//                   </center>
//                 </div>
//               </center>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default AccessDenied;

import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { purple } from "@mui/material/colors";
import { Navigate, useNavigate } from "react-router-dom";

const primary = purple[500]; // #f44336

export default function Error() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#2596be",
      }}
    >
      <Typography variant="h1" style={{ color: "white" }}>
        404
      </Typography>
      <Typography variant="h6" style={{ color: "white" }}>
        The page you’re looking for doesn’t exist.
      </Typography>
      <Button
        variant="contained"
        style={{ color: "white" }}
        onClick={() => navigate("/")}
      >
        Back Home
      </Button>
    </Box>
  );
}
