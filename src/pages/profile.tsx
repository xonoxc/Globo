import { JSX, lazy, Suspense, useEffect, useState } from "react"
import { IUserProfile } from "@/types/apiResponse.ts"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "@/store/store.ts"
import { authService } from "../services/auth.ts"

const ProfileComponent = lazy(() => import("../components/Profile/profile.tsx"))

export default function ProfilePage(): JSX.Element {
     const [profile, setProfile] = useState<IUserProfile | null>(null)
     const [loading, setLoading] = useState<boolean>(false)

     const { userId } = useParams<{ userId: string }>()

     const currentUserId = useSelector(
          (state: RootState) => state.auth.userData?.id
     )

     const isAuthor = userId === currentUserId

     useEffect((): void => {
          ;(async () => {
               try {
                    setLoading(true)
                    const response = await authService.getUserProfile(
                         userId as string
                    )
                    if (response) setProfile(response)
               } catch (error) {
                    console.error("error while feching profile:", error)
                    setProfile(null)
               } finally {
                    setLoading(false)
               }
          })()
     }, [userId])

     console.log("profile in parent profile:", profile)

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
