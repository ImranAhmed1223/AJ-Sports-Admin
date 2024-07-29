import { nflTeamConstant } from "store/constants";
import axios from "axios";

export const GetAllNflTeam = (page) => {
  return async (dispatch) => {
    dispatch({ type: nflTeamConstant.GET_ALL_nflTeam_REQUEST });
    try {
      const token = localStorage.getItem("adminToken");
      const result = await axios.get(
        `${process.env.REACT_APP_ROOT}/v1/nfl/team?page=${page}&limit=20`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "", //the token is a variable which holds the token
          },
        }
      );
      const { data } = result;
      dispatch({
        type: nflTeamConstant.GET_ALL_nflTeam_SUCCESS,
        payload: {
          results: data.results,
          totalPages: data.totalPages,
          totalResults: data.totalResults,
        },
      });
    } catch (error) {
      dispatch({
        type: nflTeamConstant.GET_ALL_nflTeam_FAILURE,
        payload: { err: error.response.data.message },
      });
    }
  };
};

export const CreateNflTeam = (body) => {
  return async (dispatch) => {
    dispatch({ type: nflTeamConstant.CREATE_nflTeam_REQUEST });
    try {
      const token = localStorage.getItem("adminToken");
      await axios.post(`${process.env.REACT_APP_ROOT}/v1/nfl/team`, body, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "", //the token is a variable which holds the token
        },
      });
      dispatch(GetAllNflTeam(1));
      dispatch({
        type: nflTeamConstant.CREATE_nflTeam_SUCCESS,
        payload: "Created Successfully!",
      });
    } catch (error) {
      dispatch({
        type: nflTeamConstant.CREATE_nflTeam_FAILURE,
        payload: { err: error.response.data.message },
      });
    }
  };
};

export const CreateNflFixture = (body) => {
  return async (dispatch) => {
    dispatch({ type: nflTeamConstant.CREATE_nflFixture_REQUEST });
    try {
      const token = localStorage.getItem("adminToken");
      await axios.post(`${process.env.REACT_APP_ROOT}/v1/nfl`, body, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "", //the token is a variable which holds the token
        },
      });
      dispatch(GetAllNflTeam(1));
      dispatch({
        type: nflTeamConstant.CREATE_nflFixture_SUCCESS,
        payload: "Created Successfully!",
      });
    } catch (error) {
      dispatch({
        type: nflTeamConstant.CREATE_nflFixture_FAILURE,
        payload: { err: error.response.data.message },
      });
    }
  };
};
export const GetNflTeamById = (id) => {
  return async (dispatch) => {
    dispatch({ type: nflTeamConstant.GET_nflTeam_BY_ID_REQUEST });
    try {
      const token = localStorage.getItem("adminToken");
      const result = await axios.get(
        `${process.env.REACT_APP_ROOT}/v1/nfl/team/${id}`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "", //the token is a variable which holds the token
          },
        }
      );
      const { data } = result;
      dispatch({
        type: nflTeamConstant.GET_nflTeam_BY_ID_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: nflTeamConstant.GET_nflTeam_BY_ID_FAILURE,
        payload: { err: error.response.data.message },
      });
    }
  };
};

export const UpdateNflTeam = (id, body) => {
  return async (dispatch) => {
    dispatch({ type: nflTeamConstant.UPDATE_nflTeam_REQUEST });
    try {
      const token = localStorage.getItem("adminToken");
      await axios.patch(
        `${process.env.REACT_APP_ROOT}/v1/nfl/team/${id}`,
        body,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "", //the token is a variable which holds the token
          },
        }
      );
      dispatch(GetAllNflTeam(1));
      dispatch({
        type: nflTeamConstant.UPDATE_nflTeam_SUCCESS,
        payload: "Updated Successfully!",
      });
    } catch (error) {
      dispatch({
        type: nflTeamConstant.UPDATE_nflTeam_FAILURE,
        payload: { err: error.response.data.message },
      });
    }
  };
};

export const DeleteNflTeam = (id) => {
  return async (dispatch) => {
    dispatch({ type: nflTeamConstant.DELETE_nflTeam_REQUEST });
    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(`${process.env.REACT_APP_ROOT}/v1/nfl/team/${id}`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "", //the token is a variable which holds the token
        },
      });
      dispatch(GetAllNflTeam(1));
      dispatch({
        type: nflTeamConstant.DELETE_nflTeam_SUCCESS,
        payload: "Deleted Successfully!",
      });
    } catch (error) {
      dispatch({
        type: nflTeamConstant.DELETE_nflTeam_FAILURE,
        payload: { err: error.response.data.message },
      });
    }
  };
};
