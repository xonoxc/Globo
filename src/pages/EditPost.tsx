import { lazy, Suspense } from "react"
import { useEffect, useState } from "react"
import { PostProps } from "../types"
import { useNavigate, useParams } from "react-router-dom"
import Spinner from "../components/spinner/Spinner.tsx"
import { postService } from "../services/conf"
import { Container } from "../components"

const PostForm = lazy(() => import("../components/post-form/post-form.tsx"))

export default function EditPost(): JSX.Element {
     const [post, setPost] = useState<PostProps>()
     const { postId } = useParams()
     const navigate = useNavigate()

     useEffect(() => {
          if (postId) {
               postService.getPostById(postId).then(result => {
                    setPost(result)
               })
          } else {
               navigate("/")
          }
     }, [postId, navigate])

     if (post) {
          return (
               <div className="py-8">
                    <Container>
                         <Suspense
                              fallback={<Spinner className="text-black" />}
                         >
                              <PostForm post={post} />
                         </Suspense>
                    </Container>
               </div>
          )
     }

     return <></>
}
