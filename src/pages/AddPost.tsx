import { Container } from "../components"
import { lazy, Suspense } from "react"

const PostForm = lazy(() => import("../components/post-form/post-form.tsx"))

export default function AddPost(): JSX.Element {
     return (
          <div className="py-8">
               <Container>
                    <Suspense fallback={<h2>Loading...</h2>}>
                         <PostForm />
                    </Suspense>
               </Container>
          </div>
     )
}
