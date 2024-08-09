import { useState, useEffect } from "react"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import ProfileFallback from "../../../public/def_pfp.jpg"
import { IUserProfile } from "../../types/apiResponse"
import { Button } from "../../components"

interface IProfileProps {
     data: IUserProfile
     isAuthor: boolean
}

export default function ProfilePage({ data, isAuthor }: IProfileProps) {
     const [loading, setLoading] = useState(true)

     useEffect(() => {
          setTimeout(() => setLoading(false), 10000)
     }, [])

     return (
          <div className="flex flex-col gap-8 w-full max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-12 relative">
               {/* Cover Image */}
               <div className="absolute inset-0 z-[-1]">
                    {loading ? (
                         <Skeleton className="w-full h-full object-cover rounded-lg aspect-[1200/400] g" />
                    ) : (
                         <img
                              src="/placeholder.svg"
                              alt="Cover Image"
                              className="w-full h-full object-cover rounded-lg aspect-[1200/400]"
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
                                        src={ProfileFallback}
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
                                             Jared Palmer
                                        </div>
                                        <div className="text-gray-500">
                                             jared@example.com
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
                         <Button textColor="white">Edit Profile</Button>
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
                                             <div>42</div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                             <div>Bio</div>
                                             <div className="text-right">
                                                  I'm a software engineer and
                                                  tech enthusiast. I love
                                                  building cool stuff with code.
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
                                        {Array(4)
                                             .fill(0)
                                             .map((_, idx) => (
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
                                        {Array(4)
                                             .fill(0)
                                             .map((_, idx) => (
                                                  <div
                                                       key={idx}
                                                       className="p-4 border rounded-lg shadow-md"
                                                  >
                                                       <div className="flex flex-col gap-2">
                                                            <img
                                                                 src="/placeholder.svg"
                                                                 alt={`Article ${idx + 1} Cover`}
                                                                 className="rounded-lg object-cover aspect-video"
                                                            />
                                                            <div className="text-sm font-medium">
                                                                 Article Title{" "}
                                                                 {idx + 1}
                                                            </div>
                                                            <div className="text-xs text-gray-500">
                                                                 Published on
                                                                 Date
                                                            </div>
                                                       </div>
                                                  </div>
                                             ))}
                                   </div>
                              </>
                         )}
                    </div>
               </div>
          </div>
     )
}
