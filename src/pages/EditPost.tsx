import { lazy, Suspense } from "react"
import { useEffect, useState } from "react"
import { PostProps } from "../types"
import { useNavigate, useParams } from "react-router-dom"
import { postService } from "../services/conf"
import { Container } from "../components"

const PostForm = lazy(() => import("../components/post-form/post-form.tsx"))

export default function EditPost(): JSX.Element {
     const [post, setPost] = useState<PostProps>()
     const { postId } = useParams()
     const navigate = useNavigate()

     useEffect(() => {
          if (postId) {
               postService.getPostById(Number(postId)).then((result) => {
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
                         <Suspense fallback={<h2>Loading...</h2>}>
                              <PostForm post={post} />
                         </Suspense>
                    </Container>
               </div>
          )
     }

     return <></>
}
