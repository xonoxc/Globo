import { apiClient } from "../config/axios.config"
import { v4 } from "uuid"
import Service from "./base"

class Subscription extends Service {
     constructor() {
          super()
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
