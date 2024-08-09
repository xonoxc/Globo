import Skeleton from "react-loading-skeleton"
import { Link } from "react-router-dom"
import "react-loading-skeleton/dist/skeleton.css"
import ProfileFallback from "../../../public/def_pfp.jpg"
import { IUserProfile } from "../../types/apiResponse"
import { Button } from "../../components"
import getRelativeTime from "../../utils/date"
import Fallback from "../../pages/Fallback"
import DefaultCoverImage from "../../../public/cover_image.png"

interface IProfileProps {
     data: IUserProfile
     isAuthor: boolean
     loading: boolean
}

export default function Profile({ data, isAuthor, loading }: IProfileProps) {
     if (!loading && !data) return <Fallback />

     return (
          <div className="flex flex-col gap-8 w-full max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-12 relative">
               {/* Cover Image */}
               <div className="absolute inset-0 z-[-1]">
                    {loading ? (
                         <Skeleton className="w-full h-full object-cover rounded-lg aspect-[1200/400] g" />
                    ) : (
                         <img
                              src={
                                   data.coverImage
                                        ? data.coverImage
                                        : DefaultCoverImage
                              }
                              alt="Cover Image"
                              className="w-full h-1/4 object-cover rounded-lg aspect-[1200/400]"
                         />
                    )}
               </div>

               {/* Profile Section */}
               <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 justify-between">
                    {/* Avatar */}
                    <div>
                         <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden">
                              {loading ? (
                                   <Skeleton className="w-full h-full rounded-full bg-gray-300" />
                              ) : (
                                   <img
                                        src={
                                             data.avatar
                                                  ? data.avatar
                                                  : ProfileFallback
                                        }
                                        alt="Profile Avatar"
                                        className="w-full h-full object-cover"
                                   />
                              )}
                         </div>

                         {/* User Details */}
                         <div className="flex flex-col items-center md:items-start gap-2">
                              {loading ? (
                                   <>
                                        <Skeleton className="w-36 h-8 rounded-md bg-gray-300" />
                                        <Skeleton className="w-48 h-6 rounded-md bg-gray-300" />
                                        <Skeleton className="w-24 h-6 rounded-md bg-gray-300" />
                                   </>
                              ) : (
                                   <>
                                        <div className="text-2xl font-bold">
                                             {data.name}
                                        </div>
                                        <div className="text-gray-500">
                                             {data.email}
                                        </div>
                                        <div className="flex items-center gap-2">
                                             <div className="bg-gray-500 text-white px-2 py-1 rounded-md  font-medium">
                                                  Verified
                                             </div>
                                        </div>
                                   </>
                              )}
                         </div>
                    </div>
                    <div className="edit-btn">
                         {isAuthor && (
                              <Button textColor="white">Edit Profile</Button>
                         )}
                    </div>
               </div>

               {/* Cards Section */}
               <div className="grid grid-cols-1 gap-6">
                    {/* Preferences Card */}
                    <div className="p-6 border rounded-lg shadow-md">
                         {loading ? (
                              <>
                                   <Skeleton className="w-32 h-6 rounded-md mb-4 bg-gray-300" />
                                   <Skeleton className="w-16 h-6 rounded-md bg-gray-300" />
                                   <Skeleton className="w-full h-4 mt-4 rounded-md bg-gray-300" />
                                   <Skeleton className="w-full h-4 rounded-md bg-gray-300" />
                              </>
                         ) : (
                              <div className="grid gap-4">
                                   <div className="flex items-center justify-between">
                                        <div className="text-lg font-semibold">
                                             Preferences
                                        </div>
                                        <div className="bg-gray-400 text-white px-2 py-1 rounded-md  font-medium">
                                             Pro User
                                        </div>
                                   </div>
                                   <div className="grid gap-2 text-gray-500">
                                        <div className="flex items-center justify-between">
                                             <div>Articles</div>
                                             <div>
                                                  {
                                                       data.preferences
                                                            .articleCount
                                                  }
                                             </div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                             <div>Bio</div>
                                             <div className="text-right">
                                                  {data.preferences.bio}
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
                                   <div className="grid sm:grid-cols-2 gap-4">
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
                                   <div className="p-6 border rounded-lg shadow-md">
                                        <div className="text-lg font-semibold">
                                             Recent Articles
                                        </div>
                                   </div>
                                   <div className="grid sm:grid-cols-2 gap-4">
                                        {data?.articles?.map((article, idx) => (
                                             <Link to={`/post/${article.id}`}>
                                                  <div
                                                       key={idx}
                                                       className="p-4 border rounded-lg shadow-md"
                                                  >
                                                       <div className="flex flex-col gap-2">
                                                            <div className="text-sm font-medium">
                                                                 {article.title}
                                                            </div>
                                                            <div className="text-xs text-gray-500">
                                                                 on :
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
               </div>
          </div>
     )
}
