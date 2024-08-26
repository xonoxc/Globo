import { Suspense, lazy } from "react"
import Spinner from "../components/spinner/Spinner.tsx"

const LoginComponent = lazy(() => import("../components/Login.tsx"))

export default function Login(): JSX.Element {
     return (
          <div className="py-8 my-16">
               <Suspense fallback={<Spinner />}>
                    <LoginComponent />
               </Suspense>
          </div>
     )
}
