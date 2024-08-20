export interface userData {
     id: string
     name: string
     email: string
     password?: string
     avatar?: string
     coverImage?: string
     isVerified?: boolean
     accessToken?: string
     refreshToken?: string
}

export type UpdateUserProps = {
     name: string
     email: string
     profile: File | undefined
     coverImage: File | undefined
     bio: string
}
