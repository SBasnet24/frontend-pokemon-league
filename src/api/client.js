import axios from "axios";
import { API_URL } from "../constants/common";
import { getAccessToken } from "../helpers/accessToken";

const get = (url, params = {}, includeToken = true) => {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "",
  };

  const requestParams = {
    ...params,
    accessToken: "",
  };

  if (includeToken) {
    const token = getAccessToken();
    headers.Authorization = `Bearer ${token}`;
    requestParams.accessToken = token;
  }

  const fullUrl = `${API_URL}/${url}`;

  return axios
    .get(fullUrl, {
      headers,
      params: requestParams,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error && error.response && error.response.data) {
        throw error.response.data.message;
      }
      throw error.message;
    });
};

const post = (url, body = {}, includeToken = true, headers = {}) => {
  if (includeToken) {
    const token = getAccessToken();
    headers.Authorization = `Bearer ${token}`;
  }

  const fullUrl = `${API_URL}/${url}`;
  return axios
    .post(fullUrl, body, {
      headers,
    })
    .then((response) => response.data)
    .catch((error) => {
      if (error && error.response && error.response.data) {
        throw error.response.data.message || error.response.data.errors;
      }
      throw error.message;
    });
};

export { get, post };
