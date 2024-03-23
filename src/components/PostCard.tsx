import React from "react"
import service from "../appwrite/conf"
import { Link } from "react-router-dom"
import { ID } from "appwrite"

interface PostCardProps {
  $id: ID
  title: string
  image: string
}

const PostCard: React.FC<PostCardProps> = ({
  $id,
  title,
  image,
}: PostCardProps) => {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-lg p-4">
        <div className="w-full justify-center mb-4">
          <img
            src={service.getFilePreview(image).toString()}
            alt={title}
            className="text-xl"
          />
        </div>
        <h2 className="font-bold text-xl">{title}</h2>
      </div>
    </Link>
  )
}

export default PostCard
