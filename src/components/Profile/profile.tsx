import Skeleton from "react-loading-skeleton"
import { Link, useNavigate } from "react-router-dom"
import "react-loading-skeleton/dist/skeleton.css"
import ProfileFallback from "/def_pfp.jpg"
import { IUserProfile } from "../../types/apiResponse"
import { Button } from "../../components"
import { History, Text, Bookmark, ClipboardCheck } from "lucide-react"
import getRelativeTime from "../../utils/date"
import Fallback from "../../pages/Fallback"
import DefaultCoverImage from "/cover_image.png"
import { BookCheck } from "lucide-react"
import { lazy } from "react"
import { ToastContainer, toast } from "react-toastify"

const ConnectionStrip = lazy(() => import("../connectionStrip"))

interface IProfileProps {
     data: IUserProfile
     isAuthor: boolean
     loading: boolean
     bookmarks: {
          articleId: string
          post: { title: string }
          createdAt: string
     }[]
}

export default function Profile({
     data,
     isAuthor,
     loading,
     bookmarks,
}: IProfileProps) {
     const navigate = useNavigate()

     if (!loading && !data) return <Fallback />

     console.log(data.preferences.proUser)

     return (
          <div className="relative w-full max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-12">
               {/* Cover Image */}
               <div className="relative w-full h-[200px] md:h-[250px] mb-8">
                    {loading ? (
                         <Skeleton className="w-full h-full object-cover" />
                    ) : (
                         <img
                              src={data.coverImage || DefaultCoverImage}
                              alt="Cover Image"
                              className="w-full h-full object-cover"
                         />
                    )}
               </div>

               <div className="relative flex flex-col items-center md:items-start md:flex-row md:gap-6 mb-8">
                    {/* Avatar */}
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white shadow-lg mb-4 md:mb-0">
                         {loading ? (
                              <Skeleton className="w-full h-full rounded-full bg-gray-300" />
                         ) : (
                              <img
                                   src={data.avatar || ProfileFallback}
                                   alt="Profile Avatar"
                                   className="w-full h-full object-cover"
                              />
                         )}
                    </div>

                    {/* Profile Section */}
                    <div className="flex flex-col items-center md:items-start">
                         {loading ? (
                              <>
                                   <Skeleton className="w-36 h-8 rounded-md bg-gray-300 mb-2" />
                                   <Skeleton className="w-48 h-6 rounded-md bg-gray-300 mb-2" />
                                   <Skeleton className="w-24 h-6 rounded-md bg-gray-300" />
                              </>
                         ) : (
                              <>
                                   <div className="text-2xl font-bold mb-2">
                                        {data.name}
                                   </div>
                                   <div className="text-gray-500 mb-2">
                                        {data.email}
                                   </div>
                                   {data.isVerified && (
                                        <div className="bg-gray-500 text-white px-2 py-1 rounded-md font-medium">
                                             Verified
                                        </div>
                                   )}
                              </>
                         )}
                    </div>

                    {/* Edit Button */}
                    {isAuthor && (
                         <div className="mt-4 md:mt-0">
                              <Button
                                   onClick={() =>
                                        navigate(`/u/profile/e/${data.id}`)
                                   }
                                   textColor="white"
                              >
                                   Edit Profile
                              </Button>
                         </div>
                    )}
               </div>

               <ConnectionStrip
                    initialArticleCount={data.preferences?.articleCount}
                    onShare={() =>
                         toast.success("link copied to clipboard", {
                              icon: <ClipboardCheck color="#0f1014" />,
                         })
                    }
               />

               {/* Cards Section */}
               <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mt-4">
                    {/* Preferences Card */}
                    <div className="p-6 border rounded-lg shadow-md">
                         {loading ? (
                              <>
                                   <Skeleton className="w-32 h-6 rounded-md mb-4 bg-gray-300" />
                                   <Skeleton className="w-16 h-6 rounded-md mb-4 bg-gray-300" />
                                   <Skeleton className="w-full h-4 mt-2 rounded-md bg-gray-300" />
                                   <Skeleton className="w-full h-4 mt-2 rounded-md bg-gray-300" />
                              </>
                         ) : (
                              <div className="grid gap-4">
                                   <div className="flex items-center justify-between mb-4">
                                        {data.preferences.proUser && (
                                             <div className="bg-gray-400 text-white px-2 py-1 rounded-md font-medium">
                                                  Pro User
                                             </div>
                                        )}
                                   </div>
                                   <div className="grid gap-2 text-gray-500">
                                        <div className="flex items-center justify-between">
                                             <div>Bio</div>
                                             <div className="text-right">
                                                  {data.preferences?.bio}
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         )}
                    </div>

                    {/* Recent Articles Section */}
                    <div className="grid gap-4">
                         {loading ? (
                              <>
                                   <Skeleton className="w-32 h-6 rounded-md mb-4 bg-gray-300" />
                                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {data?.articles?.map((_, idx) => (
                                             <Skeleton
                                                  key={idx}
                                                  className="w-full h-40 rounded-lg bg-gray-300"
                                             />
                                        ))}
                                   </div>
                              </>
                         ) : (
                              <>
                                   <div className="p-1 border rounded-lg shadow-md mb-4">
                                        <div className="text-lg font-semibold flex gap-1 items-center bg-gray-100 p-2 rounded-lg">
                                             <History color="gray" />
                                             Recent Articles
                                        </div>
                                   </div>
                                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {data?.articles?.map((article, idx) => (
                                             <Link
                                                  to={`/post/${article.id}`}
                                                  key={idx}
                                             >
                                                  <div className="p-4 border rounded-lg shadow-md">
                                                       <div className="flex flex-col gap-2">
                                                            <div className="text-sm font-medium flex items-center gap-2 ">
                                                                 <Text color="gray" />
                                                                 {article.title}
                                                            </div>
                                                            <div className="text-xs text-gray-500">
                                                                 {getRelativeTime(
                                                                      article.createdAt
                                                                 )}
                                                            </div>
                                                       </div>
                                                  </div>
                                             </Link>
                                        ))}
                                   </div>
                              </>
                         )}
                    </div>

                    {/* Bookmarks Section */}
                    <div className="grid gap-4">
                         {loading ? (
                              <>
                                   <Skeleton className="w-32 h-6 rounded-md mb-4 bg-gray-300" />
                                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {bookmarks?.map((_, idx) => (
                                             <Skeleton
                                                  key={idx}
                                                  className="w-full h-40 rounded-lg bg-gray-300"
                                             />
                                        ))}
                                   </div>
                              </>
                         ) : (
                              <>
                                   <div className="p-1 border rounded-lg shadow-md mb-4">
                                        <div className="text-lg font-semibold  bg-gray-100  p-2 rounded-lg flex gap-1 items-center">
                                             <Bookmark color="gray" />
                                             Bookmarks
                                        </div>
                                   </div>
                                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {bookmarks.length > 0 &&
                                             bookmarks?.map((bookmark, idx) => (
                                                  <Link
                                                       to={`/post/${bookmark.articleId}`}
                                                       key={idx}
                                                  >
                                                       <div className="p-4 border rounded-lg shadow-md">
                                                            <div className="flex flex-col gap-2">
                                                                 <div className="text-sm font-medium flex items-center gap-2">
                                                                      <BookCheck color="gray" />
                                                                      {
                                                                           bookmark
                                                                                .post
                                                                                .title
                                                                      }
                                                                 </div>
                                                                 <div className="text-xs text-gray-500">
                                                                      {getRelativeTime(
                                                                           bookmark.createdAt
                                                                      )}
                                                                 </div>
                                                            </div>
                                                       </div>
                                                  </Link>
                                             ))}
                                   </div>
                              </>
                         )}
                    </div>
               </div>

               <ToastContainer
                    position="bottom-right"
                    autoClose={5000}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
               />
          </div>
     )
}
