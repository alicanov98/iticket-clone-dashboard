import { createContext, useEffect, useState } from "react";

//? Axios
import axios from "axios";

//? Create context
export const Context = createContext();

//? Create context component
export const MainContext = ({ children }) => {
  //? States
  const [user, setUser] = useState({});
  const [userIn, setUserIn] = useState(false);

  //? Check user login
  useEffect(() => {
    const checkLogin = async () => {
      const token = await JSON.parse(localStorage.getItem("token"));
      if (token !== null) {
        await axios
          .post(process.env.REACT_APP_CHECK_LOGIN, { token })
          .then((res) => {
            setUser(res.data);
            setUserIn(true);
          })
          .catch((err) => {
            console.log(err);
            setUserIn(false);
          });
      }
    };
    checkLogin();
  }, [setUser, setUserIn]);

  const globalStates = {
    user,
    setUser,
    userIn,
    setUserIn,
  };

  return <Context.Provider value={globalStates}>{children}</Context.Provider>;
};
