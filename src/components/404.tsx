import { MessageSquareWarning, MoveLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Button } from "../components"

export default function NotFoundPage(): JSX.Element {
     const navigate = useNavigate()
     return (
          <div className="h-screen w-screen flex items-center justify-center flex-col gap-2">
               <div className="contiaer">
                    <div className="image flex items-center justify-center gap-3">
                         <MessageSquareWarning className="size-48" />
                         <h1 className="font-bold text-8xl">404</h1>
                    </div>
                    <h2 className="font-bold text-gray-500">
                         Sorry, the page you are looking for could not be found.
                    </h2>

                    <Button
                         onClick={() => navigate("/")}
                         className="text-white flex items-center justify-center mt-2"
                    >
                         <span className="flex gap-1 items-center justify-center">
                              <MoveLeft size={20} />
                              Go back
                         </span>
                    </Button>
               </div>
          </div>
     )
}
