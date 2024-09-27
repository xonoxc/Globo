import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { RouteChildren } from "./routes/routes.tsx"
import ContextWrapper from "./components/ContextWrapper/contextWrapper.tsx"

const router = createBrowserRouter([
     {
          path: "/",
          element: <App />,
          children: RouteChildren,
     },
])

ReactDOM.createRoot(document.getElementById("root")!).render(
     <React.StrictMode>
          <ContextWrapper>
               <RouterProvider router={router} />
          </ContextWrapper>
     </React.StrictMode>
)
