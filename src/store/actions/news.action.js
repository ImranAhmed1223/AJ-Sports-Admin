import { newsConstant } from "store/constants";
import axios from "axios";

export const GetAllNews = (page) => {
  return async (dispatch) => {
    dispatch({ type: newsConstant.GET_ALL_NEWS_REQUEST });
    try {
      const token = localStorage.getItem("adminToken");
      const result = await axios.get(
        `${process.env.REACT_APP_ROOT}/v1/news?page=${page}&limit=20`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "", //the token is a variable which holds the token
          },
        }
      );
      const { data } = result;
      dispatch({
        type: newsConstant.GET_ALL_NEWS_SUCCESS,
        payload: {
          results: data.results,
          totalPages: data.totalPages,
          totalResults: data.totalResults,
        },
      });
    } catch (error) {
      dispatch({
        type: newsConstant.GET_ALL_NEWS_FAILURE,
        payload: { err: error.response.data.message },
      });
    }
  };
};

export const CreateNews = (body) => {
  return async (dispatch) => {
    dispatch({ type: newsConstant.CREATE_NEWS_REQUEST });
    try {
      const token = localStorage.getItem("adminToken");
      await axios.post(`${process.env.REACT_APP_ROOT}/v1/news`, body, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "", //the token is a variable which holds the token
        },
      });
      dispatch(GetAllNews(1));
      dispatch({
        type: newsConstant.CREATE_NEWS_SUCCESS,
        payload: "Created Successfully!",
      });
    } catch (error) {
      dispatch({
        type: newsConstant.CREATE_NEWS_FAILURE,
        payload: { err: error.response.data.message },
      });
    }
  };
};

export const GetNewsById = (id) => {
  return async (dispatch) => {
    dispatch({ type: newsConstant.GET_NEWS_BY_ID_REQUEST });
    try {
      const token = localStorage.getItem("adminToken");
      const result = await axios.get(
        `${process.env.REACT_APP_ROOT}/v1/news/${id}`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "", //the token is a variable which holds the token
          },
        }
      );
      const { data } = result;
      dispatch({
        type: newsConstant.GET_NEWS_BY_ID_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: newsConstant.GET_NEWS_BY_ID_FAILURE,
        payload: { err: error.response.data.message },
      });
    }
  };
};

export const UpdateNews = (id, body) => {
  return async (dispatch) => {
    dispatch({ type: newsConstant.UPDATE_NEWS_REQUEST });
    try {
      const token = localStorage.getItem("adminToken");
      await axios.patch(`${process.env.REACT_APP_ROOT}/v1/news/${id}`, body, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "", //the token is a variable which holds the token
        },
      });
      dispatch(GetAllNews(1));
      dispatch({
        type: newsConstant.UPDATE_NEWS_SUCCESS,
        payload: "Updated Successfully!",
      });
    } catch (error) {
      dispatch({
        type: newsConstant.UPDATE_NEWS_FAILURE,
        payload: { err: error.response.data.message },
      });
    }
  };
};

export const DeleteNEWS = (id) => {
  return async (dispatch) => {
    dispatch({ type: newsConstant.DELETE_NEWS_REQUEST });
    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(`${process.env.REACT_APP_ROOT}/v1/news/${id}`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "", //the token is a variable which holds the token
        },
      });
      dispatch(GetAllNews(1));
      dispatch({
        type: newsConstant.DELETE_NEWS_SUCCESS,
        payload: "Deleted Successfully!",
      });
    } catch (error) {
      dispatch({
        type: newsConstant.DELETE_NEWS_FAILURE,
        payload: { err: error.response.data.message },
      });
    }
  };
};
