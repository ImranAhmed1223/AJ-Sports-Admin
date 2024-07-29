import { authConstant, channelConstant } from "../constants";

const initialState = {
  channels: [],
  singleChannel: {},
  totalPages: 0,
  totalResults: 0,
  message: "",
  errors: [],
  loading: false,
  createLoading: false,
};

const channelReducer = (state = initialState, action) => {
  switch (action.type) {
    case channelConstant.UPDATE_CHANNEL_REQUEST:
    case channelConstant.GET_ALL_CHANNELS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case channelConstant.CREATE_CHANNEL_REQUEST:
      return {
        ...state,
        createLoading: true,
      };
    case channelConstant.CREATE_CHANNEL_SUCCESS:
    case channelConstant.DELETE_CHANNEL_SUCCESS:
    case channelConstant.UPDATE_CHANNEL_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
        createLoading: false,
      };
    case channelConstant.GET_ALL_CHANNELS_SUCCESS:
      return {
        ...state,
        loading: false,
        channels: action.payload.results,
        totalPages: action.payload.totalPages,
        totalResults: action.payload.totalResults,
      };
    case channelConstant.GET_CHANNEL_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        singleChannel: action.payload,
      };
    case channelConstant.CREATE_CHANNEL_FAILURE:
    case channelConstant.GET_ALL_CHANNELS_FAILURE:
    case channelConstant.DELETE_CHANNEL_FAILURE:
    case channelConstant.UPDATE_CHANNEL_FAILURE:
    case channelConstant.GET_CHANNEL_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        errors: action.payload.err,
        createLoading: false,
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

export default channelReducer;
