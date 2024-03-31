import { useDispatch } from "react-redux"
import { logout } from "../../store/authSlice"
import authService from "../../appwrite/auth"
import { AppDispatch } from "../../store/store"
import { LogOut } from "lucide-react"

const LogoutBtn: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()

  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout())
    })
  }

  return (
    <button
      className="items-center justify-center gap-2 flex px-6 py-2 text-white duration-200 rounded-full bg-black"
      onClick={() => logoutHandler()}
    >
      Logout
      <LogOut size={15} />
    </button>
  )
}

export default LogoutBtn
