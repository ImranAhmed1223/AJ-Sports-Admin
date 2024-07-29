import { authConstant, nflTeamConstant } from "../constants";

const initialState = {
  nflTeam: [],
  singleNflTeam: {},
  totalPages: 0,
  nflTotalResults: 0,
  message: "",
  errors: [],
  loading: false,
};

const nflTeamReducer = (state = initialState, action) => {
  switch (action.type) {
    case nflTeamConstant.CREATE_nflTeam_REQUEST:
    case nflTeamConstant.UPDATE_nflTeam_REQUEST:
    case nflTeamConstant.CREATE_nflFixture_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case nflTeamConstant.CREATE_nflTeam_SUCCESS:
    case nflTeamConstant.DELETE_nflTeam_SUCCESS:
    case nflTeamConstant.UPDATE_nflTeam_SUCCESS:
    case nflTeamConstant.CREATE_nflFixture_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case nflTeamConstant.GET_ALL_nflTeam_SUCCESS:
      return {
        ...state,
        loading: false,
        nflTeam: action.payload.results,
        totalPages: action.payload.totalPages,
        nflTotalResults: action.payload.totalResults,
      };
    case nflTeamConstant.GET_nflTeam_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        singleNflTeam: action.payload,
      };
    case nflTeamConstant.CREATE_nflTeam_FAILURE:
    case nflTeamConstant.GET_ALL_nflTeam_FAILURE:
    case nflTeamConstant.DELETE_nflTeam_FAILURE:
    case nflTeamConstant.UPDATE_nflTeam_FAILURE:
    case nflTeamConstant.GET_nflTeam_BY_ID_FAILURE:
    case nflTeamConstant.CREATE_nflFixture_FAILURE:
      return {
        ...state,
        loading: false,
        errors: action.payload.err,
      };
    case authConstant.CLEAR_MESSAGES:
      return {
        ...state,
        loading: false,
        message: "",
      };
    case authConstant.CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        errors: [],
      };
    default:
      return state;
  }
};

export default nflTeamReducer;
