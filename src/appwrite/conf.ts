import { Client, ID, Databases, Storage, Query } from "appwrite"
import env from "../config/config"

export class Service {
     private client: Client = new Client()
     private databases: Databases
     private bucket: Storage

     constructor() {
          this.client
               .setEndpoint(env?.VITE_APPWRITE_URL!)
               .setProject(env?.VITE_APPWRITE_PROJECT_ID!)
          this.databases = new Databases(this.client)
          this.bucket = new Storage(this.client)
     }

     async createPost({
          title,
          content,
          image,
          status,
          userid,
     }: {
          title: string
          content: string
          image: string
          status: string
          userid: string
     }) {
          try {
               return await this.databases.createDocument(
                    env?.VITE_APPWRITE_DATABASE_ID!,
                    env?.VITE_APPWRITE_COLLECTION_ID!,
                    ID.unique(),
                    {
                         title,
                         content,
                         image,
                         status,
                         userid,
                    }
               )
          } catch (error) {
               console.error(error)
          }
     }

     async updatePost(
          postId: string,
          {
               title,
               content,
               image,
               status,
          }: {
               title?: string
               image?: string
               status?: string
               content?: string
          }
     ) {
          try {
               const updatedFields: Partial<{
                    title: string
                    content: string
                    image: string
                    status: string
               }> = {
                    ...(title && { title }),
                    ...(content && { content }),
                    ...(image && { image }),
                    ...(status && { status }),
               }

               return this.databases.updateDocument(
                    env?.VITE_APPWRITE_PROJECT_ID!,
                    env?.VITE_APPWRITE_COLLECTION_ID!,
                    postId,
                    updatedFields
               )
          } catch (error) {
               throw error
          }
     }

     async deletePost(postId: string) {
          try {
               await this.databases.deleteDocument(
                    env?.VITE_APPWRITE_DATABASE_ID!,
                    env?.VITE_APPWRITE_COLLECTION_ID!,
                    postId
               )

               return true
          } catch (error) {
               console.error(error)
               return false
          }
     }

     async getPost(postId: string) {
          try {
               return await this.databases.getDocument(
                    env?.VITE_APPWRITE_DATABASE_ID!,
                    env?.VITE_APPWRITE_COLLECTION_ID!,
                    postId
               )
          } catch (error) {
               console.error(error)
          }
     }

     async getAllPosts(queries = [Query.equal("status", "active")]) {
          try {
               return await this.databases.listDocuments(
                    env?.VITE_APPWRITE_DATABASE_ID!,
                    env?.VITE_APPWRITE_COLLECTION_ID!,
                    queries
               )
          } catch (error) {
               throw error
          }
     }

     async uploadFile(file: File) {
          try {
               return await this.bucket.createFile(
                    env?.VITE_APPWRITE_BUCKET_ID!,
                    ID.unique(),
                    file
               )
          } catch (error) {
               console.error(error)
          }
     }

     async setDefaultUserPreferences(userId: ID) {
          try {
               const response = await this.databases.createDocument(
                    env?.VITE_APPWRITE_BUCKET_ID!,
                    env?.VITE_APPWRITE_USER_PREFERENCES_COLLECTION_ID!,
                    ID.unique(),
                    {
                         pro_user: false,
                         avatar: "",
                         article_count: 0,
                         user_id: userId,
                    }
               )

               if (response) {
                    return response
               }
          } catch (error) {
               console.error(error)
          }
     }

     async deleteFile(fileId: string) {
          try {
               await this.bucket.deleteFile(
                    env?.VITE_APPWRITE_BUCKET_ID!,
                    fileId
               )
               return true
          } catch (error) {
               console.error(error)
               return false
          }
     }

     getFilePreview(fileId: string) {
          return this.bucket.getFilePreview(
               env?.VITE_APPWRITE_BUCKET_ID!,
               fileId
          )
     }
}

const service = new Service()

export default service
