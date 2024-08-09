export interface PostProps {
     id?: number
     title: string
     userId: string
     content: string
     image: string | FileList
     slug?: string
     status: string
     User?: {
          name: string
          avatar: string
     }
     createdAt: string
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
