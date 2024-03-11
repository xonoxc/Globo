import config from "../config/config";
import { Client, ID, Databases, Storage, Query } from "appwrite";


export class Service {
	private client: Client = new Client()
	private databases: Databases
	private bucket: Storage


	constructor() {
		this.client
			.setEndpoint(config.appwriteUrl)
			.setProject(config.appwriteProjectID)
		this.databases = new Databases(this.client)
		this.bucket = new Storage(this.client)
	}

	async createPost({ title, content, image, status, userid }: { title: string, slug: string, content: string, image: string, status: string, userid: string }) {
		try {

			return await this.databases.createDocument(
				config.appwriteProjectDatabaseID,
				config.appwriteProjectCollectionID,
				ID.unique(),
				{
					title,
					content,
					image,
					status,
					userid
				}
			)

		} catch (error) {
			console.error(error);
		}

	}

	async updatePost(postId: string, { title, content, image, status }: {
		title?: string,
		image?: string,
		status?: string
		content?: string,
	}) {
		try {

			const updatedFields: Partial<{
				title: string,
				content: string,
				image: string,
				status: string
			}> = {
				...(title && { title }),
				...(content && { content }),
				...(image && { image }),
				...(status && { status })
			};


			return this.databases.updateDocument(
				config.appwriteProjectDatabaseID,
				config.appwriteProjectCollectionID,
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
				config.appwriteProjectDatabaseID,
				config.appwriteProjectCollectionID,
				postId)

			return true


		} catch (error) {
			console.error(error)
			return false
		}

	}

	async getPost(postId: string) {
		try {
			return await this.databases.getDocument(
				config.appwriteProjectDatabaseID,
				config.appwriteProjectCollectionID,
				postId
			)

		} catch (error) {
			console.error(error)

		}


	}


	async getAllPosts(queries = [Query.equal("status", "active")]) {
		try {
			return await this.databases.listDocuments(
				config.appwriteProjectDatabaseID,
				config.appwriteProjectCollectionID,
				queries
			)


		} catch (error) {
			console.error(error)

		}
	}

	async uploadFile(file: File) {
		try {
			await this.bucket.createFile(
				config.appwriteProjectBucketID,
				ID.unique(),
				file
			)
			return true

		} catch (error) {
			console.error(error)
			return false


		}
	}

	async deleteFile(fileId: string) {
		try {
			await this.bucket.deleteFile(
				config.appwriteProjectBucketID,
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
			config.appwriteProjectBucketID,
			fileId
		)
	}

}

const service = new Service()

export default service
