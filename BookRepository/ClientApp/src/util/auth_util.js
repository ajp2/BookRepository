import axios from "axios";
import jwt_decode from "jwt-decode";

export const auth = (session, username, password) =>
  axios.post(`/api/identity/${session}`, { username, password }).then(res => {
    const token = res.data.token;
    localStorage.setItem("jwtToken", token);
    setAuthToken(token);
    return jwt_decode(token);
  });

export const logout = () => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
};

export const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};
