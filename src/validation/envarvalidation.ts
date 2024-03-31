import { z } from "zod"

const configSchema = z.object({
     VITE_APPWRITE_URL: z.string().min(1),
     VITE_APPWRITE_PROJECT_ID: z.string().min(1),
     VITE_APPWRITE_DATABASE_ID: z.string().min(1),
     VITE_APPWRITE_COLLECTION_ID: z.string().min(1),
     VITE_APPWRITE_BUCKET_ID: z.string().min(1),
     VITE_APPWRITE_USER_PREFERENCES_COLLECTION_ID: z.string().min(1),
     VITE_TINYMICE_EDITOR_URL: z.string().min(1),
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
