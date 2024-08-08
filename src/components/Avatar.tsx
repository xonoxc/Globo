import React from "react"
import { CircleUserRound } from "lucide-react"

interface AvatarProps {
     imageUrl: string | undefined
}

const Avatar: React.FC<AvatarProps> = ({ imageUrl }) => {
     return (
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300 ">
               {!imageUrl ? (
                    <CircleUserRound />
               ) : (
                    <img
                         src={imageUrl}
                         alt="user"
                         className="w-full h-full object-cover"
                    />
               )}
          </div>
     )
}

export default Avatar
