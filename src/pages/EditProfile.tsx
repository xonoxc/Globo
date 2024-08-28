import { Suspense, lazy } from "react"
import { useParams } from "react-router-dom"
import "react-loading-skeleton/dist/skeleton.css"
import { useNavigate } from "react-router-dom"
import Fallback from "../pages/Fallback"
import Spinner from "../components/spinner/Spinner"
import { MoveLeft } from "lucide-react"
import { Button } from "../components"

const ProfileForm = lazy(() => import("../components/Profile-form"))

export default function ProfileEdit() {
     const { userId } = useParams<{ userId: string }>()
     const navigate = useNavigate()

     if (!userId) return <Fallback />

     return (
          <div className="py-8">
               <Suspense fallback={<Spinner className="text-black" />}>
                    <div className="back w-1/4">
                         <Button
                              className="md:w-1/3 w-1/ flex  items-center justify-center bg-transparent font-bold gap-2"
                              onClick={() => navigate(`/u/profile/${userId}`)}
                         >
                              <MoveLeft size={15} fontWeight={800} />
                              Back
                         </Button>
                    </div>
                    <ProfileForm userId={userId} />
               </Suspense>
          </div>
     )
}
