import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { Context } from "../utils/MainContext";

const ProtectedRouter = () => {
  const {userIn}=useContext(Context)
 
  return userIn ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRouter;
