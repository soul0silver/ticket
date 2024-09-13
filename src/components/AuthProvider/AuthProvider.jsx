import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import app from "../Firebase/firebase.config";
import { getFirestore } from "firebase/firestore";
import { instance } from "../../config/AxiosConfig";

const auth = getAuth(app);

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

const db = getFirestore(app);

// console.log(db);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authen, setAuth] = useState();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = async (email, password) => {
    setLoading(true);
    return await instance.post("api/sv1/auth/login", {
      email: email,
      password: password,
    });
  };

  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("user auth state check", currentUser);
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unSubscribe();
    };
  });

  useEffect(()=>{
    if (authen === null || authen === undefined)
    setAuth(JSON.parse(localStorage.getItem('user')))
  },[location.href])

  const authInfo = {
    db,
    user,
    setUser,
    createUser,
    googleLogin,
    signIn,
    logOut,
    loading,
    authen,
    auth,
    setAuth,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
