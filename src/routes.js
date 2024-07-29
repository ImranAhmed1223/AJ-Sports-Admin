import Dashboard from "layouts/dashboard";
import Channels from "layouts/channels";
import News from "layouts/news";
import Advertisement from "layouts/advertisement";
import SignUp from "layouts/authentication/sign-up/index";
import BoxingPlayer from "layouts/boxing-player";
import NflTeam from "layouts/nfl-teams";
import NflFixture from "layouts/nfl-fixture";
import BoxingFixture from "layouts/boxing-fixture";
import BasketBallFixture from "layouts/basketball-fixture";
import FootBallFixture from "layouts/football-fixture";
// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Channels",
    key: "channels",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/channels",
    component: <Channels />,
  },
  {
    type: "collapse",
    name: "News",
    key: "news",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/news",
    component: <News />,
  },
  // {
  //   type: "collapse",
  //   name: "Advertisement",
  //   key: "advertisement",
  //   icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
  //   route: "/advertisement",
  //   component: <Advertisement />,
  // },
  {
    type: "collapse",
    name: "NFL Team",
    key: "nfl-team",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/nfl-team",
    component: <NflTeam />,
  },
  {
    type: "collapse",
    name: "NFL Fixture",
    key: "nfl-fixture",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/nfl-fixture",
    component: <NflFixture />,
  },
  {
    type: "collapse",
    name: "Boxing Player",
    key: "boxing-player",
    icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
    route: "/boxing-player",
    component: <BoxingPlayer />,
  },
  {
    type: "collapse",
    name: "Football Fixture",
    key: "football-fixture",
    icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
    route: "/football-fixture",
    component: <FootBallFixture />,
  },
  {
    type: "collapse",
    name: "Basketball Fixture",
    key: "basketball-fixture",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/basketball-fixture",
    component: <BasketBallFixture />,
  },
  {
    type: "collapse",
    name: "Boxing Fixture",
    key: "boxing-fixture",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/boxing-fixture",
    component: <BoxingFixture />,
  },
  {
    type: "collapse",
    name: "Create New Admin",
    key: "sign-up",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/signup",
    component: <SignUp />,
  },
];

export default routes;
