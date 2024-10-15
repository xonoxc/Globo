import { apiClient } from "../config/axios.config"
import Service from "./base"

class Bookmarks extends Service {
	constructor() {
		super()
	}

	public async toggleBookmark(postId: string) {
		const response = await apiClient.post(
			`${this.serverUrl}/bookmarks/t/${postId}`
		)

		return response
	}

	public async getUserBookmarks(userId: string) {
		const response = await apiClient.get(
			`${this.serverUrl}/bookmarks/usr/${userId}`
		)

		return response.data.data
	}

	public async getbookmarkStatus(postId: string) {
		const response = await apiClient.get(
			`${this.serverUrl}/bookmarks/s/${postId}`
		)

		return response.data.data
	}
}

export const bookmarks = new Bookmarks()
