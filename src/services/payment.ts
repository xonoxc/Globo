import { apiClient } from "../config/axios.config"
import env from "../config/config"
import { v4 } from "uuid"

class Subscription {
     private serverUrl: string

     constructor() {
          if (env?.VITE_ENV !== "dev") {
               this.serverUrl = env?.VITE_PROD_SERVER_URL as string
          } else {
               this.serverUrl = env?.VITE_SERVER_URL as string
          }
     }

     public async create(card_number: string): Promise<any> {
          const response = await apiClient.post(
               `${this.serverUrl}/s/subscribe`,
               {
                    amount: 50,
                    currency: "USD",
                    paymentMethod: "credit_card",
                    orderId: v4(),
                    cardNumber: card_number,
               }
          )

          return response
     }
}

export const subService = new Subscription()
