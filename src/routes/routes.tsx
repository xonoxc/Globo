import {
     Home,
     Login,
     Signup,
     AllPosts,
     AddPost,
     EditPost,
     SearchResults,
     Post,
     Pricing,
     ProfilePage,
} from "../pages"
import { AuthLayout } from "../components"
import NotFountPage from "../components/404"

interface RouteChildren {
     path: string
     element: JSX.Element
}

export const RouteChildren: RouteChildren[] = [
     {
          path: "/",
          element: <Home />,
     },
     {
          path: "/login",
          element: (
               <AuthLayout authentication={false}>
                    <Login />
               </AuthLayout>
          ),
     },
     {
          path: "/signup",
          element: (
               <AuthLayout authentication={false}>
                    <Signup />
               </AuthLayout>
          ),
     },
     {
          path: "/all-posts",
          element: (
               <AuthLayout authentication>
                    <AllPosts />
               </AuthLayout>
          ),
     },
     {
          path: "/add-post",
          element: (
               <AuthLayout authentication>
                    <AddPost />
               </AuthLayout>
          ),
     },
     {
          path: "/edit-post/:postId",
          element: (
               <AuthLayout authentication>
                    <EditPost />
               </AuthLayout>
          ),
     },
     {
          path: "/post/:postId",
          element: <Post />,
     },
     {
          path: "/pricing",
          element: <Pricing />,
     },
     {
          path: "/results/search",
          element: (
               <AuthLayout authentication>
                    <SearchResults />
               </AuthLayout>
          ),
     },
     {
          path: "/u/profile/:userId",
          element: (
               <AuthLayout authentication>
                    <ProfilePage />
               </AuthLayout>
          ),
     },
     {
          path: "*",
          element: <NotFountPage />,
     },
]
