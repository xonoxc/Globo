import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { RootState } from "../store/store"
import { MetroSpinner } from "react-spinners-kit"

export default function AuthLayout({
     children,
     authentication = true,
}: {
     children: React.ReactNode
     authentication: boolean
}) {
     const navigate = useNavigate()
     const [loader, setLoader] = useState<boolean>(true)

     const authStatus = useSelector((state: RootState) => state.auth.status)

     useEffect(() => {
          // TODO: refactor it

          if (authentication && authStatus !== authentication) {
               navigate("/login")
          } else if (!authentication && authStatus !== authentication) {
               navigate("/")
          }
          setLoader(false)
     }, [authStatus, navigate, authentication])

     return loader ? (
          <div className="loader w-full flex items-center justify-center">
               <MetroSpinner />
          </div>
     ) : (
          <>{children}</>
     )
}
