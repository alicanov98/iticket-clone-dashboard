import { useContext, useEffect } from "react";

//? React hook form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

//? Yup
import { object, string } from "yup";

//? Axios
import axios from "axios";

//? Router
import { useNavigate } from "react-router-dom";

//? Context
import { Context } from "../utils/MainContext";

const Login = () => {
  //? Router
  const navigate = useNavigate();

  //? Context
  const { userIn } = useContext(Context);

  //? Check user already login
  useEffect(() => {
    const checkUser = () => {
      if (userIn) {
        navigate("/");
      }
    };
    checkUser();
  }, [navigate, userIn]);

  //? Yup schema
  const loginSchema = object({
    email: string().trim().required(),
    password: string().trim().required(),
  });

  //? React hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  //? Login
  const onSubmit = async (data) => {
    await axios
      .post(process.env.REACT_APP_LOGIN, data)
      .then((res) => {
        localStorage.setItem("token", JSON.stringify(res.data.token));
        navigate("/");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section className="login">
      <div className="container">
        <div className="row">
          <h2>Login Page</h2>
          <div className="login-box">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="user-box">
                <input type="email" name="email" {...register("email")} />
                <label>Email</label>
              </div>
              {errors.email && <span>{errors.email.message}</span>}
              <div className="user-box">
                <input
                  type="password"
                  name="password"
                  {...register("password")}
                />
                <label>Password</label>
              </div>
              {errors.password && <span>{errors.password.message}</span>}
              <div>
                <button>
                  Login
                  <span></span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
