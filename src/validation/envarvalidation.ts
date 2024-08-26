import { z } from "zod"

const configSchema = z.object({
     VITE_SERVER_URL: z.string().min(1),
     VITE_TINYMICE_API_KEY: z.string().min(1),
     VITE_ENV: z.string().min(1),
     VITE_PROD_SERVER_URL: z.string().min(1),
})

const validateEnvironmentSchema = (config: Object) => {
     try {
          const parsedVars = configSchema.safeParse(config)

          if (!parsedVars.success) {
               throw new Error(parsedVars.error.issues[0].message)
          }
          return parsedVars.data
     } catch (error) {
          if (error instanceof z.ZodError) {
               console.error("Invalid configuration :", error.errors)
          } else {
               console.error(
                    "Error while validating environment variables :",
                    error
               )
          }
     }
}

export default validateEnvironmentSchema
