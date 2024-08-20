import { Suspense, lazy } from "react"
import { useParams } from "react-router-dom"
import "react-loading-skeleton/dist/skeleton.css"
import Fallback from "../pages/Fallback"
import Spinner from "../components/spinner/Spinner"

const ProfileForm = lazy(() => import("../components/Profile-form"))

export default function ProfileEdit() {
     const { userId } = useParams<{ userId: string }>()

     if (!userId) return <Fallback />

     return (
          <Suspense fallback={<Spinner />}>
               <ProfileForm userId={userId} />
          </Suspense>
     )
}
