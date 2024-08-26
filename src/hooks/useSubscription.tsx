import { createContext, useState, useContext, useEffect } from "react"
import { authService } from "../services/auth"

interface ISubsProps {
     status: boolean
     fetchStatus: (userId: string) => Promise<void>
}

const subscriptionContext = createContext<ISubsProps | Record<string , never>>({})

interface ISubsProviderProps {
     children: React.ReactNode
}

export const SubscriptionProvider = ({ children }: ISubsProviderProps) => {
     const [status, setStatus] = useState<boolean>(false)

     const fetchStatus = async (userId: string) => {
          try {
               const response = await authService.getSubscription(userId)
               setStatus(response)
          } catch (error) {
               console.log(
                    `Erorr while fetchging user subscriptiuon : ${error}`
               )
          }
     }

     return (
          <subscriptionContext.Provider value={{ status, fetchStatus }}>
               {children}
          </subscriptionContext.Provider>
     )
}

export const useSubscrtiption = (userId: string): { status: boolean } => {
     const { status, fetchStatus } = useContext(
          subscriptionContext
     ) as ISubsProps

     useEffect(() => {
          fetchStatus(userId)
     }, [userId])

     return { status }
}
