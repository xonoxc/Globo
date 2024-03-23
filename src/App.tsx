import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { AppDispatch } from "./store/store"
import authService from "./appwrite/auth"
import { login, logout } from "./store/authSlice"
import { Footer, Header } from "./components"
import { Outlet } from "react-router-dom"

export default function App(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(true)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData))
        } else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      {!loading ? (
        <div className="flex flex-wrap min-h-screen content-between bg-gray-500">
          <div className="w-full block">
            <Header />
            <main>
              <Outlet />
            </main>
            <Footer />
          </div>
        </div>
      ) : (
        <div className="container">
          <div>loading....</div>
        </div>
      )}
    </>
  )
}
