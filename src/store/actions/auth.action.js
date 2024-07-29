import { authConstant } from "store/constants";
import axios from "axios";

export const AdminLogin = (body) => {
  return async (dispatch) => {
    dispatch({ type: authConstant.ADMIN_LOGIN_REQUEST });
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_ROOT}/v1/admin/login`,
        body
      );
      const { data } = result;
      dispatch({
        type: authConstant.ADMIN_LOGIN_SUCCESS,
        payload: "Login Successfully!",
      });
      localStorage.setItem("adminToken", data.tokens.access.token);
    } catch (error) {
      dispatch({
        type: authConstant.ADMIN_LOGIN_FAILURE,
        payload: { err: error.response.data.message },
      });
    }
  };
};

export const AdminRegister = (body) => {
  return async (dispatch) => {
    dispatch({ type: authConstant.ADMIN_REGISTER_REQUEST });
    try {
      const token = localStorage.getItem("adminToken");
      await axios.post(`${process.env.REACT_APP_ROOT}/v1/admin`, body, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "", //the token is a variable which holds the token
        },
      });

      dispatch({
        type: authConstant.ADMIN_REGISTER_SUCCESS,
        payload: "New Admin Created Successfully!",
      });
    } catch (error) {
      dispatch({
        type: authConstant.ADMIN_REGISTER_FAILURE,
        payload: { err: error.response.data.message },
      });
    }
  };
};

export const BasekitBallFixture = (page) => {
  return async (dispatch) => {
    dispatch({ type: authConstant.BASEKITBALL_FIXTURE_REQUEST });
    try {
      const token = localStorage.getItem("adminToken");
      const result = await axios.get(
        `${process.env.REACT_APP_ROOT}/v1/basketball/fixture/all/fetch?page=${page}&limit=20`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "", //the token is a variable which holds the token
          },
        }
      );
      const { data } = result;
      dispatch({
        type: authConstant.BASEKITBALL_FIXTURE_SUCCESS,
        payload: {
          results: data.results,
          totalPages: data.totalPages,
          totalResultsBasekitball: data.totalResults,
        },
      });
    } catch (error) {
      dispatch({
        type: authConstant.BASEKITBALL_FIXTURE_FAILURE,
        payload: { err: error.response.data.message },
      });
    }
  };
};

export const UpdateBasekitBallFixture = (id, body) => {
  return async (dispatch) => {
    dispatch({ type: authConstant.UPDATE_BASEKITBALL_FIXTURE_REQUEST });
    try {
      const token = localStorage.getItem("adminToken");
      await axios.patch(
        `${process.env.REACT_APP_ROOT}/v1/basketball/fixture/update/${id}`,
        body,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "", //the token is a variable which holds the token
          },
        }
      );
      dispatch(BasekitBallFixture());
      dispatch({
        type: authConstant.UPDATE_BASEKITBALL_FIXTURE_SUCCESS,
        payload: "Updated Successfully!",
      });
    } catch (error) {
      dispatch({
        type: authConstant.UPDATE_BASEKITBALL_FIXTURE_FAILURE,
        payload: { err: error.response.data.message },
      });
    }
  };
};

export const FootBallFixture = (page) => {
  return async (dispatch) => {
    dispatch({ type: authConstant.FOOTBALL_FIXTURE_REQUEST });
    try {
      const token = localStorage.getItem("adminToken");
      const result = await axios.get(
        `${process.env.REACT_APP_ROOT}/v1/football/fixture/all/fetch?page=${page}&limit=20`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "", //the token is a variable which holds the token
          },
        }
      );
      const { data } = result;
      dispatch({
        type: authConstant.FOOTBALL_FIXTURE_SUCCESS,
        payload: {
          results: data.results,
          totalPages: data.totalPages,
          totalResultsFootball: data.totalResults,
        },
      });
    } catch (error) {
      dispatch({
        type: authConstant.FOOTBALL_FIXTURE_FAILURE,
        payload: { err: error.response.data.message },
      });
    }
  };
};

export const GetFootBallFeatureById = (id) => {
  return async (dispatch) => {
    dispatch({ type: authConstant.GET_FOOTBALL_FIXTURE_BY_ID_REQUEST });
    try {
      const token = localStorage.getItem("adminToken");
      const result = await axios.get(
        `${process.env.REACT_APP_ROOT}/v1/football/fixture/single?id=${id}`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "", //the token is a variable which holds the token
          },
        }
      );
      const { data } = result;
      dispatch({
        type: authConstant.GET_FOOTBALL_FIXTURE_BY_ID_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: authConstant.GET_FOOTBALL_FIXTURE_BY_ID_FAILURE,
        payload: { err: error.response.data.message },
      });
    }
  };
};

export const GetBasketBallFeatureById = (id) => {
  return async (dispatch) => {
    dispatch({ type: authConstant.GET_BASEKITBALL_FIXTURE_BY_ID_REQUEST });
    try {
      const token = localStorage.getItem("adminToken");
      const result = await axios.get(
        `${process.env.REACT_APP_ROOT}/v1/basketball/fixture/single?id=${id}`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "", //the token is a variable which holds the token
          },
        }
      );
      const { data } = result;
      dispatch({
        type: authConstant.GET_BASEKITBALL_FIXTURE_BY_ID_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: authConstant.GET_BASEKITBALL_FIXTURE_BY_ID_FAILURE,
        payload: { err: error.response.data.message },
      });
    }
  };
};
export const UpdateFootBallFixture = (id, body) => {
  return async (dispatch) => {
    dispatch({ type: authConstant.UPDATE_FOOTBALL_FIXTURE_REQUEST });
    try {
      const token = localStorage.getItem("adminToken");
      await axios.patch(
        `${process.env.REACT_APP_ROOT}/v1/football/fixture/update/${id}`,
        body,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "", //the token is a variable which holds the token
          },
        }
      );
      dispatch(FootBallFixture(1));
      dispatch({
        type: authConstant.UPDATE_FOOTBALL_FIXTURE_SUCCESS,
        payload: "Updated Successfully!",
      });
    } catch (error) {
      dispatch({
        type: authConstant.UPDATE_FOOTBALL_FIXTURE_FAILURE,
        payload: { err: error.response.data.message },
      });
    }
  };
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: authConstant.CLEAR_ERRORS });
};

// Clearing Messages
export const clearMessages = () => async (dispatch) => {
  dispatch({ type: authConstant.CLEAR_MESSAGES });
};
