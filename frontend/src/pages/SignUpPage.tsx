import { User, EyeOff, Eye, Lock, Mail, Loader2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

function SignUpPage() {
  const schema = z.object({
    fullname: z
      .string()
      .min(5, { message: "FullName must contain at least 5 characters" })
      .max(50),
    email: z.string().email(),
    username: z
      .string()
      .min(5, { message: "Username must contain at least 5 characters" })
      .max(50),
    password: z
      .string()
      .min(6, { message: "Password must contain at least 6 characters" })
      .max(50),
  });

  type formData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>({ resolver: zodResolver(schema) });

  const { isSigningUp, signup } = useAuthStore();

  const validateSignUp = (errors: any) => {
    if (errors.fullname) toast.error(errors.fullname?.message!);
    if (errors.email) toast.error(errors.email?.message!);
    if (errors.username) toast.error(errors.username?.message!);
    if (errors.password) toast.error(errors.password?.message!);
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="max-w-5xl min-h-[calc(100vh-24.2rem)]  my-auto mx-auto">
      <Breadcrumbs newDirectory="Signup" />
      <div className=" flex justify-center items-center my-auto ">
        <div className="flex flex-col w-1/2 border border-base-300 rounded-xl shadow-lg p-8 ">
          <h1 className="text-3xl font-bold  text-center mb-5">
            Sign up to E-commerce
          </h1>
          <form className=" " onSubmit={handleSubmit(signup)}>
            <div className=" form-control">
              <label className=" label">
                <span className="label-text font-medium">Username</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  placeholder="Username"
                  className="input input-bordered w-full pl-10  "
                  {...register("username")}
                />
              </div>
            </div>
            <div className=" form-control">
              <label className=" label">
                <span className="label-text font-medium">Fullname</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  placeholder="Fullname"
                  className="input input-bordered w-full pl-10  "
                  {...register("fullname")}
                />
              </div>
            </div>
            <div className=" form-control">
              <label className=" label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  placeholder="Email"
                  className="input input-bordered w-full pl-10  "
                  {...register("email")}
                />
              </div>
            </div>
            <div className=" form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="password"
                  className="w-full input input-bordered pl-10  "
                  {...register("password")}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-base-content/40" />
                  ) : (
                    <Eye className="h-5 w-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>
            <button
              className="btn  w-full btn-neutral bg-black text-white mt-5 "
              onClick={() => validateSignUp(errors)}
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Create"
              )}
            </button>
            {/* <div className="divider">OR</div> */}
          </form>
          <div className="text-center mt-4">
            <p className="text-base-content/60">
              Already have account?{" "}
              <Link to="/login" className="link link-primary">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
