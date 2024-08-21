import validateEnvironmentSchema from "../validation/envarvalidation"

const envVariables = {
     VITE_SERVER_URL: String(import.meta.env.VITE_SERVER_URL),
     VITE_TINYMICE_API_KEY: String(import.meta.env.VITE_TINYMICE_API_KEY),
}

const env = validateEnvironmentSchema(envVariables)

export default env
