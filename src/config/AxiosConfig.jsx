import axios from "axios";
import firebase from "firebase/compat/app";
const instance = axios.create({
  baseURL: "http://localhost:8000",
});
instance.interceptors.request.use(
  function (config) {
    if (JSON.parse(localStorage.getItem("isSystemAcc"))) {
      let token = JSON.parse(localStorage.getItem("token")).token;
      config.headers = { authorization: `Bearer ${token}` };
    } else {
      firebase
        .auth()
        .currentUser.getIdToken(false)
        .then((token) => {
          config.headers = { authorization: `Bearer ${token}` };
        });
    }
    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);
export { instance };
