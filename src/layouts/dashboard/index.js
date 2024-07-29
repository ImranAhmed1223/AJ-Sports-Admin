import Grid from "@mui/material/Grid";
import { useEffect } from "react";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import {
  GetAllChannels,
  GetAllNews,
  BasekitBallFixture,
  FootBallFixture,
  GetAllBoxingPlayer,
  GetAllNflTeam,
} from "./../../store/actions";
import { useDispatch, useSelector } from "react-redux";

function Dashboard() {
  const dispatch = useDispatch();
  const { totalResults } = useSelector((state) => state.channelReducer);
  const { newsTotalResults } = useSelector((state) => state.newsReducer);
  const { totalResultsBasekitball, totalResultsFootball } = useSelector(
    (state) => state.authReducer
  );
  const { boxingTotalResults } = useSelector(
    (state) => state.boxingPlayerReducer
  );
  const { nflTotalResults } = useSelector((state) => state.nflTeamReducer);
  useEffect(() => {
    if (totalResults === 0) {
      dispatch(GetAllChannels(1));
    }
    if (newsTotalResults == 0) {
      dispatch(GetAllNews(1));
    }
    if (totalResultsBasekitball === 0) {
      dispatch(BasekitBallFixture(1));
    }
    if (totalResultsFootball === 0) {
      dispatch(FootBallFixture(1));
    }
    if (boxingTotalResults === 0) {
      dispatch(GetAllBoxingPlayer(1));
    }
    if (nflTotalResults === 0) {
      dispatch(GetAllNflTeam(1));
    }
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6} lg={6}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title="Channels"
                count={totalResults != 0 ? totalResults : 0}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="News"
                count={newsTotalResults != 0 ? newsTotalResults : 0}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="NFL Team"
                count={nflTotalResults != 0 ? nflTotalResults : 0}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title="Boxing Player"
                count={boxingTotalResults != 0 ? boxingTotalResults : 0}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="FootBall Fixture"
                count={totalResultsFootball != 0 ? totalResultsFootball : 0}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="BasekitBall Fixture"
                count={
                  totalResultsBasekitball != 0 ? totalResultsBasekitball : 0
                }
              />
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
