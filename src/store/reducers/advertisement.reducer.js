import { authConstant, advConstant } from "../constants";

const initialState = {
  adv: [],
  singleAdv: {},
  totalPages: 0,
  message: "",
  errors: [],
  loading: false,
};

const ADVReducer = (state = initialState, action) => {
  switch (action.type) {
    case advConstant.CREATE_ADV_REQUEST:
    case advConstant.UPDATE_ADV_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case advConstant.CREATE_ADV_SUCCESS:
    case advConstant.DELETE_ADV_SUCCESS:
    case advConstant.UPDATE_ADV_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case advConstant.GET_ALL_ADV_SUCCESS:
      return {
        ...state,
        loading: false,
        adv: action.payload.results,
        totalPages: action.payload.totalPages,
      };
    case advConstant.GET_ADV_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        singleAdv: action.payload,
      };
    case advConstant.CREATE_ADV_FAILURE:
    case advConstant.GET_ALL_ADV_FAILURE:
    case advConstant.DELETE_ADV_FAILURE:
    case advConstant.UPDATE_ADV_FAILURE:
    case advConstant.GET_ADV_BY_ID_FAILURE:
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

export default ADVReducer;
