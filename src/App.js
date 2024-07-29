import { useState, useEffect, useMemo } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";
import themeDark from "assets/theme-dark";
import themeDarkRTL from "assets/theme-dark/theme-rtl";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import routes from "routes";
import {
  useMaterialUIController,
  setMiniSidenav,
  setOpenConfigurator,
} from "context";
import brandWhite from "assets/images/logo-ct.png";
import brandDark from "assets/images/logo-ct-dark.png";
import Signin from "./layouts/authentication/sign-in";
import Dashboard from "./layouts/dashboard";
import Signup from "./layouts/authentication/sign-up";
import Channels from "./layouts/channels/index";
import News from "./layouts/news/index";
import EditChannel from "./layouts/channels/EditChannel";
import EditNews from "./layouts/news/EditNews";
import Advertisement from "./layouts/advertisement/index";
import EditAdvertisement from "./layouts/advertisement/EditAdvertisement";
import BoxingPlayer from "layouts/boxing-player";
import EditBoxingPlayer from "./layouts/boxing-player/EditBoxingPlayer";
import NflTeam from "layouts/nfl-teams";
import EditNflTeam from "layouts/nfl-teams/EditNflTeam";
import NflFixture from "layouts/nfl-fixture";
import BoxingFixture from "layouts/boxing-fixture";
import BasketBallFixture from "layouts/basketball-fixture";
import EditBasketBallFixture from "layouts/basketball-fixture/EditBasekitBallFixture";
import FootBallFixture from "layouts/football-fixture";
import EditFootBallFixture from "layouts/football-fixture/EditFootBalFixture";
import AccessDenied from "components/AccessDenied/AccessDenied";
import ProtectedRoute from "components/ProTectedRoute/ProTectedRoute";
import ProtectLoginRoute from "components/ProtectLoginRoute/ProtectLoginRoute";

export default function App() {
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    direction,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();

  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [rtlPlugin],
    });

    setRtlCache(cacheRtl);
  }, []);

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () =>
    setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const configsButton = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.25rem"
      height="3.25rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="small" color="inherit">
        settings
      </Icon>
    </MDBox>
  );

  return direction === "rtl" ? (
    <CacheProvider value={rtlCache}>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <ThemeProvider theme={darkMode ? themeDarkRTL : themeRTL}>
        <CssBaseline />
        {layout === "dashboard" && (
          <>
            <Sidenav
              color={sidenavColor}
              brand={
                (transparentSidenav && !darkMode) || whiteSidenav
                  ? brandDark
                  : brandWhite
              }
              brandName="AJ Admin Panel"
              routes={routes}
              onMouseEnter={handleOnMouseEnter}
              onMouseLeave={handleOnMouseLeave}
            />
            <Configurator />
            {configsButton}
          </>
        )}
        {layout === "vr" && <Configurator />}
        <Routes>
          {/* {getRoutes(routes)} */}
          <Route element={<ProtectLoginRoute />}>
            <Route path="/" element={<Signin />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/channels" element={<Channels />} />
            <Route path="/news" element={<News />} />
            <Route path="/editChannel/:id" element={<EditChannel />} />
            <Route path="/editNews/:id" element={<EditNews />} />
            <Route path="/advertisement" element={<Advertisement />} />
            <Route path="/editAdv/:id" element={<EditAdvertisement />} />
            <Route path="/boxing-player" element={<BoxingPlayer />} />
            <Route
              path="/edit-boxing-player/:id"
              element={<EditBoxingPlayer />}
            />
            <Route path="/nfl-team" element={<NflTeam />} />
            <Route path="/edit-nfl-team/:id" element={<EditNflTeam />} />
            <Route path="/nfl-fixture" element={<NflFixture />} />
            <Route path="/boxing-fixture" element={<BoxingFixture />} />
            <Route path="/basketball-fixture" element={<BasketBallFixture />} />
            <Route
              path="/edit-basketball-fixture/:id"
              element={<EditBasketBallFixture />}
            />
            <Route path="/football-fixture" element={<FootBallFixture />} />
            <Route
              path="/edit-football-fixture/:id/:mongoId"
              element={<EditFootBallFixture />}
            />
          </Route>
          <Route
            path="/not-found"
            element={<h1 className="text-white">Not found</h1>}
          />
          <Route path="/access-denied" element={<AccessDenied />} />
          <Route path="*" element={<Navigate to="/not-found" />} />
        </Routes>
      </ThemeProvider>
    </CacheProvider>
  ) : (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <CssBaseline />
      {layout === "dashboard" && (
        <>
          <Sidenav
            color={sidenavColor}
            brand={
              (transparentSidenav && !darkMode) || whiteSidenav
                ? brandDark
                : brandWhite
            }
            brandName="AJ Admin Panel"
            routes={routes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          <Configurator />
          {configsButton}
        </>
      )}
      {layout === "vr" && <Configurator />}
      <Routes>
        {/* {getRoutes(routes)} */}

        <Route element={<ProtectLoginRoute />}>
          <Route path="/" element={<Signin />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/channels" element={<Channels />} />
          <Route path="/news" element={<News />} />
          <Route path="/editChannel/:id" element={<EditChannel />} />
          <Route path="/editNews/:id" element={<EditNews />} />
          <Route path="/advertisement" element={<Advertisement />} />
          <Route path="/editAdv/:id" element={<EditAdvertisement />} />
          <Route path="/boxing-player" element={<BoxingPlayer />} />
          <Route
            path="/edit-boxing-player/:id"
            element={<EditBoxingPlayer />}
          />
          <Route path="/nfl-team" element={<NflTeam />} />
          <Route path="/edit-nfl-team/:id" element={<EditNflTeam />} />
          <Route path="/nfl-fixture" element={<NflFixture />} />
          <Route path="/boxing-fixture" element={<BoxingFixture />} />
          <Route path="/basketball-fixture" element={<BasketBallFixture />} />
          <Route
            path="/edit-basketball-fixture/:id"
            element={<EditBasketBallFixture />}
          />
          <Route path="/football-fixture" element={<FootBallFixture />} />
          <Route
            path="/edit-football-fixture/:id/:mongoId"
            element={<EditFootBallFixture />}
          />
        </Route>
        <Route
          path="/not-found"
          element={<h1 className="text-white">Not found</h1>}
        />
        <Route path="/access-denied" element={<AccessDenied />} />
        <Route path="*" element={<Navigate to="/not-found" />} />
      </Routes>
    </ThemeProvider>
  );
}
