import { useEffect, useState } from "react"
import { PostProps, userData } from "../types"
import parse from "html-react-parser"
import { useNavigate, Link, useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "../store/store"
import appwriteService from "../appwrite/conf"
import { Container, Button } from "../components"
import { PencilLine, Trash2 } from "lucide-react"

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

     console.log(userData.$id)

     console.log("PostData userid", post?.userid)

     const isAuthor: boolean =
          post && userData ? post.userid === userData.$id : false

     console.log("isAuthor", isAuthor)

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
                         {isAuthor && (
                              <div className="mb-3 flex items-center justify-end gap-2">
                                   <Link to={`/edit-post/${post.$id}`}>
                                        <Button className=" text-white flex gap-2">
                                             <PencilLine />
                                             Edit
                                        </Button>
                                   </Link>
                                   <Button
                                        className="text-white  w-auto"
                                        onClick={deletePost}
                                   >
                                        <Trash2 />
                                   </Button>
                              </div>
                         )}
                         <div className="w-full flex flex-col justify-center mb-4 relative border-2 border-black rounded-xl p-2">
                              <img
                                   src={appwriteService
                                        .getFilePreview(post.image as string)
                                        .toString()}
                                   alt={post.title}
                                   className="rounded-[15px]"
                              />
                         </div>
                         <div className="w-full mb-6">
                              <h1 className="text-2xl font-bold">
                                   {post.title}
                              </h1>
                         </div>
                         <div className="browser-css">
                              {parse(post.content)}
                         </div>
                    </Container>
               </div>
          )
     }

     return <></>
}
