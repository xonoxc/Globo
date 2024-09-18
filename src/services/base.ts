import env from "../config/config"

class Service {
     protected serverUrl: string

     constructor() {
          if (env?.VITE_ENV !== "dev") {
               this.serverUrl = env?.VITE_PROD_SERVER_URL as string
          } else {
               this.serverUrl = env?.VITE_SERVER_URL as string
          }
     }

     protected useServerUrl() {
          return this.serverUrl
     }
}

export default Service
