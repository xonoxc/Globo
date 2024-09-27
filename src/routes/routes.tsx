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
import ProfileEdit from "../pages/EditProfile"
import SubscrtiptionPage from "../pages/Subscribe"
import { Layout } from "../components/Layout"

import { CommentsProvider } from "../hooks/useComments"

interface RouteChildren {
     path: string
     element: JSX.Element
}

export const RouteChildren: RouteChildren[] = [
     {
          path: "/",
          element: (
               <Layout>
                    <Home />
               </Layout>
          ),
     },
     {
          path: "/login",
          element: (
               <AuthLayout authentication={false}>
                    <Layout>
                         <Login />
                    </Layout>
               </AuthLayout>
          ),
     },
     {
          path: "/signup",
          element: (
               <AuthLayout authentication={false}>
                    <Layout>
                         <Signup />
                    </Layout>
               </AuthLayout>
          ),
     },
     {
          path: "/all-posts",
          element: (
               <AuthLayout authentication>
                    <Layout>
                         <AllPosts />
                    </Layout>
               </AuthLayout>
          ),
     },
     {
          path: "/add-post",
          element: (
               <AuthLayout authentication>
                    <Layout>
                         <AddPost />
                    </Layout>
               </AuthLayout>
          ),
     },
     {
          path: "/edit-post/:postId",
          element: (
               <AuthLayout authentication>
                    <Layout>
                         <EditPost />
                    </Layout>
               </AuthLayout>
          ),
     },
     {
          path: "/post/:postId",
          element: (
               <Layout>
                    <CommentsProvider>
                         <Post />
                    </CommentsProvider>
               </Layout>
          ),
     },
     {
          path: "/pricing",
          element: (
               <Layout>
                    <Pricing />
               </Layout>
          ),
     },
     {
          path: "/results/search",
          element: (
               <AuthLayout authentication>
                    <Layout>
                         <SearchResults />
                    </Layout>
               </AuthLayout>
          ),
     },
     {
          path: "/u/sub",
          element: (
               <AuthLayout authentication>
                    <SubscrtiptionPage />
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
          path: "/u/profile/e/:userId",
          element: (
               <AuthLayout authentication>
                    <ProfileEdit />
               </AuthLayout>
          ),
     },

     {
          path: "*",
          element: <NotFountPage />,
     },
]
