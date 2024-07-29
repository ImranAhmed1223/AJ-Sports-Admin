import { boxingPlayerConstant } from "store/constants";
import axios from "axios";

export const GetAllBoxingPlayer = (page) => {
  return async (dispatch) => {
    dispatch({ type: boxingPlayerConstant.GET_ALL_boxingPlayer_REQUEST });
    try {
      const token = localStorage.getItem("adminToken");
      const result = await axios.get(
        `${process.env.REACT_APP_ROOT}/v1/boxing/player?page=${page}&limit=20`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "", //the token is a variable which holds the token
          },
        }
      );
      const { data } = result;
      dispatch({
        type: boxingPlayerConstant.GET_ALL_boxingPlayer_SUCCESS,
        payload: {
          results: data.results,
          totalPages: data.totalPages,
          totalResults: data.totalResults,
        },
      });
    } catch (error) {
      dispatch({
        type: boxingPlayerConstant.GET_ALL_boxingPlayer_FAILURE,
        payload: { err: error.response.data.message },
      });
    }
  };
};

export const CreateBoxingPlayer = (body) => {
  return async (dispatch) => {
    dispatch({ type: boxingPlayerConstant.CREATE_boxingPlayer_REQUEST });
    try {
      const token = localStorage.getItem("adminToken");
      await axios.post(`${process.env.REACT_APP_ROOT}/v1/boxing/player`, body, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "", //the token is a variable which holds the token
        },
      });
      dispatch(GetAllBoxingPlayer(1));
      dispatch({
        type: boxingPlayerConstant.CREATE_boxingPlayer_SUCCESS,
        payload: "Created Successfully!",
      });
    } catch (error) {
      dispatch({
        type: boxingPlayerConstant.CREATE_boxingPlayer_FAILURE,
        payload: { err: error.response.data.message },
      });
    }
  };
};

export const CreateBoxingFixture = (body) => {
  return async (dispatch) => {
    dispatch({ type: boxingPlayerConstant.CREATE_boxingFixture_REQUEST });
    try {
      const token = localStorage.getItem("adminToken");
      await axios.post(
        `${process.env.REACT_APP_ROOT}/v1/boxing/fixture`,
        body,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "", //the token is a variable which holds the token
          },
        }
      );
      dispatch(GetAllBoxingPlayer(1));
      dispatch({
        type: boxingPlayerConstant.CREATE_boxingFixture_SUCCESS,
        payload: "Created Successfully!",
      });
    } catch (error) {
      dispatch({
        type: boxingPlayerConstant.CREATE_boxingFixture_FAILURE,
        payload: { err: error.response.data.message },
      });
    }
  };
};

export const GetBoxingPlayerById = (id) => {
  return async (dispatch) => {
    dispatch({ type: boxingPlayerConstant.GET_boxingPlayer_BY_ID_REQUEST });
    try {
      const token = localStorage.getItem("adminToken");
      const result = await axios.get(
        `${process.env.REACT_APP_ROOT}/v1/boxing/player/${id}`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "", //the token is a variable which holds the token
          },
        }
      );
      const { data } = result;
      dispatch({
        type: boxingPlayerConstant.GET_boxingPlayer_BY_ID_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: boxingPlayerConstant.GET_boxingPlayer_BY_ID_FAILURE,
        payload: { err: error.response.data.message },
      });
    }
  };
};

export const UpdateBoxingPlayer = (id, body) => {
  return async (dispatch) => {
    dispatch({ type: boxingPlayerConstant.UPDATE_boxingPlayer_REQUEST });
    try {
      const token = localStorage.getItem("adminToken");
      await axios.patch(
        `${process.env.REACT_APP_ROOT}/v1/boxing/player/${id}`,
        body,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "", //the token is a variable which holds the token
          },
        }
      );
      dispatch(GetAllBoxingPlayer(1));
      dispatch({
        type: boxingPlayerConstant.UPDATE_boxingPlayer_SUCCESS,
        payload: "Updated Successfully!",
      });
    } catch (error) {
      dispatch({
        type: boxingPlayerConstant.UPDATE_boxingPlayer_FAILURE,
        payload: { err: error.response.data.message },
      });
    }
  };
};

export const DeleteboxingPlayer = (id) => {
  return async (dispatch) => {
    dispatch({ type: boxingPlayerConstant.DELETE_boxingPlayer_REQUEST });
    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(
        `${process.env.REACT_APP_ROOT}/v1/boxing/player/${id}`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "", //the token is a variable which holds the token
          },
        }
      );
      dispatch(GetAllBoxingPlayer(1));
      dispatch({
        type: boxingPlayerConstant.DELETE_boxingPlayer_SUCCESS,
        payload: "Deleted Successfully!",
      });
    } catch (error) {
      dispatch({
        type: boxingPlayerConstant.DELETE_boxingPlayer_FAILURE,
        payload: { err: error.response.data.message },
      });
    }
  };
};
