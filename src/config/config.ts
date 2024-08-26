import validateEnvironmentSchema from "../validation/envarvalidation"

const envVariables = {
     VITE_SERVER_URL: String(import.meta.env.VITE_SERVER_URL),
     VITE_TINYMICE_API_KEY: String(import.meta.env.VITE_TINYMICE_API_KEY),
     VITE_PROD_SERVER_URL: String(import.meta.env.VITE_PROD_SERVER_URL),
     VITE_ENV: String(import.meta.env.VITE_ENV),
}

const env = validateEnvironmentSchema(envVariables)

export default env
