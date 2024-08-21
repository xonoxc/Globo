import { useEffect, useState } from "react"
import { PostProps, userData } from "../types"
import { useNavigate, Link, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Skeleton from "react-loading-skeleton"
import { AppDispatch, RootState } from "../store/store"
import { postService } from "../services/conf"
import { Container, Button } from "../components"
import { useSubscrtiption } from "../hooks/useSubscription"
import { PencilLine, Trash2, WandSparkles } from "lucide-react"
import { removeCache } from "../store/postSlice"
import { useImageLoad } from "../hooks/useImage"
import he from "he"
import HTMLComponent from "../components/renderer/HTML"
import Summerize from "../components/Summerize"

export default function Post(): JSX.Element {
     const [post, setPost] = useState<PostProps | null>(null)
     const [summerizing, setSummerizing] = useState<boolean>(false)
     const [toggleCompletionsection, setToggleCompletionsection] =
          useState<boolean>(false)
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

     const { status: subscriptionStatus } = useSubscrtiption(userData.id)

     const isAuthor: boolean =
          post && userData ? post.userId === userData.id : false

     useEffect((): void => {
          if (postId) {
               postService.getPostById(postId).then((response) => {
                    if (response) setPost(response as unknown as PostProps)
                    else navigate("/")
               })
          } else navigate("/")
     }, [])

     const deletePost = (): void => {
          if (post) {
               postService.deletePost(post.id as number).then((status) => {
                    if (status) {
                         dispatch(removeCache())
                         navigate("/")
                    }
               })
          }
     }

     const handleSummerizeClick = () => {
          setToggleCompletionsection(true)
          setSummerizing(true)
     }

     if (!post) {
          return <></>
     }

     console.log(subscriptionStatus)

     return (
          <div className="py-8">
               <Container>
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
                    <div className="w-full mb-6 mt-2">
                         <h1 className="text-2xl font-bold">
                              {loadState ? (
                                   <Skeleton width={200} borderRadius={10} />
                              ) : (
                                   post.title
                              )}
                         </h1>
                    </div>
                    {subscriptionStatus && (
                         <div className="tools w-full">
                              <div className="flex px-5 items-center justify-start md:w-[20%]">
                                   <Button
                                        className="font-bold flex flex-row gap-2  justify-center"
                                        textColor="white"
                                        onClick={handleSummerizeClick}
                                   >
                                        Summerize
                                        <WandSparkles />
                                   </Button>
                              </div>
                         </div>
                    )}
                    {toggleCompletionsection && (
                         <div className="w-full flex items-center px-2">
                              <Summerize
                                   content={post.content}
                                   trigger={summerizing}
                                   onComplete={() => setSummerizing(false)}
                              />
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
