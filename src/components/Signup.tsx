import React from "react"
import { authService } from "../services/auth"
import { useNavigate, Link } from "react-router-dom"
import { Button, Input, Logo } from "."
import { useDispatch } from "react-redux"
import { useForm } from "react-hook-form"
import { AppDispatch } from "../store/store"
import { login } from "../store/authSlice"
import { ToastContainer, toast } from "react-toastify"
import { toastConfig } from "../config/toast.config"
import "react-toastify/dist/ReactToastify.css"

interface SingupProps {
     name: string
     email: string
     password: string
}

const Signup: React.FC = (): JSX.Element => {
     const navigate = useNavigate()
     const dispatch = useDispatch<AppDispatch>()
     const { handleSubmit, register } = useForm<SingupProps>()

     const create = async (data: SingupProps): Promise<void> => {
          try {
               const userData = await authService.createAccount(
                    data.name,
                    data.email,
                    data.password
               )
               if (userData) {
                    toast.success("Account created successfully!", toastConfig)
                    dispatch(login({ user: userData }))
                    navigate("/")
               }
          } catch (error: any) {
               toast.error(error.message, toastConfig)
          }
     }

     return (
          <div className="flex items-center justify-center">
               <ToastContainer
                    position="bottom-right"
                    autoClose={5000}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    className={"shadow-black shadow-lg"}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
               />
               <div
                    className={
                         "mx-auto w-full max-w-lg bg-white rounded-xl p-10 border border-black/10"
                    }
               >
                    <div className="mb-2 flex justify-center">
                         <span className="inline-block w-full max-w-[100px]">
                              <Logo width="100%"></Logo>
                         </span>
                    </div>
                    <h2 className="text-center text-2xl font-bold leading-tight">
                         Login to your account!
                    </h2>
                    <p className="mt-2 text-center text-base text-black/60">
                         Already have an account ?&nbsp;
                         <Link
                              to={"/login"}
                              className="font-medium text-black trasition-all duration-200 hover:underline"
                         >
                              Login
                         </Link>
                    </p>
                    <form onSubmit={handleSubmit(create)} className="mt-8">
                         <div className="space-y-5">
                              <Input
                                   label="username"
                                   placeholder="create a username"
                                   type="text"
                                   {...register("name", { required: true })}
                              />
                              <Input
                                   label="Email:"
                                   placeholder="Enter your email"
                                   type="email"
                                   {...register("email", {
                                        required: true,
                                        pattern: {
                                             value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                             message: "Please enter a valid email address",
                                        },
                                   })}
                              />
                              <Input
                                   label="password"
                                   placeholder="Enter your password"
                                   type="password"
                                   {...register("password", { required: true })}
                              />
                              <Button type="submit" textColor="white">
                                   Create account
                              </Button>
                         </div>
                    </form>
               </div>
          </div>
     )
}

export default Signup
