import { JSX, lazy, Suspense, useEffect, useState } from "react"
import { IUserProfile } from "@/types/apiResponse.ts"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "@/store/store.ts"
import { authService } from "../services/auth.ts"

const ProfileComponent = lazy(() => import("../components/Profile/profile.tsx"))

export default function ProfilePage(): JSX.Element {
     const [profile, setProfile] = useState<IUserProfile | null>(null)

     const { userId } = useParams<{ userId: string }>()

     const currentUserId = useSelector(
          (state: RootState) => state.auth.userData?.id
     )

     const isAuthor = userId === currentUserId

     useEffect((): void => {
          authService
               .getUserProfile(userId as string)
               .then((response): void => {
                    if (response) setProfile(response)
               })
               .catch((exception) => console.error(exception))
     }, [userId])

     return (
          <div className="py-8">
               <Suspense fallback={<h2>loading...</h2>}>
                    <ProfileComponent
                         profile={profile as IUserProfile}
                         isAuthor={isAuthor}
                    />
               </Suspense>
          </div>
     )
}
