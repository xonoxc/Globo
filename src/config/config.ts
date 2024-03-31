import validateEnvironmentSchema from "../validation/envarvalidation"

const envVariables = {
     VITE_APPWRITE_URL: String(import.meta.env.VITE_APPWRITE_URL),
     VITE_APPWRITE_PROJECT_ID: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
     VITE_APPWRITE_DATABASE_ID: String(
          import.meta.env.VITE_APPWRITE_DATABASE_ID
     ),
     VITE_APPWRITE_COLLECTION_ID: String(
          import.meta.env.VITE_APPWRITE_COLLECTION_ID
     ),
     VITE_APPWRITE_BUCKET_ID: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
     VITE_APPWRITE_USER_PREFERENCES_COLLECTION_ID: String(
          import.meta.env.VITE_APPWRITE_USER_PREFERENCES_COLLECTION_ID
     ),
     VITE_TINYMICE_EDITOR_URL: String(import.meta.env.VITE_TINYMICE_EDITOR_URL),
}

const env = validateEnvironmentSchema(envVariables)

export default env
