import React from "react"
import { Header, Footer } from "../components"

const Layout = ({ children }: { children: React.ReactNode }) => {
     return (
          <div>
               <Header />
               {children}
               <Footer />
          </div>
     )
}

export { Layout }
