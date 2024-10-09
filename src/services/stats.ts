import { apiClient } from "../config/axios.config"
import Service from "./base"

class Stats extends Service {
	constructor() {
		super()
	}

	public async getStats(postId: string) {
		const response = await apiClient.get(
			`${this.serverUrl}/p/sts/${postId}`
		)
		return response.data.data
	}

	public async toggleLike(postId: string) {
		const response = await apiClient.post(
			`${this.serverUrl}/likes/${postId}`
		)

		return response
	}

	public async toggleCommentLike(commentId: string, articleId: string) {
		const response = await apiClient.post(
			`${this.serverUrl}/likes/co/${commentId}`,
			{
				articleId
			}
		)
		return response
	}

	public async getPostLikeStatus(postId: string) {
		const response = await apiClient.get(
			`${this.serverUrl}/likes/sts/${postId}`
		)

		return response.data.data
	}
}

export const statsistics = new Stats()
