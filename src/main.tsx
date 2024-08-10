import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import { Provider } from "react-redux"
import store from "./store/store.ts"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { RouteChildren } from "./routes/routes.tsx"
import { ProfileContextProvider } from "./hooks/useProfile.tsx"

const router = createBrowserRouter([
     {
          path: "/",
          element: <App />,
          children: RouteChildren,
     },
])

ReactDOM.createRoot(document.getElementById("root")!).render(
     <React.StrictMode>
          <Provider store={store}>
               <ProfileContextProvider>
                    <RouterProvider router={router} />
               </ProfileContextProvider>
          </Provider>
     </React.StrictMode>
)
