import { useState } from "react"
import { UserPlus, UserMinus, FileText } from "lucide-react"
import ShareButton from "./Share"

interface ProfileConnectionStripProps {
     initialFollowerCount?: number
     initialFollowingCount?: number
     initialArticleCount?: number
     initialIsFollowing?: boolean
     onFollowToggle?: (isFollowing: boolean) => void
     onShare?: () => void
}

export default function Component({
     initialFollowerCount = 1000,
     initialFollowingCount = 500,
     initialArticleCount = 42,
     initialIsFollowing = false,
     onFollowToggle = () => {},
     onShare = () => {},
}: ProfileConnectionStripProps) {
     const [followerCount, setFollowerCount] = useState(initialFollowerCount)
     const [isFollowing, setIsFollowing] = useState(initialIsFollowing)

     const handleFollowToggle = () => {
          setIsFollowing(!isFollowing)
          setFollowerCount(prevCount =>
               isFollowing ? prevCount - 1 : prevCount + 1
          )
          onFollowToggle(!isFollowing)
     }

     return (
          <div className="flex flex-wrap items-center justify-between gap-4 p-4  rounded-lg ">
               <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                    <StatItem
                         icon={<UserPlus className="w-4 h-4" />}
                         value={followerCount}
                         label="Followers"
                    />
                    <StatItem
                         icon={<UserMinus className="w-4 h-4" />}
                         value={initialFollowingCount}
                         label="Following"
                    />
                    <StatItem
                         icon={<FileText className="w-4 h-4" />}
                         value={initialArticleCount}
                         label="Articles"
                    />
               </div>
               <div className="flex items-center space-x-2">
                    <button
                         className={`flex items-center px-4 py-2 rounded-md text-sm font-medium ${
                              isFollowing
                                   ? "border border-gray-300 text-gray-700 bg-transparent hover:bg-gray-50"
                                   : "bg-black text-white"
                         }`}
                         onClick={handleFollowToggle}
                         aria-label={isFollowing ? "Unfollow" : "Follow"}
                    >
                         {isFollowing ? (
                              <>
                                   <UserMinus className="w-4 h-4 mr-2" />
                                   Unfollow
                              </>
                         ) : (
                              <>
                                   <UserPlus className="w-4 h-4 mr-2" />
                                   Follow
                              </>
                         )}
                    </button>

                    <ShareButton
                         className="text-sm text-white flex items-center font-medium"
                         done={onShare}
                    />
               </div>
          </div>
     )
}

interface StatItemProps {
     icon: React.ReactNode
     value: number
     label: string
}

function StatItem({ icon, value, label }: StatItemProps) {
     return (
          <div className="flex items-center space-x-2">
               {icon}
               <div>
                    <p className="text-lg font-semibold">
                         {value.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500">{label}</p>
               </div>
          </div>
     )
}
