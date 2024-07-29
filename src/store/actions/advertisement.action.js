import { advConstant } from "store/constants";
import axios from "axios";

export const GetAllAdv = () => {
  return async (dispatch) => {
    dispatch({ type: advConstant.GET_ALL_ADV_REQUEST });
    try {
      const token = localStorage.getItem("adminToken");
      const result = await axios.get(
        `${process.env.REACT_APP_ROOT}/v1/advertisment`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "", //the token is a variable which holds the token
          },
        }
      );
      const { data } = result;
      dispatch({
        type: advConstant.GET_ALL_ADV_SUCCESS,
        payload: { results: data.results, totalPages: data.totalPages },
      });
    } catch (error) {
      dispatch({
        type: advConstant.GET_ALL_ADV_FAILURE,
        payload: { err: error.response.data.message },
      });
    }
  };
};

export const CreateAdv = (body) => {
  return async (dispatch) => {
    dispatch({ type: advConstant.CREATE_ADV_REQUEST });
    try {
      const token = localStorage.getItem("adminToken");
      await axios.post(`${process.env.REACT_APP_ROOT}/v1/advertisment`, body, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "", //the token is a variable which holds the token
        },
      });
      dispatch(GetAllAdv());
      dispatch({
        type: advConstant.CREATE_ADV_SUCCESS,
        payload: "Created Successfully!",
      });
    } catch (error) {
      dispatch({
        type: advConstant.CREATE_ADV_FAILURE,
        payload: { err: error.response.data.message },
      });
    }
  };
};

export const GetAdvById = (id) => {
  return async (dispatch) => {
    dispatch({ type: advConstant.GET_ADV_BY_ID_REQUEST });
    try {
      const token = localStorage.getItem("adminToken");
      const result = await axios.get(
        `${process.env.REACT_APP_ROOT}/v1/advertisment/${id}`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "", //the token is a variable which holds the token
          },
        }
      );
      const { data } = result;
      dispatch({
        type: advConstant.GET_ADV_BY_ID_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: advConstant.GET_ADV_BY_ID_FAILURE,
        payload: { err: error.response.data.message },
      });
    }
  };
};

export const UpdateAdv = (id, body) => {
  return async (dispatch) => {
    dispatch({ type: advConstant.UPDATE_ADV_REQUEST });
    try {
      const token = localStorage.getItem("adminToken");
      await axios.patch(
        `${process.env.REACT_APP_ROOT}/v1/advertisment/${id}`,
        body,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "", //the token is a variable which holds the token
          },
        }
      );
      dispatch(GetAllAdv());
      dispatch({
        type: advConstant.UPDATE_ADV_SUCCESS,
        payload: "Updated Successfully!",
      });
    } catch (error) {
      dispatch({
        type: advConstant.UPDATE_ADV_FAILURE,
        payload: { err: error.response.data.message },
      });
    }
  };
};

export const DeleteAdv = (id) => {
  return async (dispatch) => {
    dispatch({ type: advConstant.DELETE_ADV_REQUEST });
    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(
        `${process.env.REACT_APP_ROOT}/v1/advertisment/${id}`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "", //the token is a variable which holds the token
          },
        }
      );
      dispatch(GetAllAdv());
      dispatch({
        type: advConstant.DELETE_ADV_SUCCESS,
        payload: "Deleted Successfully!",
      });
    } catch (error) {
      dispatch({
        type: advConstant.DELETE_ADV_FAILURE,
        payload: { err: error.response.data.message },
      });
    }
  };
};
