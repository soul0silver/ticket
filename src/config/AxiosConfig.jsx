import axios from "axios";
import { getAuth } from "firebase/auth";
import 'firebase/auth';
import app from "../components/Firebase/firebase.config";

const instance = axios.create({
  baseURL: "http://localhost:8000",
});
instance.interceptors.request.use(
  function (config) {
    if (JSON.parse(localStorage.getItem("isSystemAcc"))) {
      let token = JSON.parse(localStorage.getItem("token")).token;
      config.headers = { 
        authorization: `Bearer ${token}` ,
        isSystemAcc: true
      };
    } else {
      getAuth(app).currentUser?.getIdToken(false)
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
