import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useLoginMutation } from "../../Redux/features/auth/authApi";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { storeUserInfo } from "../../Services/Action/auth.services";

const LoginPage = () => {
  const [loginMutation] = useLoginMutation();
  const navigate = useNavigate();

  const [passwordVisible, setPasswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userData = {
      email: data?.email,
      password: data?.password,
    };
    try {
      const data = await loginMutation(userData).unwrap();
      if (data && data.success === true) {
        toast.success(data?.message);

        storeUserInfo({ accessToken: data?.data?.accessToken });
        navigate("/");
        setTimeout(() => {
          window.location.reload();
        }, 700);
      }
    } catch (error) {
      toast.error(error?.data.message);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div>
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div>
                <h1 className="text-2xl font-semibold">Login </h1>
              </div>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="divide-y divide-gray-200"
              >
                <div className="py-8 text-base leading-6 space-y-4 sm:text-lg sm:leading-7">
                  <div className="relative">
                    <input
                      id="email"
                      name="email"
                      type="text"
                      autoComplete="off"
                      className="peer text-white text-sm h-10 w-full border-b-2 border-gray-300 focus:outline-none focus:border-sky-500 px-3"
                      placeholder="Email address"
                      {...register("email", { required: "Email is required" })}
                    />
                    {errors.email && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={passwordVisible ? "text" : "password"}
                      className="peer text-sm h-10 w-[270px] border-b-2 border-gray-300 focus:outline-none focus:border-sky-500 px-3"
                      placeholder="Password"
                      {...register("password", {
                        required: "Password is required",
                      })}
                    />
                    <div
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                      onClick={togglePasswordVisibility}
                    >
                      {passwordVisible ? (
                        <FaEyeSlash
                          size={18}
                          className="text-gray-500 cursor-pointer"
                        />
                      ) : (
                        <FaEye
                          size={18}
                          className="text-gray-500 cursor-pointer"
                        />
                      )}
                    </div>
                    {errors.password && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                  <div className="relative">
                    <button
                      type="submit"
                      className="bg-cyan-500 text-white rounded-md px-6 py-1"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
