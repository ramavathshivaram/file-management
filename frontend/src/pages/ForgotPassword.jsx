import React from "react";
import { login } from "../utils/api";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const response = await login(data);
    console.log(response);
    let token = response.token;
    localStorage.setItem("token", token);
    navigate("/");
  };
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 border p-4 rounded-xl min-w-[350px]"
      >
        <h1 className="underline text-2xl text-center uppercase">login</h1>

        <div className="relative flex flex-col">
          <input
            type="email"
            placeholder=" "
            className="border outline-none p-2 peer rounded-md"
            {...register("email", {
              required: "Email is required",
            })}
          />
          <label
            className="absolute left-3 -top-[7px] transition-all duration-200 text-xs
                 peer-placeholder-shown:text-lg  peer-placeholder-shown:top-2 peer-focus:-top-[7px]  peer-focus:left-3 peer-focus:text-xs bg-white px-1"
          >
            Email
          </label>
          {errors.email && (
            <span className="text-red-600 text-sm mt-1">
              {errors.email.message}
            </span>
          )}
        </div>
        <div className="relative flex flex-col">
          <input
            type="password"
            placeholder=" "
            className="border outline-none p-2 peer rounded-md"
            {...register("password", {
              required: "Password is required",
            })}
          />
          <label
            className="absolute left-3 -top-[7px] transition-all duration-200 text-xs
                 peer-placeholder-shown:text-lg  peer-placeholder-shown:top-2 peer-focus:-top-[7px]  peer-focus:left-3 peer-focus:text-xs bg-white px-1"
          >
            Password
          </label>
          {errors.password && (
            <span className="text-red-600 text-sm mt-1">
              {errors.password.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn disabled:opacity-50"
        >
          {isSubmitting ? "Logining..." : "Login"}
        </button>

        <p className="text-sm text-center">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-600 cursor-pointer"
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
};

export default ForgotPassword;
