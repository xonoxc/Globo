export interface PostProps {
     id?: number
     title: string
     userId: string
     content: string
     image: string | FileList
     slug?: string
     status: string
     user?: {
          id: string
          name: string
          avatar: string
     }
     createdAt?: string
     updatedAt?: string
}

export interface feedPosts {
     title: string
     content: string
     image: string
     User: {
          name: string
          avatar: string
     }
}
