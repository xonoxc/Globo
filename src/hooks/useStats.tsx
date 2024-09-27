import { bookmarks } from "../services/bookmarks"
import { statsistics } from "../services/stats"
import {
     Dispatch,
     SetStateAction,
     createContext,
     useContext,
     useEffect,
     useState,
} from "react"

type Stats = { likeCount: number; commentCount: number }

interface StatsContextProps {
     isLoading: boolean
     stats: any
     isBookmarked: boolean
     isLiked: boolean
     incLocalCommentCount: () => void
     toggleLike: (postId: string) => Promise<void>
     toggleBookmark: (postId: string) => Promise<void>
     fetchStats: (postId: string) => Promise<void>
     fetchLikedStatus: (postId: string) => Promise<void>
     fetchBookmarkStatus: (postId: string) => Promise<void>
     setIsLoading: Dispatch<SetStateAction<boolean>>
}

const StatsContext = createContext<StatsContextProps | null>(null)

interface SCProviderProps {
     children: React.ReactNode
}

export const StatsContextProvider = ({ children }: SCProviderProps) => {
     const [stats, setStats] = useState<Stats>({
          likeCount: 0,
          commentCount: 0,
     })
     const [isLiked, setIsLiked] = useState<boolean>(false)
     const [isBookmarked, setIsBookmarked] = useState<boolean>(false)
     const [isLoading, setIsLoading] = useState<boolean>(false)

     const incLocalCommentCount = () =>
          setStats(prev => ({ ...prev, commentCount: prev.commentCount + 1 }))

     const fetchStats = async (postId: string) => {
          try {
               const response = await statsistics.getStats(postId)

               if (response) {
                    setStats(response.stats)
               }
          } catch (error) {
               console.error(`Error fetching post stats: ${error}`)
          }
     }

     const fetchLikedStatus = async (postId: string) => {
          try {
               const response = await statsistics.getPostLikeStatus(postId)

               if (response) {
                    setIsLiked(response.likeStatus)
               }
          } catch (error) {
               console.error(`Error fetching like status: ${error}`)
          }
     }

     const fetchBookmarkStatus = async (postId: string) => {
          try {
               const response = await bookmarks.getbookmarkStatus(postId)
               if (response.isBookmarked) {
                    setIsBookmarked(response.isBookmarked)
               }
          } catch (error) {
               console.error(`Error fetching bookmark status:  ${error}`)
          }
     }

     const toggleBookmark = async (postId: string) => {
          try {
               const response = await bookmarks.toggleBookmark(postId)
               if (response.status === 201) {
                    setIsBookmarked(prev => !prev)
               }
          } catch (error) {
               console.error(`Error toggling bookmark:  ${error}`)
          }
     }

     const toggleLike = async (postId: string) => {
          try {
               const response = await statsistics.toggleLike(postId)
               if (response.status === 200) {
                    if (!isLiked) {
                         setStats(prev => ({
                              ...prev,
                              likeCount: prev.likeCount + 1,
                         }))
                         setIsLiked(true)
                    } else {
                         setStats(prev => ({
                              ...prev,
                              likeCount: prev.likeCount - 1,
                         }))
                         setIsLiked(false)
                    }
               }
          } catch (error) {
               console.error(`Error toggling like:  ${error}`)
          }
     }

     return (
          <StatsContext.Provider
               value={{
                    isLoading,
                    setIsLoading,
                    stats,
                    isLiked,
                    isBookmarked,
                    incLocalCommentCount,
                    toggleLike,
                    fetchStats,
                    fetchLikedStatus,
                    fetchBookmarkStatus,
                    toggleBookmark,
               }}
          >
               {children}
          </StatsContext.Provider>
     )
}

export const useStats = (postId: string) => {
     const context = useContext(StatsContext)

     if (!context)
          throw new Error("useStats must be used within a StatsContextProvider")

     const {
          fetchStats,
          stats,
          isBookmarked,
          toggleLike,
          toggleBookmark,
          fetchLikedStatus,
          incLocalCommentCount,
          isLiked,
          fetchBookmarkStatus,
          setIsLoading,
          isLoading,
     } = context

     useEffect(() => {
          ;(async () => {
               setIsLoading(true)
               await Promise.all([
                    fetchStats(postId),
                    fetchBookmarkStatus(postId),
                    fetchLikedStatus(postId),
               ])
               setIsLoading(false)
          })()
     }, [])

     return {
          stats,
          isBookmarked,
          toggleLike,
          incLocalCommentCount,
          toggleBookmark,
          isLoading,
          isLiked,
     }
}
