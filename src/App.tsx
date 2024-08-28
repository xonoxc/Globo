import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "./store/store"
import { authService } from "./services/auth"
import Spinner from "./components/spinner/Spinner"
import { login, logout } from "./store/authSlice"
import { Outlet } from "react-router-dom"
import { RootState } from "./store/store"

export default function App(): JSX.Element {
     const [loading, setLoading] = useState<boolean>(true)
     const dispatch = useDispatch<AppDispatch>()

     const currentUser = useSelector((state: RootState) => state.auth.userData)

     useEffect(() => {
          if (currentUser) {
               setLoading(false)
               return
          }

          authService
               .getCurrentUser()
               .then(userData => {
                    if (userData) {
                         dispatch(
                              login({
                                   user: userData,
                                   refreshToken:
                                        userData.refreshToken as string,
                              })
                         )
                    } else {
                         dispatch(logout())
                    }
               })
               .catch(err => console.error(err))
               .finally(() => setLoading(false))
     }, [currentUser, dispatch])

     return (
          <>
               <div className="flex flex-wrap min-h-screen content-between bg-white-200">
                    <div className="w-full block">
                         <main>
                              {loading ? (
                                   <div className="container h-screen w-full text-black">
                                        <Spinner className="text-black" />
                                   </div>
                              ) : (
                                   <Outlet />
                              )}
                         </main>
                    </div>
               </div>
          </>
     )
}
