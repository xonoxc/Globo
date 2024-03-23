import config from "../config/config"
import { Client, Account, ID } from "appwrite"

export class AuthService {
  private client: Client = new Client()
  private account: Account

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectID)
    console.log("Projct:", config.appwriteProjectBucketID)

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
      return await this.account.createEmailSession(email, password)
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
