import { JSX, lazy, Suspense } from "react"
import { IUserProfile } from "@/types/apiResponse.ts"
import { useParams } from "react-router-dom"
import { useProfile } from "../hooks/useProfile.tsx"
import Fallback from "../pages/Fallback.tsx"

const ProfileComponent = lazy(() => import("../components/Profile/profile.tsx"))

export default function ProfilePage(): JSX.Element {
     const { userId } = useParams<{ userId: string }>()

     if (!userId) return <Fallback />

     const { profile, isAuthor, loading } = useProfile(userId as string)

     return (
          <div className="py-8">
               <Suspense fallback={<h2>loading...</h2>}>
                    <ProfileComponent
                         data={profile as IUserProfile}
                         isAuthor={isAuthor}
                         loading={loading}
                    />
               </Suspense>
          </div>
     )
}
