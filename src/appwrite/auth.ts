import env from "../config/config"
import { Client, Account, ID } from "appwrite"
import service from "./conf"

export class AuthService {
     private client: Client = new Client()
     private account: Account

     constructor() {
          this.client
               .setEndpoint(env?.VITE_APPWRITE_URL!)
               .setProject(env?.VITE_APPWRITE_PROJECT_ID!)

          this.account = new Account(this.client)
     }

     async createAccount({
          email,
          password,
          name,
     }: {
          email: string
          password: string
          name: string
     }) {
          try {
               const userAccount = await this.account.create(
                    ID.unique(),
                    email,
                    password,
                    name
               )

               if (userAccount) {
                    return this.login({ email, password })
               } else {
                    return userAccount
               }
          } catch (error) {
               throw error
          }
     }

     async login({ email, password }: { email: string; password: string }) {
          try {
               const session = await this.account.createEmailSession(
                    email,
                    password
               )
               const userPreferences = await service.setDefaultUserPreferences(
                    session.$id
               )

               if (userPreferences && session) {
                    const userObject = {
                         ...session,
                         ...userPreferences,
                    }
                    return userObject
               }

               return {
                    sessionInfo: "no session of this user was found",
                    empty: true,
               }
          } catch (error) {
               throw error
          }
     }

     async getCurrentUser() {
          try {
               return await this.account.get()
          } catch (error) {
               throw error
          }
     }

     async logout() {
          try {
               return await this.account.deleteSessions()
          } catch (error) {
               throw error
          }
     }
}

const authService = new AuthService()

export default authService
