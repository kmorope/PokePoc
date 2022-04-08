import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { setLocale } from "yup";
import { useAuth } from "context/AuthContext";
import { LoginParams } from "global/types/item.types";
import { DecoratedInput } from "components/shared";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

setLocale({
  mixed: {
    required: "This field is required",
  },
  string: {
    email: "Invalid email address",
  },
});

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const Login = () => {
  const { login, isAuthenticated } = useAuth();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginParams>({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const onSubmit = (data: LoginParams) => {
    login(data);
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="bg-no-repeat bg-cover bg-center relative">
      <div className="absolute bg-gradient-to-b opacity-75 inset-0 z-0"></div>
      <div className="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
        <div className="flex-col flex  self-center p-10 sm:max-w-5xl xl:max-w-2xl  z-10">
          <div className="self-start hidden lg:flex flex-col  text-white">
            <h1 className="mb-3 font-bold text-5xl">Welcome to PokePoc</h1>
            <p className="pr-3">
              Pokem Ipsum is the lorem ipsum generator Pikachu would use if
              Pikachu wrote code.
            </p>
          </div>
        </div>
        <div className="flex justify-center self-center  z-10">
          <div className="p-12 bg-white mx-auto rounded-2xl w-100 ">
            <div className="mb-4">
              <h3 className="font-semibold text-2xl text-gray-800">Sign In </h3>
              <p className="text-gray-500">Please sign in to your account.</p>
            </div>
            <form
              className="space-y-5"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
            >
              <div className="space-y-2">
                <DecoratedInput
                  name="email"
                  label="Email"
                  type="email"
                  placeholder="user@mail.com"
                  error={{
                    hasError: errors.email ? true : false,
                    message: errors.email ? errors.email.message : "",
                  }}
                  required
                  register={register}
                />
              </div>
              <div className="space-y-2">
                <DecoratedInput
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                  error={{
                    hasError: errors.password ? true : false,
                    message: errors.password ? errors.password.message : "",
                  }}
                  required
                  register={register}
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center btn btn-primary"
                >
                  Sign in
                </button>
              </div>
            </form>
            <div className="pt-5 text-center text-gray-400 text-xs select-none">
              <span>
                Made with <span className="text-red-500">❤</span> by{" "}
                <a href="https://github.com/kmorope"> Camilo Romero</a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
