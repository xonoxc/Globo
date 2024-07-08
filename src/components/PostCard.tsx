import React from "react"
import Skeleton from "react-loading-skeleton"
import { Link } from "react-router-dom"
import "react-loading-skeleton/dist/skeleton.css"
import { useImageLoad } from "../hooks/useImage"

interface PostCardProps {
     id: number
     title: string
     imageUrl: string
}

const PostCard: React.FC<PostCardProps> = ({ id, title, imageUrl }) => {
     const { loadState: isLoading } = useImageLoad(imageUrl)

     return (
          <Link to={`/post/${id}`}>
               <div className="w-full sm:w-full bg-gray-100 rounded-lg p-4 h-full">
                    <div className="w-full mb-4">
                         {isLoading ? (
                              <Skeleton
                                   height={150}
                                   borderRadius={16}
                                   style={{
                                        borderRadius: "16px",
                                   }}
                              />
                         ) : (
                              <img
                                   src={imageUrl}
                                   alt={title}
                                   className="w-full rounded-lg"
                              />
                         )}
                    </div>
                    <h2 className="font-bold text-xl">
                         {isLoading ? (
                              <Skeleton
                                   height={24}
                                   width={"75%"}
                                   style={{ display: "inline-block" }}
                              />
                         ) : (
                              title
                         )}
                    </h2>
               </div>
          </Link>
     )
}

export default PostCard
