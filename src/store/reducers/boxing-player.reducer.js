import { authConstant, boxingPlayerConstant } from "../constants";

const initialState = {
  boxingPlayer: [],
  singleBoxingPlayer: {},
  totalPages: 0,
  boxingTotalResults: 0,
  message: "",
  errors: [],
  loading: false,
  createLoading: false,
};

const boxingPlayerReducer = (state = initialState, action) => {
  switch (action.type) {
    case boxingPlayerConstant.GET_ALL_boxingPlayer_REQUEST:
    case boxingPlayerConstant.UPDATE_boxingPlayer_REQUEST:
    case boxingPlayerConstant.CREATE_boxingFixture_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case boxingPlayerConstant.CREATE_boxingPlayer_REQUEST:
      return {
        ...state,
        createLoading: true,
      };
    case boxingPlayerConstant.CREATE_boxingPlayer_SUCCESS:
    case boxingPlayerConstant.DELETE_boxingPlayer_SUCCESS:
    case boxingPlayerConstant.UPDATE_boxingPlayer_SUCCESS:
    case boxingPlayerConstant.CREATE_boxingFixture_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
        createLoading: false,
      };
    case boxingPlayerConstant.GET_ALL_boxingPlayer_SUCCESS:
      return {
        ...state,
        loading: false,
        boxingPlayer: action.payload.results,
        totalPages: action.payload.totalPages,
        boxingTotalResults: action.payload.totalResults,
      };
    case boxingPlayerConstant.GET_boxingPlayer_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        singleBoxingPlayer: action.payload,
      };
    case boxingPlayerConstant.CREATE_boxingPlayer_FAILURE:
    case boxingPlayerConstant.GET_ALL_boxingPlayer_FAILURE:
    case boxingPlayerConstant.DELETE_boxingPlayer_FAILURE:
    case boxingPlayerConstant.UPDATE_boxingPlayer_FAILURE:
    case boxingPlayerConstant.GET_boxingPlayer_BY_ID_FAILURE:
    case boxingPlayerConstant.CREATE_boxingFixture_FAILURE:
      return {
        ...state,
        loading: false,
        createLoading: false,
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

export default boxingPlayerReducer;
