import { useContext } from "react";

//? Router
import { Outlet, Navigate } from "react-router-dom";

//? Context
import { Context } from "../utils/MainContext";

const ProtectedRouter = () => {
  //? Context
  const { userIn } = useContext(Context);

  return userIn ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRouter;
