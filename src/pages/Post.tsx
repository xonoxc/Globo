import { useEffect, useState } from "react"
import { PostProps, userData } from "../types"
import { useNavigate, Link, useParams } from "react-router-dom"
import { MoveLeft } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import Skeleton from "react-loading-skeleton"
import { AppDispatch, RootState } from "../store/store"
import { postService } from "../services/conf"
import { Container, Button } from "../components"
import { PencilLine, Trash2 } from "lucide-react"
import { removeCache } from "../store/postSlice"
import { useImageLoad } from "../hooks/useImage"
import he from "he"
import HTMLComponent from "../components/renderer/HTML"
import { useSubscrtiption } from "../hooks/useSubscription"
import Summerize from "../components/Summerize"

export default function Post(): JSX.Element {
     const [post, setPost] = useState<PostProps | null>(null)
     const { postId } = useParams()
     const dispatch = useDispatch<AppDispatch>()
     const navigate = useNavigate()

     const userDataSelector = (state: RootState) => state.auth.userData

     const { loadState } = useImageLoad(post ? (post.image as string) : "")

     const userData = useSelector((state: RootState) => {
          const user = userDataSelector(state)
          if (user) {
               return user as userData
          } else {
               throw new Error("[postFormError] :User data not found!")
          }
     })

     const isAuthor: boolean =
          post && userData ? post.userId === userData.id : false

     const { status: subscrtiptionStatus } = useSubscrtiption(userData.id)

     useEffect((): void => {
          if (postId) {
               postService.getPostById(postId).then(response => {
                    if (response) setPost(response as unknown as PostProps)
                    else navigate("/")
               })
          } else navigate("/")
     }, [])

     const deletePost = (): void => {
          if (post) {
               postService.deletePost(post.id as number).then(status => {
                    if (status) {
                         dispatch(removeCache())
                         navigate("/")
                    }
               })
          }
     }

     if (!post) {
          return <></>
     }

     return (
          <div className="py-8">
               <Container>
                    <div className="upper flex items-center justify-between">
                         <div className="back px-4 md:px-2 w-1/5 md:w-1/12 mb-3 bg-black text-white rounded-md flex items-center justify-center ">
                              <Button
                                   className="md:w-1/2 w-full flex py-3 md:py-2 items-center justify-center bg-transparent font-bold gap-2 "
                                   onClick={() => navigate("/")}
                              >
                                   <MoveLeft size={15} fontWeight={800} />
                                   <span className="hidden md:block">Back</span>
                              </Button>
                         </div>
                         {isAuthor && (
                              <div className="mb-3 flex items-center justify-end gap-2 ">
                                   <div className="ctrl-btns flex gap-2">
                                        <Link to={`/edit-post/${post.id}`}>
                                             <Button className=" text-white flex gap-2 ">
                                                  <PencilLine />
                                                  Edit
                                             </Button>
                                        </Link>
                                        <Button
                                             className="text-white "
                                             onClick={deletePost}
                                        >
                                             <Trash2 />
                                        </Button>
                                   </div>
                              </div>
                         )}
                    </div>
                    {loadState ? (
                         <Skeleton height={200} borderRadius={15} />
                    ) : (
                         <div className="w-full flex flex-col justify-center mb-4 relative border-2 border-black rounded-xl p-2">
                              <img
                                   src={post.image as string}
                                   alt={post.title}
                                   className="rounded-[15px]"
                              />
                         </div>
                    )}
                    <div className="w-full mt-3">
                         <div className="titleContainer ">
                              <h1 className="text-5xl text-gray-600  border-gray-300 px-4 uppercase font-bold">
                                   {loadState ? (
                                        <Skeleton
                                             width={200}
                                             borderRadius={10}
                                        />
                                   ) : (
                                        post.title
                                   )}
                              </h1>
                         </div>
                    </div>
                    {subscrtiptionStatus && (
                         <div className="w-full flex items-center px-2">
                              <Summerize content={post.content} />
                         </div>
                    )}

                    <div className="browser-css">
                         {loadState ? (
                              <Skeleton width={400} />
                         ) : (
                              <HTMLComponent html={he.decode(post.content)} />
                         )}
                    </div>
               </Container>
          </div>
     )
}
