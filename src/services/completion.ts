import { apiClient } from "../config/axios.config"
import env from "../config/config"

class Completion {
     private serverUrl: string

     constructor() {
          this.serverUrl = env?.VITE_SERVER_URL as string
     }

     public parsestreamResponse(response: string): string[] {
          console.log(response)
          const arrayContentMatch = response.match(/\[\s*([^\]]*)\s*\]/)

          if (arrayContentMatch) {
               return JSON.parse(arrayContentMatch[0]) as string[]
          }

          return []
     }

     public async getSummery(content: string): Promise<any> {
          const response = await apiClient.post(
               `${this.serverUrl}/ai/summerize`,
               { content },
               {
                    responseType: "stream",
                    headers: {
                         "Content-Type": "application/json",
                         Accept: "text/event-stream",
                    },
               }
          )

          return response.data
     }
}

export const completion = new Completion()
