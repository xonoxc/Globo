export interface PostProps {
     id?: number
     title: string
     userId: string
     content: string
     image: string | FileList
     slug?: string
     status: string
}

export interface feedPosts {
     title: string
     content: string
     image: string
}
