import { Bookmark, Heart, MessageCircle } from "lucide-react"
import AuthorStrip from "../components/AuthorStrip"
import getRelativeCount from "../utils/count"
import { useState, useEffect } from "react"
import { statsistics } from "../services/stats"

interface ActionStripProps {
     isLoading: boolean
     displayAvatar: boolean
     avatar?: string
     name?: string
     createdAt?: string
     postId: string
}

type Stats = { likeCount: number; commentCount: number }

const ActionStrip: React.FC<ActionStripProps> = ({
     isLoading,
     displayAvatar,
     name,
     avatar,
     createdAt,
     postId,
}) => {
     const [stats, setStats] = useState<Stats>({
          likeCount: 0,
          commentCount: 0,
     })
     const [bookmarkStatus, setBookmarkStatus] = useState<boolean>(false)

     useEffect(() => {
          ;(async () => {
               try {
                    const response = await statsistics.getStats(postId)

                    if (response) {
                         setStats(response.stats)
                    }
               } catch (error) {
                    console.log(`Error fetching post stats: ${error}`)
               }
          })()
     }, [stats])

     useEffect(() => {}, [bookmarkStatus])

     return (
          <div className="w-full flex bg-gray-50 rounded-xl items-center  md:justify-between px-4 md:flex-row flex-col">
               <div className="actions flex items-center justify-around gap-2">
                    <button>
                         <span className="text-gray-500 font-bold flex gap-2 items-center">
                              <Heart />
                              <span>{getRelativeCount(stats.likeCount)}</span>
                         </span>
                    </button>

                    <button>
                         <span className="text-gray-500 font-bold flex gap-2 items-center justify-center">
                              <span className="flex gap-2 items-center">
                                   <MessageCircle />
                                   <span>
                                        {getRelativeCount(stats.commentCount)}
                                   </span>
                              </span>
                         </span>
                    </button>

                    <button>
                         <span className="text-gray-500 font-bold flex gap-2 items-center justify-center">
                              <Bookmark />
                         </span>
                    </button>
               </div>
               <div className="author justify-around">
                    <AuthorStrip
                         isLoading={isLoading}
                         displayAvatar={displayAvatar}
                         avatar={avatar ? avatar : ""}
                         name={name ? name : ""}
                         createdAt={createdAt}
                    />
               </div>
          </div>
     )
}

export default ActionStrip
