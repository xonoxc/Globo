import { z } from "zod"

const signupValidationn = z.object({
     name: z
          .string()
          .min(4, { message: "username must be atleast 4 characters" })
          .max(30, { message: "username can be maximum 30 characters" }),
     email: z
          .string()
          .email("please enter a valid email")
          .min(1, { message: "email is required!" }),
     password: z
          .string()
          .max(12, { message: "password can be maximum 12 characters" })
          .min(8, { message: "password must be minimum 8 characters" }),
})

export default signupValidationn
