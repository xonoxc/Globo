import Spinner from "../components/spinner/Spinner.tsx"
import { Container } from "../components"
import { lazy, Suspense } from "react"

const PostForm = lazy(() => import("../components/post-form/post-form.tsx"))

export default function AddPost(): JSX.Element {
     return (
          <div className="py-8">
               <Container>
                    <Suspense fallback={<Spinner className="text-black" />}>
                         <PostForm />
                    </Suspense>
               </Container>
          </div>
     )
}
