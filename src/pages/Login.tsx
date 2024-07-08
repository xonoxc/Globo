import { Suspense, lazy } from "react"

const LoginComponent = lazy(() => import("../components/Login.tsx"))

export default function Login(): JSX.Element {
     return (
          <div className="py-8 my-16">
               <Suspense fallback={<h2>loading...</h2>}>
                    <LoginComponent />
               </Suspense>
          </div>
     )
}
