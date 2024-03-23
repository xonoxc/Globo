export interface PostProps {
  $id: string
  title: string
  userid: string
  content: string
  image: string | FileList
  status: string
}

export interface feedPosts {
  title: string
  content: string
  image: string
}
