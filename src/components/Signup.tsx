import React, { useState } from "react"
import authService from "../appwrite/auth"
import { useNavigate, Link } from "react-router-dom"
import { Button, Input, Logo } from "."
import { useDispatch } from "react-redux"
import { useForm } from "react-hook-form"
import { AppDispatch } from "../store/store"
import { login } from "../store/authSlice"

interface SingupProps {
  name: string
  email: string
  password: string
}

const Signup: React.FC = () => {
  const navigate = useNavigate()
  const [error, setError] = useState<string>("")
  const dispatch = useDispatch<AppDispatch>()
  const { handleSubmit, register } = useForm<SingupProps>()

  const create = async (data: SingupProps) => {
    setError("")
    try {
      const userData = await authService.createAccount(data)
      if (userData) {
        const currentUser = await authService.getCurrentUser()
        dispatch(login(currentUser))
        navigate("/")
      }
    } catch (error: any) {
      setError(error.message)
    }
  }

  if (error) {
    return <div className="error-div">{error}</div>
  }

  return (
    <div className="flex items-center justify-center">
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
            className="font-medium text-white trasition-all duration-200 hover:underline"
          >
            Login
          </Link>
        </p>
        {error && <p className="text-red-600 text-center mt-8">{error}</p>}
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
            <Button type="submit">Create account</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup
