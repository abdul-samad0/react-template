import axios from "axios";
import Cookies from "js-cookie";
import { getUserCookies,clearUserCookies } from "../utils/Cookies";
import { Navigate } from "react-router-dom";



const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || "",
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { status, config } = error.response;
    
    // Check if the request is for the login route
    const isLoginRoute = config.url.includes("/account/auth/");

    if ((status === 401 || status === 503) && !isLoginRoute) {
      clearUserCookies();
      window.location.href = "/login";
      // <Navigate to="/login" replace /> // Redirect to login
    }

    return Promise.reject(error);
  }
);

api.interceptors.request.use((config) => {
  if (Cookies.get("token")) {
    config.headers["Authorization"] = `Bearer ${Cookies.get("token")}`;
  }

  config.headers['Accept'] = 'application/json';
  return config;
});


export {api};