import { useState } from "react";

//? Axios
import axios from "axios";

//? React hook form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

//? Router
import { useNavigate } from "react-router-dom";

//? Yup
import * as yup from "yup";

const ResetPassword = () => {
  //? Router
  const navigate = useNavigate();

  //? Local states
  const [step, setStep] = useState("email");

  //? Yup schema
  const defaultValues = {
    email: "",
    otp: "",
    password: "",
    rePassword: "",
  };
  const generalSchema = yup.object({
    email: yup.string().trim().email().required(),
    otp: yup.string().trim().required(),
    password: yup.string().trim().required(),
    rePassword: yup
      .string()
      .trim()
      .oneOf([yup.ref("password"), null], "Passwords do not match")
      .required("Password confirmation is required"),
  });
  const emailSchema = generalSchema.pick(["email"]);
  const otpSchema = generalSchema.pick(["otp"]);
  const resetSchema = generalSchema.pick(["password", "rePassword"]);

  //? React hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(
      step === "email" ? emailSchema : step === "otp" ? otpSchema : resetSchema
    ),
  });

  //? Reset password
  const onSubmit = async (data) => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (step === "email") {
      await axios
        .post(process.env.REACT_APP_RESET_PASSWORD, {
          token,
          email: data.email,
        })
        .then((res) => {
          setStep("otp");
        })
        .catch((err) => {
          console.log(err);
          setStep("email");
        });
    } else if (step === "otp") {
      await axios
        .post(process.env.REACT_APP_VERIFY_OTP, {
          token,
          otp: data.otp,
        })
        .then((res) => {
          setStep("reset");
        })
        .catch((err) => {
          setStep("otp");
        });
    } else {
      await axios
        .post(process.env.REACT_APP_RESET_PASSWORD, {
          token,
          password: data.password,
        })
        .then((res) => {
          setStep("email");
          navigate("/login");
          window.location.reload();
        })
        .catch((err) => {
          setStep("reset");
        });
    }
  };

  return (
    <section className="resetPassword">
      <div className="container">
        <div className="row">
          <h2 className="title">Reset password page</h2>
          {step === "email" ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                {...register("email")}
                type="email"
                placeholder="Write email..."
                name="email"
              />
              {errors.email && <span>{errors.email.message}</span>}
              <button className="btn">Send request</button>
            </form>
          ) : step === "otp" ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                type="text"
                placeholder="Write otp code..."
                name="otp"
                {...register("otp")}
              />
              {errors.otp && <span>{errors.otp.message}</span>}
              <button className="btn">Send otp</button>
            </form>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                type="password"
                placeholder="Write new password..."
                name="password"
                {...register("password")}
              />
              {errors.password && <span>{errors.password.message}</span>}
              <input
                type="password"
                placeholder="Write again..."
                name="rePassword"
                {...register("rePassword")}
              />
              {errors.rePassword && <span>{errors.rePassword.message}</span>}
              <button className="btn">Change password</button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
