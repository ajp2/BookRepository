import axios from "axios";
import jwt_decode from "jwt-decode";

// export const signup = user => dispatch =>
//   APIutil.signup(user)
//     .then(() => dispatch(receiveUserSignIn()))
//     .catch(err => dispatch(receiveErrors(err.response.data)));

export const test = () =>
  axios.get("/api/books").then(res => console.log(res.data));

export const auth = (session, username, password) =>
  axios.post(`/api/identity/${session}`, { username, password }).then(res => {
    console.log(res.data);
    const token = res.data.token;
    localStorage.setItem("jwtToken", token);
    setAuthToken(token);
    const decoded = jwt_decode(token);
    console.log(decoded);
    console.log(axios.defaults.headers.common);
  });

export const login = token => {
  localStorage.setItem("jwtToken", token);
  setAuthToken(token);
  const decoded = jwt_decode(token);
};

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