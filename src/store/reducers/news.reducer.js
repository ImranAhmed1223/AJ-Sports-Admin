import { authConstant, newsConstant } from "../constants";

const initialState = {
  news: [],
  singleNews: {},
  totalPages: 0,
  newsTotalResults: 0,
  message: "",
  errors: [],
  loading: false,
  createLoading: false,
};

const NEWSReducer = (state = initialState, action) => {
  switch (action.type) {
    case newsConstant.UPDATE_NEWS_REQUEST:
    case newsConstant.GET_ALL_NEWS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case newsConstant.CREATE_NEWS_REQUEST:
      return {
        ...state,
        createLoading: true,
      };
    case newsConstant.CREATE_NEWS_SUCCESS:
    case newsConstant.DELETE_NEWS_SUCCESS:
    case newsConstant.UPDATE_NEWS_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
        createLoading: false,
      };
    case newsConstant.GET_ALL_NEWS_SUCCESS:
      return {
        ...state,
        loading: false,
        news: action.payload.results,
        totalPages: action.payload.totalPages,
        newsTotalResults: action.payload.totalResults,
      };
    case newsConstant.GET_NEWS_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        singleNews: action.payload,
      };
    case newsConstant.CREATE_NEWS_FAILURE:
    case newsConstant.GET_ALL_NEWS_FAILURE:
    case newsConstant.DELETE_NEWS_FAILURE:
    case newsConstant.UPDATE_NEWS_FAILURE:
    case newsConstant.GET_NEWS_BY_ID_FAILURE:
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

export default NEWSReducer;
