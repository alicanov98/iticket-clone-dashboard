import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const Context = createContext();

export const MainContext = ({ children }) => {
  const [user, setUser] = useState({});
  const [userIn, setUserIn] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      const token = await JSON.parse(localStorage.getItem("token"));
      if(token!==null){
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
