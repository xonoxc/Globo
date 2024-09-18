import { apiClient } from "../config/axios.config"
import Service from "./base"

class Completion extends Service {
     constructor() {
          super()
     }

     public parsestreamResponse(response: string): string[] {
          const arrayContentMatch = response.match(/\[\s*([^\]]*)\s*\]/)

          if (!arrayContentMatch) return []

          const content = arrayContentMatch[0]

          try {
               const parsedArray = JSON.parse(content) as string[]

               if (
                    Array.isArray(parsedArray) &&
                    parsedArray.every(item => typeof item === "string")
               ) {
                    return parsedArray
               } else {
                    console.warn(
                         "Parsed content is not a valid array of strings."
                    )
                    return []
               }
          } catch (error) {
               console.error("Error parsing response:", error)
               return []
          }
     }

     public async getSummery(content: string, retry: boolean): Promise<any> {
          const response = await apiClient.post(
               `${this.serverUrl}/ai/summerize`,
               { content, retry },
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
