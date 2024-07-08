import { useDispatch } from "react-redux"
import { logout } from "../../store/authSlice"
import { authService } from "../../services/auth"
import { AppDispatch } from "../../store/store"
import { LogOut } from "lucide-react"
import { removeCache } from "../../store/postSlice"
import { useNavigate } from "react-router-dom"

const LogoutBtn: React.FC = () => {
     const dispatch = useDispatch<AppDispatch>()
     const navigate = useNavigate()

     const logoutHandler = (): void => {
          authService
               .logOut()
               .then((response) => {
                    if (response.data.success) {
                         dispatch(removeCache())
                         dispatch(logout())
                         navigate("/")
                    }
               })
               .catch((error): void => console.error(error))
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
