import { channelConstant } from "store/constants";
import axios from "axios";

export const GetAllChannels = (page) => {
  return async (dispatch) => {
    dispatch({ type: channelConstant.GET_ALL_CHANNELS_REQUEST });
    try {
      const token = localStorage.getItem("adminToken");
      const result = await axios.get(
        `${process.env.REACT_APP_ROOT}/v1/channel?page=${page}&limit=20`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "", //the token is a variable which holds the token
          },
        }
      );
      const { data } = result;
      dispatch({
        type: channelConstant.GET_ALL_CHANNELS_SUCCESS,
        payload: {
          results: data.results,
          totalPages: data.totalPages,
          totalResults: data.totalResults,
        },
      });
    } catch (error) {
      dispatch({
        type: channelConstant.GET_ALL_CHANNELS_FAILURE,
        payload: { err: error.response.data.message },
      });
    }
  };
};

export const CreateChannel = (body) => {
  return async (dispatch) => {
    dispatch({ type: channelConstant.CREATE_CHANNEL_REQUEST });
    try {
      const token = localStorage.getItem("adminToken");
      await axios.post(`${process.env.REACT_APP_ROOT}/v1/channel`, body, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "", //the token is a variable which holds the token
        },
      });
      dispatch(GetAllChannels(1));
      dispatch({
        type: channelConstant.CREATE_CHANNEL_SUCCESS,
        payload: "Created Successfully!",
      });
    } catch (error) {
      dispatch({
        type: channelConstant.CREATE_CHANNEL_FAILURE,
        payload: { err: error.response.data.message },
      });
    }
  };
};

export const GetChannelById = (id) => {
  return async (dispatch) => {
    dispatch({ type: channelConstant.GET_CHANNEL_BY_ID_REQUEST });
    try {
      const token = localStorage.getItem("adminToken");
      const result = await axios.get(
        `${process.env.REACT_APP_ROOT}/v1/channel/${id}`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "", //the token is a variable which holds the token
          },
        }
      );
      const { data } = result;
      dispatch({
        type: channelConstant.GET_CHANNEL_BY_ID_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: channelConstant.GET_CHANNEL_BY_ID_FAILURE,
        payload: { err: error.response.data.message },
      });
    }
  };
};

export const UpdateChannel = (id, body) => {
  return async (dispatch) => {
    dispatch({ type: channelConstant.UPDATE_CHANNEL_REQUEST });
    try {
      const token = localStorage.getItem("adminToken");
      await axios.patch(
        `${process.env.REACT_APP_ROOT}/v1/channel/${id}`,
        body,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "", //the token is a variable which holds the token
          },
        }
      );
      dispatch(GetAllChannels(1));
      dispatch({
        type: channelConstant.UPDATE_CHANNEL_SUCCESS,
        payload: "Updated Successfully!",
      });
    } catch (error) {
      dispatch({
        type: channelConstant.UPDATE_CHANNEL_FAILURE,
        payload: { err: error.response.data.message },
      });
    }
  };
};

export const DeleteChannel = (id) => {
  return async (dispatch) => {
    dispatch({ type: channelConstant.DELETE_CHANNEL_REQUEST });
    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(`${process.env.REACT_APP_ROOT}/v1/channel/${id}`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "", //the token is a variable which holds the token
        },
      });
      dispatch(GetAllChannels(1));
      dispatch({
        type: channelConstant.DELETE_CHANNEL_SUCCESS,
        payload: "Deleted Successfully!",
      });
    } catch (error) {
      dispatch({
        type: channelConstant.DELETE_CHANNEL_FAILURE,
        payload: { err: error.response.data.message },
      });
    }
  };
};
