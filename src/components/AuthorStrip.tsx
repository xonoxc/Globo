import getRelativeTime from "../utils/date"
import defaultPfp from "../../public/def_pfp.jpg"
import { Avatar } from "../components"
import Skeleton from "react-loading-skeleton"

interface IStripProps {
     isLoading: boolean
     displayAvatar: boolean
     avatar?: string
     name?: string
     createdAt?: string
     className?: string
}

const AuthorStrip = (props: IStripProps) => {
     return (
          <div
               className={`${props.className ? props.className : "author-details flex items-center justify-between px-2 "}`}
          >
               {props.isLoading ? (
                    <Skeleton
                         height={24}
                         width={"45%"}
                         style={{ display: "inline-block" }}
                    />
               ) : (
                    <div className="author flex flex-row items-center p-2 gap-2">
                         {props.displayAvatar && (
                              <div className="img">
                                   <Avatar
                                        imageUrl={
                                             props.avatar === ""
                                                  ? defaultPfp
                                                  : props.avatar
                                        }
                                   />
                              </div>
                         )}
                         <span className="text-gray-500 font-bold">
                              {props.name && props.name}
                         </span>
                    </div>
               )}

               <div className="timestamp">
                    <span className="text-xs">
                         {props.createdAt && getRelativeTime(props.createdAt)}
                    </span>
               </div>
          </div>
     )
}

export default AuthorStrip
