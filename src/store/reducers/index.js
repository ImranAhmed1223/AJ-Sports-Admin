import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import channelReducer from "./channel.reducer";
import newsReducer from "./news.reducer";
import advReducer from "./advertisement.reducer";
import boxingPlayerReducer from "./boxing-player.reducer";
import nflTeamReducer from "./nfl-team.reducer";

const rootReducer = combineReducers({
  authReducer,
  channelReducer,
  newsReducer,
  advReducer,
  boxingPlayerReducer,
  nflTeamReducer,
});

export default rootReducer;
