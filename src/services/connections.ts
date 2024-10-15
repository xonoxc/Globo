import { apiClient } from "../config/axios.config"
import Service from "./base"


class ConnService extends Service {
	constructor() {
		super()
	}

	public async toggleConnection(followingId: string, followerId: string) {
		const response = await apiClient.post(
			`${this.serverUrl}/connections/c`,
			{
				followingId: followingId,
				followerId: followerId,
			}
		)
		return response.data
	}

	public async getUserFollowers(userId: string) {
		const response = await apiClient.get(
			`${this.serverUrl}/connections/c/${userId}/followers`
		)

		return response.data
	}

	public async getUserFollowing(userId: string) {
		const response = await apiClient.get(
			`${this.serverUrl}/connections/c/${userId}/following`
		)

		return response.data
	}
}



export const connService = new ConnService()

