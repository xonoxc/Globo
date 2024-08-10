import React from "react"
import Skeleton from "react-loading-skeleton"
import { Link } from "react-router-dom"
import "react-loading-skeleton/dist/skeleton.css"
import defaultPostImage from "../../public/default_image.png"
import { useImageLoad } from "../hooks/useImage"
import AuthorStrip from "../components/AuthorStrip"

interface PostCardProps {
     id: number
     title: string
     imageUrl: string
     authorName?: string
     authorAvatar?: string
     createdAt: string
     displayAvatar: boolean
}

const PostCard: React.FC<PostCardProps> = ({
     id,
     title,
     imageUrl,
     authorName,
     authorAvatar,
     displayAvatar,
     createdAt,
}) => {
     const { loadState: isLoading } = useImageLoad(imageUrl)

     return (
          <Link to={`/post/${id}`} className="block">
               <div className="w-full h-80 sm:w-80  rounded-xl  p-4 flex flex-col">
                    <div className="flex-grow mb-4">
                         {isLoading ? (
                              <Skeleton
                                   height={150}
                                   borderRadius={16}
                                   style={{ borderRadius: "16px" }}
                              />
                         ) : (
                              <img
                                   src={
                                        imageUrl !== ""
                                             ? imageUrl
                                             : defaultPostImage
                                   }
                                   alt={title}
                                   className="w-full h-40 object-cover rounded-lg"
                              />
                         )}
                    </div>
                    <h2 className="font-bold text-lg px-2 mb-2 truncate">
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
                    <AuthorStrip
                         isLoading={isLoading}
                         displayAvatar={displayAvatar}
                         name={authorName}
                         avatar={authorAvatar}
                         createdAt={createdAt}
                    />
               </div>
          </Link>
     )
}

export default PostCard
