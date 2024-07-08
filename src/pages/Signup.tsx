import { lazy, Suspense } from "react"

const SignupComponent = lazy(() => import("../components/Signup.tsx"))

export default function Signup(): JSX.Element {
     return (
          <div className="py-8">
               <Suspense fallback={<h2>Loading...</h2>}>
                    <SignupComponent />
               </Suspense>
          </div>
     )
}
