import { JSX, lazy, Suspense } from "react"
import { IUserProfile } from "@/types/apiResponse.ts"
import { useParams } from "react-router-dom"
import { useProfile } from "../hooks/useProfile.tsx"
import { useNavigate } from "react-router-dom"
import Fallback from "../pages/Fallback.tsx"
import Button from "../components/Button.tsx"
import { MoveLeft } from "lucide-react"

const ProfileComponent = lazy(() => import("../components/Profile/profile.tsx"))

export default function ProfilePage(): JSX.Element {
     const { userId } = useParams<{ userId: string }>()
     const navigate = useNavigate()

     if (!userId) return <Fallback />

     const { profile, isAuthor, loading } = useProfile(userId as string)

     return (
          <div className="py-8">
               <Suspense fallback={<h2>loading...</h2>}>
                    <div className="back w-1/4">
                         <Button
                              className="md:w-1/3 w-1/2 flex  items-center justify-center bg-transparent font-bold gap-2"
                              onClick={() => navigate("/")}
                         >
                              <MoveLeft size={15} fontWeight={800} />
                              Back
                         </Button>
                    </div>
                    <ProfileComponent
                         data={profile as IUserProfile}
                         isAuthor={isAuthor}
                         loading={loading}
                    />
               </Suspense>
          </div>
     )
}
