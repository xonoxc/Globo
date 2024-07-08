import { JSX, lazy, Suspense } from "react"

const ProfileComponent = lazy(() => import("../components/Profile/profile.tsx"))

export default function ProfilePage(): JSX.Element {
     return (
          <div className="py-8">
               <Suspense fallback={<h2>loading...</h2>}>
                    <ProfileComponent />
               </Suspense>
          </div>
     )
}
