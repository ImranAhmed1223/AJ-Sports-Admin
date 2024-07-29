import { authConstant } from "../constants";

const initialState = {
  message: "",
  basekitballFixture: [],
  footballFixture: [],
  singleFootbalFixture: {},
  singleBasekitbalFixture: {},
  totalPages: 0,
  totalResultsBasekitball: 0,
  totalResultsFootball: 0,
  errors: [],
  loading: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case authConstant.ADMIN_LOGIN_REQUEST:
    case authConstant.ADMIN_REGISTER_REQUEST:
    case authConstant.UPDATE_BASEKITBALL_FIXTURE_REQUEST:
    case authConstant.BASEKITBALL_FIXTURE_REQUEST:
    case authConstant.FOOTBALL_FIXTURE_REQUEST:
    case authConstant.UPDATE_FOOTBALL_FIXTURE_REQUEST:
    case authConstant.GET_FOOTBALL_FIXTURE_BY_ID_REQUEST:
    case authConstant.GET_BASEKITBALL_FIXTURE_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case authConstant.ADMIN_LOGIN_SUCCESS:
    case authConstant.ADMIN_REGISTER_SUCCESS:
    case authConstant.UPDATE_BASEKITBALL_FIXTURE_SUCCESS:
    case authConstant.UPDATE_FOOTBALL_FIXTURE_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case authConstant.BASEKITBALL_FIXTURE_SUCCESS:
      return {
        ...state,
        loading: false,
        basekitballFixture: action.payload.results,
        totalPages: action.payload.totalPages,
        totalResultsBasekitball: action.payload.totalResultsBasekitball,
      };
    case authConstant.FOOTBALL_FIXTURE_SUCCESS:
      return {
        ...state,
        loading: false,
        footballFixture: action.payload.results,
        totalPages: action.payload.totalPages,
        totalResultsFootball: action.payload.totalResultsFootball,
      };
    case authConstant.GET_FOOTBALL_FIXTURE_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        singleFootbalFixture: action.payload,
      };
    case authConstant.GET_BASEKITBALL_FIXTURE_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        singleBasekitbalFixture: action.payload,
      };
    case authConstant.ADMIN_LOGIN_FAILURE:
    case authConstant.ADMIN_REGISTER_FAILURE:
    case authConstant.UPDATE_BASEKITBALL_FIXTURE_FAILURE:
    case authConstant.BASEKITBALL_FIXTURE_FAILURE:
    case authConstant.FOOTBALL_FIXTURE_FAILURE:
    case authConstant.UPDATE_FOOTBALL_FIXTURE_FAILURE:
    case authConstant.GET_FOOTBALL_FIXTURE_BY_ID_FAILURE:
    case authConstant.GET_BASEKITBALL_FIXTURE_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        errors: action.payload.err,
      };
      break;
    case authConstant.CLEAR_MESSAGES:
      return {
        ...state,
        loading: false,
        message: "",
      };
      break;
    case authConstant.CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        errors: [],
      };
      break;
    default:
      return state;
  }
};

export default authReducer;
