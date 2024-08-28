import { lazy, Suspense } from "react"
import Spinner from "../components/spinner/Spinner.tsx"

const SignupComponent = lazy(() => import("../components/Signup.tsx"))

export default function Signup(): JSX.Element {
     return (
          <div className="py-8">
               <Suspense fallback={<Spinner className="text-black" />}>
                    <SignupComponent />
               </Suspense>
          </div>
     )
}
