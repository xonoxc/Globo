import { useEffect, useState } from "react"
import { PostProps, userData } from "../types"
import parse from "html-react-parser"
import { useNavigate, Link, useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "../store/store"
import appwriteService from "../appwrite/conf"
import { Container, Button } from "../components"

export default function Post(): JSX.Element {
  const [post, setPost] = useState<PostProps>()
  const { postId } = useParams()
  const navigate = useNavigate()

  const userDataSelector = (state: RootState) => state.auth.userData

  const userData = useSelector((state: RootState) => {
    const user = userDataSelector(state)
    if (user) {
      return user as userData
    } else {
      throw new Error("[postFormError] :User data not found!")
    }
  })

  const isAuthor: boolean =
    post && userData ? post.userid === userData.$id : false

  useEffect(() => {
    if (postId) {
      appwriteService.getPost(postId).then((response) => {
        if (response) setPost(response as unknown as PostProps)
        else navigate("/")
      })
    } else navigate("/")
  }, [])

  const deletePost = () => {
    if (post) {
      appwriteService.deletePost(post.$id).then((status) => {
        if (status) {
          appwriteService.deleteFile(post.image as string)
          navigate("/")
        }
      })
    }
  }

  if (post) {
    return (
      <div className="py-8">
        <Container>
          <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
            <img
              src={appwriteService
                .getFilePreview(post.image as string)
                .toString()}
              alt={post.title}
              className="rounded-xl"
            />

            {isAuthor && (
              <div className="absolute right-6 top-6">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button bgColor="bg-green-500" className="mr-3">
                    Edit
                  </Button>
                </Link>
                <Button bgColor="bg-red-500" onClick={deletePost}>
                  Delete
                </Button>
              </div>
            )}
          </div>
          <div className="w-full mb-6">
            <h1 className="text-2xl font-bold">{post.title}</h1>
          </div>
          <div className="browser-css">{parse(post.content)}</div>
        </Container>
      </div>
    )
  }

  return <></>
}
