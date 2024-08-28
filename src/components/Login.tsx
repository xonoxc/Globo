import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import loginSchema from "../validation/auth/login"
import { getTokenExpiry } from "../utils/token"
import { Link, useNavigate } from "react-router-dom"
import { login as authLogin, setRefreshToken } from "../store/authSlice"
import { toast } from "react-toastify"
import { Button, Input, Logo } from "."
import { authService } from "../services/auth"
import { useDispatch } from "react-redux"
import { userData } from "@/types"
import { AppDispatch } from "../store/store"
import Spinner from "../components/spinner/Spinner"
import { ToastContainer } from "react-toastify"
import { toastConfig } from "../config/toast.config"
import "react-toastify/dist/ReactToastify.css"

type LoginProps = z.infer<typeof loginSchema>

const Login: React.FC = (): JSX.Element => {
     const navigate = useNavigate()
     const dispatch = useDispatch<AppDispatch>()
     const {
          register,
          handleSubmit,
          formState: { errors },
     } = useForm<LoginProps>({
          resolver: zodResolver(loginSchema),
     })
     const [loading, setLoading] = useState<boolean>(false)

     const login = async (data: LoginProps): Promise<void> => {
          try {
               setLoading(true)
               const session = await authService.login(
                    data.email,
                    data.password
               )
               if (session.data) {
                    if (session) {
                         toast.success("Login successful!!", toastConfig)
                         dispatch(
                              authLogin({
                                   user: session.data.data?.user as userData,
                              })
                         )
                         dispatch(
                              setRefreshToken({
                                   newRefreshtoken: session.data.data
                                        ?.refreshToken as string,
                                   refreshTokenExpiry: getTokenExpiry(
                                        session.data.data
                                             ?.refreshToken as string
                                   ),
                              })
                         )
                         navigate("/")
                    }
               }
          } catch (error: any) {
               console.log(error)
               toast.error(error.message, toastConfig)
          } finally {
               setLoading(false)
          }
     }

     if (loading) {
          return <Spinner className="text-black" />
     }

     return (
          <div className="flex items-center justify-center w-full">
               <ToastContainer
                    className={"shadow-black shadow-xl border-2 rounded-xl"}
                    position="bottom-right"
                    autoClose={5000}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
               />
               <div
                    className={`mx-auto w-full max-w-lg bg-black-500 rounded-xl p-10 border border-black/10`}
               >
                    <div className="mb-2 flex justify-center">
                         <span className="inline-block w-full max-w-[100px]">
                              <Logo width="100%" />
                         </span>
                    </div>
                    <h2 className="text-center text-2xl font-bold leading-tight">
                         Sign in to your account!
                    </h2>
                    <p className="mt-2 text-center text-base text-black/60">
                         Don&apos;t have an account?&nbsp;
                         <Link
                              to={"/signup"}
                              className="font-medium transition-all duration-200 hover:underline text-black"
                         >
                              Signup
                         </Link>
                    </p>

                    <form onSubmit={handleSubmit(login)} className="mt-8">
                         <div className="space-y-5">
                              <div>
                                   <Input
                                        label="Email:"
                                        placeholder="Enter your email"
                                        type="email"
                                        {...register("email")}
                                   />
                                   {errors.email && (
                                        <p className="text-red-500 text-sm">
                                             {errors.email.message}
                                        </p>
                                   )}
                              </div>
                              <div>
                                   <Input
                                        label="Password"
                                        placeholder="Enter your password"
                                        type="password"
                                        {...register("password")}
                                   />
                                   {errors.password && (
                                        <p className="text-red-500 text-sm">
                                             {errors.password.message}
                                        </p>
                                   )}
                              </div>
                              <Button
                                   type="submit"
                                   bgColor="black"
                                   textColor="white"
                              >
                                   Sign in
                              </Button>
                         </div>
                    </form>
               </div>
          </div>
     )
}

export default Login
