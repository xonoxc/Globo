import { useEffect, useState } from "react"
import { PostProps } from "../types"
import { useNavigate, useParams } from "react-router-dom"
import appwriteService from "../appwrite/conf"
import { Container, PostForm } from "../components"

export default function EditPost(): JSX.Element {
  const [post, setPost] = useState<PostProps>()
  const { postId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (postId) {
      appwriteService.getPost(postId).then((data) => {
        const postData = data as unknown as PostProps
        setPost(postData)
      })
    } else {
      navigate("/")
    }
  }, [postId, navigate])

  if (post) {
    return (
      <div className="py-8">
        <Container>
          <PostForm post={post} />
        </Container>
      </div>
    )
  }

  return <></>
}
